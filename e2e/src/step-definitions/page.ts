import { Then } from "@cucumber/cucumber";
import { inputValue } from "../support/html-behavior";
import { convertPosToIndex, getElementLocator } from "../support/web-element-helper";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";

Then(
  /^I fill in the "([^"]*)" input field on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:page|tab|window) with "([^"]*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, tabPosition: string, input: string) {
    console.log(`I fill in the ${elementKey} input field on the ${tabPosition} page with ${input}`);

    const { page, context, globalConfig } = this;

    const tabIndex = convertPosToIndex(tabPosition);
    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const pages = context?.pages();
    await inputValue(pages?.[tabIndex]!, elementIdentifier, input);
  }
);
