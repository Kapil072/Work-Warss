const path = require('path');
const url = require('url');

const config = {
  api: {
    openaiApiKey: "sk-proj-I3odDtOa6ZlYKy8K9ll6T3BlbkFJqzdKB099Vqj2gjy5krP6
    baseUrl: process.env.API_BASE_URL || 'http://localhost:5000',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
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