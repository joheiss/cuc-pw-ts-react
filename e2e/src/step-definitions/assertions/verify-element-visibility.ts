import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { convertPosToIndex, getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";
import { logger } from "../../logger";
import { getElementCount } from "../../support/html-behavior";
import { showErrorMessage } from "../../support/error-helper";

Then(
  /^the "([^"]*)" should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
    logger.log(`the ${elementKey} should ${negate ? "not " : ""}be displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const locator = page!.locator(elementIdentifier);

    try {
      await expect(locator).toBeVisible({ visible: !negate });
    } catch (error) {
      showErrorMessage(`🧨 Assertion failed: ${elementKey} is ${!negate ? "not " : ""}displayed" 🧨`);
    }
  }
);

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementPosition: string, elementKey: ElementKey, negate: boolean) {
    logger.log(`the ${elementPosition} ${elementKey} should ${negate ? "not " : ""}be displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const index = convertPosToIndex(elementPosition);

    const locator = page!.locator(elementIdentifier).nth(index);

    try {
      await expect(locator).toBeVisible({ visible: !negate });
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementPosition} ${elementKey}is ${!negate ? "not " : ""}displayed" 🧨`
      );
    }
  }
);

Then(
  /^there should( not)? be "(\d+)" "([^"]*)" elements displayed$/,
  async function (this: ScenarioWorld, negate: boolean, elementCount: string, elementKey: ElementKey) {
    logger.log(`there should ${negate ? "not " : ""}be ${elementCount} ${elementKey} displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const count = await getElementCount(page!, elementIdentifier);
    
    try {
      expect((Number(elementCount) === count) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the number of displayed ${elementKey} elements is ${
          !negate ? "not " : ""
        }${elementCount}" 🧨`
      );
    }
  }
);
