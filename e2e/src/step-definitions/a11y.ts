import { When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { logger } from "../logger";
import { ScenarioWorld } from "./setup/world";
import { AxeBuilder } from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import { env } from "../env/parse-env";
import { getCurrentPageId } from "../support/navgation-behavior";

When(/^I generate the AXE accessibility report$/, async function (this: ScenarioWorld) {
  logger.log(`I generate the AXE accessibility report`);

  const { page, globalConfig } = this;

  const pageId = getCurrentPageId(page!, globalConfig);

  const accessibilityScanResults = await new AxeBuilder({ page: page! })
    .disableRules(["duplicate-id", "region"])
    .analyze();

  const reportHTML = createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: `TestingTalksHub-${pageId}`,
      outputDir: env("AXE_REPORT_PATH"),
      reportFileName: `AXE_report_${pageId}_page.html`,
    },
  });

  // expect(
  //   accessibilityScanResults.violations,
  //   `Accessibility violations found for ${pageId} page. Please see AXE report`
  // ).toEqual([]);
});
