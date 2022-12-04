const { defineConfig } = require("cypress");
const installLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");

module.exports = defineConfig({
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 30000,
  video: false,
  retries: {
    runMode: 1,
    openMode: 1,
  },
  env: {
    landingPageUrl: "https://www.xfinity.com/national",
    mobileOverviewPageUrl: "https://www.xfinity.com/learn/mobile-service",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    setupNodeEvents(on) {
      // return require("./cypress/plugins/index.js")(on);
      installLogsPrinter(on, {
        printLogsToConsole: "always",
        collectTestLogs: () => console.log('******* Test Completed ********'),
        includeSuccessfulHookLogs: true,
      });
    },
    baseUrl: "https://www.xfinity.com/overview"
  },
});
