import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { waitFor } from "../../support/wait-for-behavior";
import { ScenarioWorld } from "../setup/world";

Then(
  /^the "([^"]*)" (?:checkbox|check box|radio button|switch) should( not)? be checked$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
    console.log(`the ${elementKey} check box|radio button|switch should ${negate ? "not" : ""} be checked`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const locator = page!.locator(elementIdentifier);
    await expect(locator).toBeChecked({ checked: !negate });
  }
);
