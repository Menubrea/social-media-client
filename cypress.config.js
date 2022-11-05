const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'mfrvmv',
  pageLoadTimeout: 1000000000,
  requestTimeout: 10000000000,
  e2e: {
    baseUrl: 'http://localhost:5500',
  },
});
