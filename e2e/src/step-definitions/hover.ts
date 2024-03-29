import { When } from "@cucumber/cucumber";
import { hoverElement } from "../support/html-behavior";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";
import { logger } from "../logger";

When(/I hover over the "([^"]*)" (?:button|link|icon|element)$/, async function (this: ScenarioWorld, elementKey: ElementKey) {
  logger.log(`I hover over the ${elementKey} (button|link|icon|element)`);

  const { page, globalConfig } = this;

  const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
  await hoverElement(page!, elementIdentifier);
});
