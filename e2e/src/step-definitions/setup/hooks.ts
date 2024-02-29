import { After, Before, BeforeAll, ITestCaseHookParameter, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { ScenarioWorld } from "./world";
import { getEnv } from "../../env/env";
import { env, envNumber } from "../../env/parse-env";
import { readFileSync } from "fs";

BeforeAll(async () => {
  getEnv();
  setDefaultTimeout(envNumber("SCRIPT_TIMEOUT"));
});

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  console.log(`Running cucumber scenario: ${scenario.pickle.name}`);

  const contextOptions = {
    recordVideo: {
      dir: `${env("VIDEOS_PATH")}`,
    },
  };

  const ready = await this.init(contextOptions);
  return ready;
});

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
  const { page, browser } = this.screen;
  const status = scenario.result?.status;

  const videoPath = await page?.video()?.path();

  if (status === Status.FAILED) {
    const screenshot = await page.screenshot({
      path: `${env("SCREENSHOTS_PATH")}/${scenario.pickle.name}.png`,
      type: "png",
    });
    await page.close();

    // attach screenshot AFTER closing the page
    this.attach(screenshot, "image/png");
  } else {
    await page.close();
  }

  // attach video AFTER closing the page
  this.attach(readFileSync(videoPath!), "video/webm");

  await browser.close();
  return browser;
});
