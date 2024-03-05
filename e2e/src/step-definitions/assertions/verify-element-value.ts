import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { convertPosToIndex, getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";
import { getAttributeValue, getValue, isDisabled } from "../../support/html-behavior";

Then(
  /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} should ${negate ? "not" : ""} contain the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await page!.locator(elementIdentifier).textContent();
    negate ? expect(content).not.toContain(expectedElementText) : expect(content).toContain(expectedElementText);
  }
);

Then(
  /^the "([^"]*)" should( not)? be equal to the text "(.*)"$/,
  // { timeout: -1 },
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} should ${negate ? "not" : ""} be equal to the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    // await page.pause();

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await page!.locator(elementIdentifier).textContent();
    negate ? expect(content).not.toBe(expectedElementText) : expect(content).toBe(expectedElementText);
  }
);

Then(
  /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} should ${negate ? "not " : ""}contain the value ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getValue(page!, elementIdentifier);
    negate ? expect(content).not.toContain(expectedElementText) : expect(content).toContain(expectedElementText);
  }
);

Then(
  /^the "([^"]*)" should( not)? equal the value "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} should ${negate ? "not " : ""}equal the value ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getValue(page!, elementIdentifier);
    expect((content === expectedElementText) === !negate).toBeTruthy();
  }
);

Then(/^the "([^"]*)" should( not)? be disabled$/, async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
  console.log(`the ${elementKey} should ${negate ? "not " : ""}be disabled`);

  const { page, globalConfig } = this;

  const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

  const content = await isDisabled(page!, elementIdentifier);
  expect(content === !negate).toBeTruthy();
});

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementPosition: string, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementPosition} ${elementKey} should ${negate ? "not" : ""} contain the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const index = convertPosToIndex(elementPosition);

    const content = await page!.locator(elementIdentifier).nth(index).textContent();
    expect(content?.includes(expectedElementText) === !negate);
  }
);

Then(
  /^the "([^"]*)" "([^"]*)" attribute should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, attribute: string, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} ${attribute} attribute should ${negate ? "not " : ""}contain the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getAttributeValue(page!, elementIdentifier, attribute);
    expect(content!.includes(expectedElementText) === !negate);
  }
);
