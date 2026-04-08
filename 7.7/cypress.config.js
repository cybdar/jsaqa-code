const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "wfzjbm",
  e2e: {
    baseUrl: "http://qamid.tmweb.ru",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
  },
});