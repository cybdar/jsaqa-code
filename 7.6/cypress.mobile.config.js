const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    
    // Мобильное разрешение (iPhone X)
    viewportWidth: 375,
    viewportHeight: 812,
    
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