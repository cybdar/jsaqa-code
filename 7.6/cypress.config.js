const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    
    viewportWidth: 1280,
    viewportHeight: 720,
    
    retries: {
      runMode: 2,
      openMode: 0,
    },
    
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    
    supportFile: "cypress/support/e2e.js",
    
    fixturesFolder: "cypress/fixtures",
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    
    trashAssetsBeforeRuns: true,
  },
});