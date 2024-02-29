import { getEnv } from "../env/env";
import { env } from "../env/parse-env";

const report = require("multiple-cucumber-html-reporter");

getEnv();

report.generate({
  jsonDir: env("JSON_REPORT_PATH"),
  reportPath: env("REPORT_PATH"),
  reportName: env("REPORT_NAME"),
  pageTitle: env("REPORT_TITLE"),
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "120",
    },
    device: "Local test machine",
    platform: {
      name: "osx",
      version: "14.3.1",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Book Store Application" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
      { label: "Execution Start Time", value: new Date().toISOString() },
      { label: "Execution End Time", value: new Date().toISOString() },
    ],
  },
});
