import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { convertPosToIndex, getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";

Then(
  /^the "([^"]*)" should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
    console.log(`the ${elementKey} should ${negate ? "not " : ""}be displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const locator = page!.locator(elementIdentifier);
    // !!negate ? await expect(locator).toBeHidden() : await expect(locator).toBeVisible();
    await expect(locator).toBeVisible({ visible: !negate });
  }
);

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementPosition: string, elementKey: ElementKey, negate: boolean) {
    console.log(`the ${elementPosition} ${elementKey} should ${negate ? "not " : ""}be displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const index = convertPosToIndex(elementPosition);

    const locator = page!.locator(elementIdentifier).nth(index);
    await expect(locator).toBeVisible({ visible: !negate });
  }
);

Then(
  /^there should( not)? be "(\d+)" "([^"]*)" elements displayed$/,
  async function (this: ScenarioWorld, negate: boolean, elementCount: string, elementKey: ElementKey) {
    console.log(`there should ${negate ? "not " : ""}be ${elementCount} ${elementKey} displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const locator = page!.locator(elementIdentifier);
    const count = await locator.count();
    expect((Number(elementCount) === count) === !negate);
  }
);
