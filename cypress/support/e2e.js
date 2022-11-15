import "./commands";
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
// import cyTerminalReportInstallLogsCollector from "cypress-terminal-report/src/installLogsCollector";
// cyTerminalReportInstallLogsCollector();

import installLogsCollector from "cypress-terminal-report/src/installLogsCollector";
installLogsCollector();

require("cypress-xpath");
// require("cypress-failed-log");
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
});
