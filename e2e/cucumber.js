const dotenv = require("dotenv");
dotenv.config({
  override: true,
  path: `./env/.env`,
});
dotenv.config({
  override: true,
  path: `./env/.env.${process.env.STAGE || "prod"}`,
});

const globalConfig = require("./config/global-config.js");

module.exports = {
  default: {
    tags: "@dev or @smoke or @regression",
    parallel: Number(process.env.PARALLEL) || 1,
    retry: Number(process.env.RETRY) || 0,
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["./src/features/**/*.feature"],
    dryRun: false,
    require: ["./src/step-definitions/**/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/reports/cucumber-report.html",
      "json:test-results/reports/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    worldParameters: globalConfig,
  },
  rerun: {
    tags: "@dev or @smoke or @regression",
    parallel: Number(process.env.PARALLEL) || 1,
    retry: 0,
    formatOptions: {
      snippetInterface: "async-await",
    },
    dryRun: false,
    require: ["./src/step-definitions/**/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/reports/cucumber-report.html",
      "json:test-results/reports/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    worldParameters: globalConfig,
  },
};
