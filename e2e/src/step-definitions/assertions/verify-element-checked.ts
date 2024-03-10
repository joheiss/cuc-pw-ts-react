import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";
import { logger } from "../../logger";
import { showErrorMessage } from "../../support/error-helper";

Then(
  /^the "([^"]*)" (?:checkbox|check box|radio button|switch) should( not)? be checked$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
    logger.log(`the ${elementKey} check box|radio button|switch should ${negate ? "not" : ""} be checked`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const locator = page!.locator(elementIdentifier);
    try {
      await expect(locator).toBeChecked({ checked: !negate });
    } catch (error) {
      showErrorMessage(`🧨 Assertion failed: ${elementKey} is ${!negate ? "not " : ""}checked 🧨`);
    }
  }
);
