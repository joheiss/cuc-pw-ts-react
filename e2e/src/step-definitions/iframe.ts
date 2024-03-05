import { When } from "@cucumber/cucumber";
import { ElementKey } from "./setup/global";
import { ScenarioWorld } from "./setup/world";
import { getElementLocator } from "../support/web-element-helper";
import { getIframe, inputValueOnIframe } from "../support/html-behavior";

When(
  /^I fill in the "([^"]*)" input field on the "([^"]*)" iframe with "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, input: string) {
    console.log(`I fill in the ${elementKey} input field on the ${iframeName} iframe with ${input}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);
    const iframeIdentifier = getElementLocator(page!, iframeName, globalConfig);
    const iframe = await getIframe(page!, iframeIdentifier);

    await inputValueOnIframe(iframe!, elementIdentifier, input);
  }
);
