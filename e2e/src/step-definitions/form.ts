import { Then } from "@cucumber/cucumber";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";
import { getElementLocator } from "../support/web-element-helper";
import { inputValue, selectOption } from "../support/html-behavior";
import { parseInput } from "../support/input-helper";
import { logger } from "../logger";
import { stringIsOfOptions } from "../support/options-helper";
import { RandomInputType, getRandomData, randomInputTypes } from "../support/random-data-helper";

Then(
  /^I fill in the "([^"]*)" input field with "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, input: string) {
    logger.log(`I fill in the ${elementKey} input field with ${input}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const parsedInput = parseInput(input);
    await inputValue(page!, elementIdentifier, parsedInput);
  }
);

Then(
  /^I select the "([^"]*)" option from the "([^"]*)"$/,
  async function (this: ScenarioWorld, option: string, elementKey: ElementKey) {
    logger.log(`I select the ${option} option from the ${elementKey}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    await selectOption(page!, elementIdentifier, option);
  }
);

Then(
  /^I fill in the "([^"]*)" input field with random "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, randomInputType: RandomInputType) {
    logger.log(`I fill in the ${elementKey} input field with random ${randomInputType}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const validRandomInputType = stringIsOfOptions<RandomInputType>(randomInputType, randomInputTypes);

    const randomInput = getRandomData(validRandomInputType);
    await inputValue(page!, elementIdentifier, randomInput);
  }
);

Then(
  /^I fill in the "([^"]*)" input field with the value from global variable "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, variableKey: string) {
    logger.log(`I fill in the ${elementKey} input field with value from global variable ${variableKey}`);

    const { page, globalConfig, globalVariables } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const input = globalVariables[variableKey];

    await inputValue(page!, elementIdentifier, input);
  }
);
