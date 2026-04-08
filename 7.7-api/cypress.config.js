const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "zde9rh",
  e2e: {
    baseUrl: "http://localhost:8080",
    supportFile: false,
  },
});