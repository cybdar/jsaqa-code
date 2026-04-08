const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ваш-id-из-dashboard",  // добавите позже
  e2e: {
    baseUrl: "http://localhost:8080",
    supportFile: false,
  },
});