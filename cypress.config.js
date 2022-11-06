const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'mfrvmv',
  requestTimeout: 10000000,
  responseTimeout: 10000000,
  pageLoadTimeout: 1000000000,
  e2e: {
    baseUrl: 'http://127.0.0.1:8080',
  },
});
