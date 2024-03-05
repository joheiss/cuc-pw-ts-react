import { Then } from "@cucumber/cucumber";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";
import { getElementLocator } from "../support/web-element-helper";
import { inputValue, selectOption } from "../support/html-behavior";

Then(/^I fill in the "([^"]*)" input field with "([^"]*)"$/, async function (this: ScenarioWorld, elementKey: ElementKey, input: string) {
  console.log(`I fill in the ${elementKey} input field with ${input}`);

  const { page, globalConfig } = this;

  const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

  await inputValue(page!, elementIdentifier, input);
});

Then(/^I select the "([^"]*)" option from the "([^"]*)"$/, async function (this: ScenarioWorld, option: string, elementKey: ElementKey) {
  console.log(`I select the ${option} option from the ${elementKey}`);

  const { page, globalConfig } = this;

  const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

  await selectOption(page!, elementIdentifier, option);
});
