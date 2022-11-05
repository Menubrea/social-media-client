const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'mfrvmv',
  e2e: {
    baseUrl: 'http://127.0.0.1:8080',
  },
});
