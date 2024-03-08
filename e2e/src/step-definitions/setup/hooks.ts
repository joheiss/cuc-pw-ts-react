import { After, Before, BeforeAll, ITestCaseHookParameter, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { ScenarioWorld } from "./world";
import { getEnv } from "../../env/env";
import { env, envNumber } from "../../env/parse-env";
import { readFileSync } from "fs";
import { BrowserContextOptions } from "playwright";
import { getViewport } from "../../support/browser-behavior";
import { logger } from "../../logger";

BeforeAll(async () => {
  getEnv();
  setDefaultTimeout(process.env.PWDEBUG ? -1 : envNumber("SCRIPT_TIMEOUT"));
});

Before({ tags: "@ignore" }, async function () {
  return "skipped" as any;
});

Before({ tags: "@debug" }, async function (this: ScenarioWorld) {
  this.debug = true;
});

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  logger.log(`Running cucumber scenario: ${scenario.pickle.name}`);

  const contextOptions: BrowserContextOptions = {
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    viewport: getViewport(),
    recordVideo: {
      dir: `${env("VIDEOS_PATH")}`,
    },
  };
  const ready = await this.init(contextOptions);
  return ready;
});

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  const { page, context, browser } = this;
  const status = scenario.result?.status;

  const videoPath = await page?.video()?.path();

  if (status === Status.FAILED) {
    const screenshot = await page!.screenshot({
      path: `${env("SCREENSHOTS_PATH")}/${scenario.pickle.name}.png`,
      type: "png",
    });
    await page?.close();

    // attach screenshot AFTER closing the page
    this.attach(screenshot, "image/png");
  } else {
    await page?.close();
  }

  // attach video AFTER closing the page
  await context?.close();
  this.attach(readFileSync(videoPath!), "video/webm");

  await browser?.close();
  return browser;
});
