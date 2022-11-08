# Project Brief

In order to complete this task, you will need to select an existing JavaScript project that has:

    API calls to CRUD an item
    API call to authenticate a user
    Does not belong to you

You may use another student’s project or a project provided by your teacher.

The following workflows/hooks are required:

    Project is configured to run Prettier on commit
    Project is configured to run ESLint on commit
    Project is configured to run Jest on commit
    Project is configured to deploy to pages on merge to default

The following file changes are required:

    Project readme file is updated to include new configuration information and status badges
    Project is configured for hosting (e.g. CDN links or a Bundler)

The following features must be automatically tested with unit tests:

    The login function returns a valid token when provided with valid credentials
    The logout function clears the token from browser storage
    The create item function creates a new item on the API

The following features must be automatically tested with end-to-end tests:

    The login form validates user inputs correctly based on API restrictions
    The create item form validates user inputs correctly based on API restrictions
    The logout button logs the user out when clicked

If there are bugs, concerns or problems with the repository you are working on, make sure to list these as issues using the Issues tab in the repository. It is not your responsibility to resolve these issues but they must be logged if discovered.

## Installation

Clone repository

#### Install dependencies

    npm i

#### Build Sass

    npm run build

#### If you want to run live-server

    npm start

#### If you want to adjust styling

    npm run watch

#### To run E2E tests

Register an account using the app from live-server

1. Create an .env file in root directory, in a similar format to env.example.
2. Replace credentials with your registered email and password
3. `npm run test-e2e` or `npm run test-e2e-cli`

#### Complete list of scripts further down

## Configuration

#### The project has been updated with these dev-dependencies:

    Babel
    Cypress
    ESLint
    ESLint-plugin-cypress
    ESLint-plugin-jest
    Husky
    Jest
    Lint-Staged
    Live-Server
    Prettier
    Sass
    Dotenv

#### Dependencies

    Bootstrap-dark-5

#### Scripts

    "build": "sass src/scss:dist/css",
    "start": "live-server",
    "watch": "sass --watch src/scss:dist/css & live-server",
    "lint": "eslint src/**/*.js",
    "lint-fix": "eslint src/**/*.js --cache --fix",
    "test": "npm run test-unit && npm run test-e2e-cli",
    "test-unit": "jest",
    "test-e2e": "cypress open",
    "test-e2e-cli": "cypress run",
    "prepare": "husky install"

#### Prettier custom config

```json
{
  "singleQuote": true
}
```

#### ESLINT Config

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "overrides": [
    {
      "files": ["**/*.cy.js"],
      "env": { "cypress/globals": true },
      "plugins": ["cypress"],
      "extends": ["plugin:cypress/recommended"],
      "rules": {
        "cypress/no-unnecessary-waiting": "off",
        "no-unused-vars": "off"
      }
    },
    {
      "files": ["**/*.test.js"],
      "env": { "jest/globals": true },
      "plugins": ["jest"],
      "extends": ["plugin:jest/recommended"],
      "rules": {
        "jest/prefer-expect-assertions": "off",
        "no-undef": "off",
        "jest/no-conditional-expect": "off"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {}
}
```

#### Pre-commit hooks

```json
  "lint-staged": {
    "**/*.js": [
      "eslint --cache --fix"
    ],
    "**/*.{js, css, scss, md, json}": "prettier --write",
    "**/*.test.js": "jest"
  }
```
