import reporter, { Options } from "cucumber-html-reporter";
import { env } from "../env/parse-env";
import { getEnv } from "../env/env";

getEnv();

const options: Options = {
  theme: "bootstrap",
  jsonFile: env("JSON_REPORT_FILE"),
  output: env("HTML_REPORT_FILE"),
  screenshotsDirectory: env("SCREENSHOTS_PATH"),
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: false,
};

reporter.generate(options);
