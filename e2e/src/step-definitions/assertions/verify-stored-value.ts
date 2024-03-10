import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { ScenarioWorld } from "../setup/world";
import { logger } from "../../logger";
import { getElementText } from "../../support/html-behavior";
import { showErrorMessage } from "../../support/error-helper";

Then(
  /^the "([^"]*)" should( not)? equal the "([^"]*)" stored in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
    const { page, globalConfig, globalVariables } = this;

    logger.log(
      `the ${elementKey} should ${negate ? "not " : ""}equal the ${
        globalVariables[variableKey]
      } stored in global variables`
    );

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getElementText(page!, elementIdentifier);
    const storedValue = globalVariables[variableKey];

    try {
      expect((content === storedValue) === !negate);
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the value in ${elementKey} does ${
          !negate ? "not " : ""
        }equal the global variable "${variableKey}" 🧨`
      );
    }
  }
);

Then(
  /^the "([^"]*)" should( not)? contain the "([^"]*)" stored in global variables$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
    const { page, globalConfig, globalVariables } = this;

    logger.log(
      `the ${elementKey} should ${negate ? "not " : ""}contain the ${
        globalVariables[variableKey]
      } stored in global variables`
    );

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const content = await getElementText(page!, elementIdentifier);
    const storedValue = globalVariables[variableKey];

    try {
      expect(content?.includes(storedValue) === !negate);
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the value in ${elementKey} does ${
          !negate ? "not " : ""
        }contain the value in global variable "${variableKey}" 🧨`
      );
    }
  }
);
