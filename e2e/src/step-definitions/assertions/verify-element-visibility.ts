import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";

Then(/^the "([^"]*)" should( not)? be displayed$/, async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
  console.log(`the ${elementKey} should ${negate ? "not" : ""} be displayed`);

  const { page, globalConfig } = this;

  const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

  const locator = page!.locator(elementIdentifier);
  // !!negate ? await expect(locator).toBeHidden() : await expect(locator).toBeVisible();
  await expect(locator).toBeVisible({ visible: !negate });
});
