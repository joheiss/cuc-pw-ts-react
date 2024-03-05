import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ScenarioWorld } from "../setup/world";
import { ElementKey } from "../setup/global";
import { convertPosToIndex, getElementLocator } from "../../support/web-element-helper";

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? contain the title "(.*)"$/,
  async function (this: ScenarioWorld, tabPosition: string, negate: boolean, expectedTitle: string) {
    console.log(`the ${tabPosition} page should ${negate ? "not " : ""}contain the title ${expectedTitle}`);

    const { page, context } = this;

    const tabIndex = convertPosToIndex(tabPosition);

    // await page?.waitForTimeout(500);
    const pages = context?.pages();
    const tabTitle = await pages?.[tabIndex].title();

    expect(tabTitle?.includes(expectedTitle) === !negate).toBeTruthy();
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, tabPosition: string, negate: boolean) {
    console.log(`the ${elementKey} on the ${tabPosition} page should ${negate ? "not " : ""}be displayed`);

    const { page, context, globalConfig } = this;

    const tabIndex = convertPosToIndex(tabPosition);
    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const pages = context?.pages();
    const tab = pages?.[tabIndex];

    const locator = tab!.locator(elementIdentifier);
    await expect(locator).toBeVisible({ visible: !negate });
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, tabPosition: string, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} on the ${tabPosition} page should ${negate ? "not " : ""}contain the text ${expectedElementText}`);

    const { page, context, globalConfig } = this;

    const tabIndex = convertPosToIndex(tabPosition);
    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const pages = context?.pages();
    const tab = pages?.[tabIndex];

    const content = await tab!.locator(elementIdentifier).textContent();
    expect(content?.includes(expectedElementText) === !negate).toBeTruthy();
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? equal the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, tabPosition: string, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} on the ${tabPosition} page should ${negate ? "not " : ""}equal the text ${expectedElementText}`);

    const { page, context, globalConfig } = this;

    const tabIndex = convertPosToIndex(tabPosition);
    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const pages = context?.pages();
    const tab = pages?.[tabIndex];

    const content = await tab!.locator(elementIdentifier).textContent();
    console.log("content: ", content);
    expect((content === expectedElementText) === !negate).toBeTruthy();
  }
);
