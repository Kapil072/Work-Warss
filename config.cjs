const path = require('path');
const url = require('url');
require('dotenv').config();

const config = {
  server: {
    port: 5000,
    env: 'development',
    corsOrigin: '*'
  },
  api: {
    openaiApiKey: process.env.OPENAI_API_KEY,
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
        throw new Error('OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable or update the config file.');
      }
      if (!config.api.openaiApiKey.startsWith('sk-')) {
        throw new Error('Invalid OpenAI API key format. The key should start with "sk-"');
      }
    }
  }
};

module.exports = config; 