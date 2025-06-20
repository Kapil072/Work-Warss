const config = require('../config.cjs');

const logger = {
  info: (message, ...args) => {
    console.log(`[INFO] ${message}`, ...args);
  },
  error: (message, ...args) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message, ...args) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  debug: (message, ...args) => {
    if (config.logging?.level === 'debug') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
};

module.exports = logger; 