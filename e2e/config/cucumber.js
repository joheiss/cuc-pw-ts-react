module.exports = {
  default: {
    tags: "@dev or @smoke or @regression",
    parallel: 2,
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
    worldParameters: {
      hostsConfig: {
        localhost: "http://localhost:3000",
      },
      pagesConfig: {
        home: {
          route: "/",
        },
      },
      pageElementMappings: {
        common: {
          "header logo": "[data-id='header-logo']",
        },
        home: {
          "contacts header": "[data-id='contacts']",
        },
      },
    },
  },
};
