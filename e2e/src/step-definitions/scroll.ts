import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { ElementKey } from "./setup/global";
import { getElementLocator } from "../support/web-element-helper";
import { scrollIntoView } from "../support/html-behavior";
import { logger } from "../logger";

Then(/^I scroll to the "([^"]*)"$/, async function (this: ScenarioWorld, elementKey: ElementKey) {
  logger.log(`I scroll to the ${elementKey}`);

  const { page, globalConfig } = this;

  const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

  await scrollIntoView(page!, elementIdentifier);
});
