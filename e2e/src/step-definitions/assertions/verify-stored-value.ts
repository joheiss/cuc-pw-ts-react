import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";

Then(
  /^the "([^"]*)" should( not)? equal the "([^"]*)" stored in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
    const { page, globalConfig, globalVariables } = this;

    console.log(`the ${elementKey} should ${negate ? "not " : ""}equal the ${globalVariables[variableKey]} stored in global variables`);

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await page!.locator(elementIdentifier).textContent();
    const storedValue = globalVariables[variableKey];

    expect((content === storedValue) === !negate);
  }
);

Then(
  /^the "([^"]*)" should( not)? contain the "([^"]*)" stored in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
    const { page, globalConfig, globalVariables } = this;

    console.log(`the ${elementKey} should ${negate ? "not " : ""}contain the ${globalVariables[variableKey]} stored in global variables`);

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await page!.locator(elementIdentifier).textContent();
    const storedValue = globalVariables[variableKey];

    expect(content?.includes(storedValue) === !negate);
  }
);
