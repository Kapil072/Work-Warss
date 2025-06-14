const path = require('path');
const url = require('url');

const config = {
  server: {
    port: 5000,
    env: 'development',
    corsOrigin: '*'
  },
  api: {
    openaiApiKey: "sk-proj-I3odDtOa6ZlYKy8K9ll6T3BlbkFJqzdKB099Vqj2gjy5krP6",
    baseUrl: process.env.API_BASE_URL || 'http://localhost:5000',
    rateLimit: {
      windowMs: 60 * 1000, // 1 minute
      max: 100, // limit each IP to 100 requests per minute
      message: { status: 'error', message: 'Too many requests, please try again later.' },
      standardHeaders: true,
      legacyHeaders: false
    }
  },
  logging: {
    level: 'info',
    file: 'app.log'
  },
  validation: {
    validateOpenAIKey: () => {
      if (!config.api.openaiApiKey) {
        throw new Error('OpenAI API key is not configured');
      }
      if (!config.api.openaiApiKey.startsWith('sk-')) {
        throw new Error('Invalid OpenAI API key format');
      }
    }
  }
};

module.exports = config; 