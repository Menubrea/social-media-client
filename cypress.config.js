const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'mfrvmv',
  requestTimeout: 10000000,
  responseTimeout: 10000000,
  env: {
    // Default test account - change values if you would like to run a different account
    email: 'menubreacypress@noroff.no',
    password: '12345678',
    //
    faulty_email: 'menubreacypress@test.no',
    faulty_password: '1234',
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:8080',
  },
});
