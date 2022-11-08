const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'mfrvmv',
  requestTimeout: 10000000,
  responseTimeout: 10000000,
  env: {
    email: 'menubreacypress@noroff.no',
    password: '12345678',
    faulty_email: 'menubreacypress',
    faulty_password: '1234',
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:8080',
  },
});
