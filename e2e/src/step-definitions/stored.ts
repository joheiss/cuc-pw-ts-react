import { When } from "@cucumber/cucumber";
import { getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";
import { logger } from "../logger";
import { getElementValue } from "../support/html-behavior";

When(
  /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, variableKey: string) {
    logger.log(`I retrieve the ${elementKey} text and store it as ${variableKey} in global variables`);

    const { page, globalConfig, globalVariables } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const content = await page?.locator(elementIdentifier).textContent();
    if (content) {
      globalVariables[variableKey] = content;
    }
  }
);

When(
  /^I retrieve the "([^"]*)" value and store it as "([^"]*)" in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, variableKey: string) {
    logger.log(`I retrieve the ${elementKey} value and store it as ${variableKey} in global variables`);

    const { page, globalConfig, globalVariables } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const value = await getElementValue(page!, elementIdentifier);
    if (value) {
      globalVariables[variableKey] = value;
    }
  }
);
