const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const config = require('./config');
const logger = require('./utils/logger');

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
const limiter = rateLimit(config.api.rateLimit);
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

// Test endpoint
app.get('/test', (req, res) => {
  try {
    config.validation.validateOpenAIKey();
    res.json({ status: 'ok', message: 'Server is running and OpenAI API key is configured' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
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
    const prompt = `Generate 5 multiple choice questions about ${skill} for a ${level} level ${role} in the ${industry} industry, focusing on ${cluster}. Each question should have 4 options and one correct answer. Format the response as a JSON array with objects containing question, options array, and correctAnswer.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a quiz generator that creates multiple choice questions in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
        temperature: 0.7,
      max_tokens: 1000
    });

      // Parse the response
    const response = completion.choices[0].message.content;
      let questions;
      try {
      questions = JSON.parse(response);
    } catch (error) {
      logger.error('Error parsing OpenAI response:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to parse questions from AI response'
      });
    }

      res.json({
        status: 'success',
      questions: questions
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