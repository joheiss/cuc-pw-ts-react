import { When } from "@cucumber/cucumber";
import { wait } from "../support/html-behavior";
import { ScenarioWorld } from "./setup/world";

When(/I wait for "([^"]*)" milliseconds$/, async function (this: ScenarioWorld, waitMs: string) {
  console.log(`I wait for ${waitMs} milliseconds`);

  const { page } = this;

  const millis = Number(waitMs);

  await wait(page!, millis);
});
