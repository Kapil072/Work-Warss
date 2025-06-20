import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import * as google from '@google/generative-ai';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Configure the Google API
    const genAI = new google.GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

    // Try to get a model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Test with a simple prompt
    const result = await model.generateContent('Hello, are you working?');
    const response = await result.response;
    
    return res.status(200).json({ 
      success: true,
      message: 'API key is working',
      testResponse: response.text()
    });
  } catch (error) {
    console.error('Error testing API:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to connect to Google API',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 