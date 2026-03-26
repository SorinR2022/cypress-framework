const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

function getConfigurationByFile(env) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${env}.json`);
  return fs.existsSync(pathToConfigFile) ? require(pathToConfigFile) : {};
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    retries: { runMode: 2, openMode: 0 },
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    screenshotOnRunFailure: true,
    video: true,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    allowCypressEnv: false,
    setupNodeEvents(on, config) {
      const environment = config.env.configFile || 'local';
      const envConfig = getConfigurationByFile(environment);
      return { ...config, ...envConfig };
    },
  },
  env: {
    apiBaseUrl: 'https://reqres.in',
  },
});