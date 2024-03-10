import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { convertPosToIndex, getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";
import {
  getElementAttributeValue,
  getElementText,
  getElementTextAtIndex,
  getElementValue,
  isElementDisabled,
} from "../../support/html-behavior";
import { logger } from "../../logger";
import { showErrorMessage } from "../../support/error-helper";

Then(
  /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    logger.log(`the ${elementKey} should ${negate ? "not " : ""}contain the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getElementText(page!, elementIdentifier);

    try {
      expect(content?.includes(expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: ${elementKey} does ${!negate ? "not " : ""}contain the text "${expectedElementText}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" should( not)? be equal to the text "(.*)"$/,
  // { timeout: -1 },
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    logger.log(`the ${elementKey} should ${negate ? "not " : ""}be equal to the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    // await page.pause();

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getElementText(page!, elementIdentifier);

    try {
      expect((content === expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: ${elementKey} does ${!negate ? "not " : ""}equal the text "${expectedElementText}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    logger.log(`the ${elementKey} should ${negate ? "not " : ""}contain the value ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getElementValue(page!, elementIdentifier);

    try {
      expect(content?.includes(expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: ${elementKey} does ${!negate ? "not " : ""}contain the value "${expectedElementText}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" should( not)? equal the value "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    logger.log(`the ${elementKey} should ${negate ? "not " : ""}equal the value ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getElementValue(page!, elementIdentifier);

    try {
      expect((content === expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: ${elementKey} does ${!negate ? "not " : ""}equal the value "${expectedElementText}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" should( not)? be disabled$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
    logger.log(`the ${elementKey} should ${negate ? "not " : ""}be disabled`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await isElementDisabled(page!, elementIdentifier);

    try {
      expect.soft(content === !negate).toBeTruthy();
    } catch (error) {
      logger.debug("Error: ", error);
      showErrorMessage(`🧨 Assertion failed: ${elementKey} is ${!negate ? "not " : ""}disabled" 🧨`);
    }
  }
);

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? contain the text "(.*)"$/,
  async function (
    this: ScenarioWorld,
    elementPosition: string,
    elementKey: ElementKey,
    negate: boolean,
    expectedElementText: string
  ) {
    logger.log(
      `the ${elementPosition} ${elementKey} should ${negate ? "not" : ""} contain the text ${expectedElementText}`
    );

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const index = convertPosToIndex(elementPosition);

    const content = await getElementTextAtIndex(page!, elementIdentifier, index);

    try {
      expect(content?.includes(expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementPosition} of element ${elementKey} does ${
          !negate ? "not " : ""
        }contain the text "${expectedElementText}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" "([^"]*)" attribute should( not)? contain the text "(.*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    attribute: string,
    negate: boolean,
    expectedElementText: string
  ) {
    logger.log(
      `the ${elementKey} ${attribute} attribute should ${negate ? "not " : ""}contain the text ${expectedElementText}`
    );

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getElementAttributeValue(page!, elementIdentifier, attribute);

    try {
      expect(content!.includes(expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementKey} ${attribute} attribute does ${
          !negate ? "not " : ""
        }contain the text "${expectedElementText}" 🧨`
      );
    }
  }
);
