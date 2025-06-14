const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./config.cjs');
const logger = require('./utils/logger.cjs');

const app = express();
const port = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.server.corsOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  ...config.api.rateLimit,
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later.'
    });
  }
});
app.use(limiter);

// Logging middleware
app.use(morgan('combined', { stream: logger.stream }));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: config.api.openaiApiKey
});

// Ensure saved_quizzes directory exists
const savedQuizzesDir = path.join(__dirname, 'saved_quizzes');
if (!fs.existsSync(savedQuizzesDir)) {
  fs.mkdirSync(savedQuizzesDir, { recursive: true });
  logger.info('Created saved_quizzes directory');
}

// Function to save quiz to file
const saveQuizToFile = (quizData) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${quizData.metadata.skill}_${quizData.metadata.industry}_${timestamp}.json`;
    const filepath = path.join(savedQuizzesDir, filename);
    
    // Ensure the data is properly formatted
    const formattedData = {
      metadata: {
        ...quizData.metadata,
        savedAt: new Date().toISOString()
      },
      questions: quizData.questions.map((q, index) => ({
        id: index + 1,
        ...q,
        topic: quizData.metadata.skill.toLowerCase(),
        difficulty: quizData.metadata.level,
        explanation: q.explanation || `This question tests knowledge about ${quizData.metadata.skill} in the context of ${quizData.metadata.industry}.`
      }))
    };

    // Write the file with pretty formatting
    fs.writeFileSync(filepath, JSON.stringify(formattedData, null, 2));
    logger.info(`Quiz saved successfully to ${filename}`);
    return filename;
  } catch (error) {
    logger.error('Error saving quiz:', error);
    throw new Error(`Failed to save quiz: ${error.message}`);
  }
};

// Test endpoint
app.get('/test', (req, res) => {
  try {
    config.validation.validateOpenAIKey();
    res.json({ 
      status: 'ok', 
      message: 'Server is running and OpenAI API key is configured',
      api_key_set: true 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message,
      api_key_set: false 
    });
  }
});

// Main endpoint for generating questions
app.post('/generate-questions', async (req, res) => {
  try {
    // Validate OpenAI API key
    config.validation.validateOpenAIKey();

    const { skill, industry, role, cluster, level } = req.body;

    // Validate required fields
    if (!skill || !industry || !role || !cluster || !level) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: skill, industry, role, cluster, and level are required'
      });
    }

    // Generate questions using OpenAI
    const prompt = `Generate 10 multiple choice questions about ${skill} for a ${level} level ${role} in the ${industry} industry, focusing on ${cluster}. Each question should have 4 options and one correct answer. Format the response as a JSON array with objects containing question, options array, and correctAnswer.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a quiz generator that creates multiple choice questions in JSON format. Always respond with a valid JSON array containing exactly 10 questions. Each question should have a 'question' field, an 'options' array with exactly 4 options, and a 'correctAnswer' field."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    // Parse the response
    const response = completion.choices[0].message.content;
    let questions;
    try {
      // Clean the response by removing markdown formatting
      const cleanedResponse = response
        .replace(/```json\n?/g, '')  // Remove ```json
        .replace(/```\n?/g, '')      // Remove closing ```
        .trim();                     // Remove extra whitespace

      const parsedResponse = JSON.parse(cleanedResponse);
      // Ensure we have an array of questions
      questions = Array.isArray(parsedResponse) ? parsedResponse : parsedResponse.questions;
      
      // Validate the questions format
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Invalid questions format received from AI');
      }

      // Validate each question
      questions = questions.map((q, index) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || !q.correctAnswer) {
          throw new Error('Invalid question format: each question must have a question field, 4 options, and a correctAnswer');
        }
        return {
          ...q,
          id: index + 1,
          topic: skill.toLowerCase(),
          difficulty: level,
          explanation: q.explanation || `This question tests knowledge about ${skill} in the context of ${industry}.`
        };
      });

    } catch (error) {
      logger.error('Error parsing OpenAI response:', error);
      logger.error('Raw response:', response);
      logger.error('Cleaned response:', cleanedResponse);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to parse questions from AI response: ' + error.message
      });
    }

    // Prepare quiz data for saving
    const quizData = {
      metadata: {
        skill,
        industry,
        role,
        cluster,
        level,
        generatedAt: new Date().toISOString()
      },
      questions
    };

    // Save the quiz
    let savedFilename;
    try {
      savedFilename = saveQuizToFile(quizData);
    } catch (error) {
      logger.error('Failed to save quiz:', error);
      // Continue with the response even if saving fails
    }

    res.json({
      status: 'success',
      questions: questions,
      savedTo: savedFilename || null
    });

  } catch (error) {
    logger.error('Error generating questions:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to generate questions'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred'
  });
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Export the server for testing purposes
module.exports = app; 