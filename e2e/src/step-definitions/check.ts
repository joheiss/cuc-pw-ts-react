import { When } from "@cucumber/cucumber";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";
import { getElementLocator } from "../support/web-element-helper";
import { checkElement, uncheckElement } from "../support/html-behavior";

When(
  /I (check)?(uncheck)? the "([^"]*)" (?:checkbox|check box|radio button|switch)$/,
  async function (this: ScenarioWorld, check: boolean, uncheck: boolean, elementKey: ElementKey) {
    console.log(`I ${!!check ? "check" : "uncheck"} the ${elementKey} checkbox or radio button`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    !!check ? await checkElement(page!, elementIdentifier) : await uncheckElement(page!, elementIdentifier);
  }
);
