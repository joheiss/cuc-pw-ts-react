import { When } from "@cucumber/cucumber";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";
import { convertPosToIndex, getElementLocator } from "../support/web-element-helper";
import { clickElement, clickElementAndWait, clickElementAtIndex } from "../support/html-behavior";
import { logger } from "../logger";

When(
  /^I click the "([^"]*)" (?:button|link|icon|element)$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    logger.log(`I click the ${elementKey} (button|link|icon|element)`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    await clickElement(page!, elementIdentifier);
  }
);

When(
  /I click the "([^"]*)" (?:button|link|icon|element) and wait briefly$/,
  async function (this: ScenarioWorld, elementKey: ElementKey) {
    logger.log(`I click the ${elementKey} (button|link|icon|element)`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    await clickElementAndWait(page!, elementIdentifier, 500);
  }
);

When(
  /I click the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link|icon|element)$/,
  async function (this: ScenarioWorld, elementPosition: string, elementKey: ElementKey) {
    logger.log(`I click the ${elementPosition} ${elementKey} (button|link|icon|element)`);

    const { page, globalConfig } = this;

    const index = convertPosToIndex(elementPosition);

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    await clickElementAtIndex(page!, elementIdentifier, index);
  }
);
