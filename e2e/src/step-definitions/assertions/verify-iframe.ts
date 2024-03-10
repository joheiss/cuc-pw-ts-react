import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ScenarioWorld } from "../setup/world";
import { ElementKey } from "../setup/global";
import { getElementLocator } from "../../support/web-element-helper";
import { getElementTextOnIframe } from "../../support/html-behavior";
import { logger } from "../../logger";
import { showErrorMessage } from "../../support/error-helper";

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, negate: boolean) {
    logger.log(`the ${elementKey} on the ${iframeName} iframe should ${negate ? "not" : ""} be displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page!, iframeName, globalConfig);

    const locator = page?.frameLocator(iframeIdentifier).locator(elementIdentifier);

    try {
      await expect(locator!).toBeVisible({ visible: !negate });
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementKey} on the ${iframeName} is ${!negate ? "not " : ""}displayed" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    iframeName: string,
    negate: boolean,
    expectedElementText: string
  ) {
    logger.log(
      `the ${elementKey} on the ${iframeName} iframe should ${
        negate ? "not " : ""
      }contain the text ${expectedElementText}`
    );

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page!, iframeName, globalConfig);

    const content = await getElementTextOnIframe(page!, iframeIdentifier, elementIdentifier);

    try {
      expect(content?.includes(expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementKey} on the ${iframeName} does ${
          !negate ? "not " : ""
        }contain the text ${expectedElementText}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    iframeName: string,
    negate: boolean,
    expectedElementText: string
  ) {
    logger.log(
      `the ${elementKey} on the ${iframeName} iframe should ${
        negate ? "not " : ""
      }equal the text ${expectedElementText}`
    );

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page!, iframeName, globalConfig);

    const content = await getElementTextOnIframe(page!, iframeIdentifier, elementIdentifier);

    try {
      expect((content === expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementKey} on the ${iframeName} does ${
          !negate ? "not " : ""
        }equal the text ${expectedElementText}" 🧨`
      );
    }
  }
);
