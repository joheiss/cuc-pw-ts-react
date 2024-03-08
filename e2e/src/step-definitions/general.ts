import { Then, When } from "@cucumber/cucumber";
import { wait } from "../support/html-behavior";
import { ScenarioWorld } from "./setup/world";
import { logger } from "../logger";

When(/I wait for "([^"]*)" milliseconds$/, async function (this: ScenarioWorld, waitMs: string) {
  logger.log(`I wait for ${waitMs} milliseconds`);

  const { page } = this;

  const millis = Number(waitMs);

  await wait(page!, millis);
});

Then(/I wait for the (?:page|tab|window) to be loaded$/, async function (this: ScenarioWorld) {
  logger.log(`I wait for the page|tab|window to be loaded`);

  const { context } = this;

  const pagePromise = context?.waitForEvent("page");
  const newPage = await pagePromise;
});
