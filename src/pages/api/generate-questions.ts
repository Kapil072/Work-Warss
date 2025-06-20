import { QuestionGenerator, SkillLevel } from '../../../app';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { skill, industry, role, cluster, level, numQuestions } = req.body;

    // Validate required fields
    if (!skill || !industry || !role || !cluster || !level) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert level string to SkillLevel enum
    const skillLevel = {
      'unranked': SkillLevel.UNRANKED,
      'bronze': SkillLevel.BRONZE,
      'silver': SkillLevel.SILVER,
      'gold': SkillLevel.GOLD
    }[level] || SkillLevel.UNRANKED;

    // Initialize question generator with API key
    const generator = new QuestionGenerator(process.env.GOOGLE_API_KEY || '');

    // Generate questions
    const questions = await generator.generate_questions(
      skill,
      skillLevel,
      industry,
      role,
      cluster,
      numQuestions || 10
    );

    // Convert questions to the format expected by the quiz
    const formattedQuestions = questions.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: [q.options.A, q.options.B, q.options.C, q.options.D],
      correctAnswer: q.options[q.correct_answer],
      topic: skill.toLowerCase(),
      difficulty: level,
      explanation: q.explanation
    }));

    return res.status(200).json(formattedQuestions);
  } catch (error) {
    console.error('Error generating questions:', error);
    return res.status(500).json({ error: 'Failed to generate questions' });
  }
} 