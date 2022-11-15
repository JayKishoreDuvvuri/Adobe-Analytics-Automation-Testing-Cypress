const cyTerminalReportInstallLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");
module.exports = (on) => {
  cyTerminalReportInstallLogsPrinter(on),
    on("task", {
      printLogsToConsole: "always",
      // failed: require("cypress-failed-log/src/failed"),
    });

  on("task", {
    log(message) {
      console.log(message);
      return null;
    },
  });
};
