import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ScenarioWorld } from "../setup/world";
import { ElementKey } from "../setup/global";
import { convertPosToIndex, getElementLocator } from "../../support/web-element-helper";
import { logger } from "../../logger";
import { getElementText } from "../../support/html-behavior";
import { showErrorMessage } from "../../support/error-helper";

Then(
  /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? contain the title "(.*)"$/,
  async function (this: ScenarioWorld, tabPosition: string, negate: boolean, expectedTitle: string) {
    logger.log(`the ${tabPosition} page should ${negate ? "not " : ""}contain the title ${expectedTitle}`);

    const { page, context } = this;

    const tabIndex = convertPosToIndex(tabPosition);

    const tab = context?.pages()?.[tabIndex];
    const title = await tab?.title();
    // const locator = tab?.getByTitle(expectedTitle);
    // !negate
    // ? await expect(locator!).toHaveText(expectedTitle)
    // : await expect(locator!).not.toHaveText(expectedTitle);
    logger.debug("title: ", title);
    // expect(!!tab === !negate).toBeTruthy();

    try {
      expect(title?.includes(expectedTitle) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: ${tabPosition} page does ${!negate ? "not " : ""}contain the title ${expectedTitle}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, tabPosition: string, negate: boolean) {
    logger.log(`the ${elementKey} on the ${tabPosition} page should ${negate ? "not " : ""}be displayed`);

    const { page, context, globalConfig } = this;

    const tabIndex = convertPosToIndex(tabPosition);
    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const pages = context?.pages();
    const tab = pages?.[tabIndex];

    const locator = tab!.locator(elementIdentifier);

    try {
      await expect(locator).toBeVisible({ visible: !negate });
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementKey} on the ${tabPosition} page is ${!negate ? "not " : ""}displayed" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? contain the text "(.*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    tabPosition: string,
    negate: boolean,
    expectedElementText: string
  ) {
    logger.log(
      `the ${elementKey} on the ${tabPosition} page should ${
        negate ? "not " : ""
      }contain the text ${expectedElementText}`
    );

    const { page, context, globalConfig } = this;

    const tabIndex = convertPosToIndex(tabPosition);
    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const pages = context?.pages();
    const tab = pages?.[tabIndex];

    // const content = await tab!.locator(elementIdentifier).textContent();

    const content = await getElementText(tab!, elementIdentifier);

    try {
      expect(content?.includes(expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementKey} on the ${tabPosition} page does ${
          !negate ? "not " : ""
        }contain the text ${expectedElementText}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) should( not)? equal the text "(.*)"$/,
  async function (
    this: ScenarioWorld,
    elementKey: ElementKey,
    tabPosition: string,
    negate: boolean,
    expectedElementText: string
  ) {
    logger.log(
      `the ${elementKey} on the ${tabPosition} page should ${negate ? "not " : ""}equal the text ${expectedElementText}`
    );

    const { page, context, globalConfig } = this;

    const tabIndex = convertPosToIndex(tabPosition);
    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const pages = context?.pages();
    const tab = pages?.[tabIndex];

    const content = await getElementText(tab!, elementIdentifier);

    try {
      expect((content === expectedElementText) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the ${elementKey} on the ${tabPosition} page does ${
          !negate ? "not " : ""
        }equal the text ${expectedElementText}" 🧨`
      );
    }
  }
);
