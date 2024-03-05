import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ScenarioWorld } from "../setup/world";
import { ElementKey } from "../setup/global";
import { getElementLocator } from "../../support/web-element-helper";
import { getIframe } from "../../support/html-behavior";

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, negate: boolean) {
    console.log(`the ${elementKey} on the ${iframeName} iframe should ${negate ? "not" : ""} be displayed`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const iframeIdentifier = getElementLocator(page!, iframeName, globalConfig);
    const iframe = await getIframe(page!, iframeIdentifier);

    const locator = iframe!.locator(elementIdentifier);
    await expect(locator).toBeVisible({ visible: !negate });
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} on the ${iframeName} iframe should ${negate ? "not " : ""}contain the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const iframeIdentifier = getElementLocator(page!, iframeName, globalConfig);
    const iframe = await getIframe(page!, iframeIdentifier);

    const content = await iframe!.locator(elementIdentifier).textContent();
    expect(content?.includes(expectedElementText) === !negate).toBeTruthy();
  }
);

Then(
  /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, iframeName: string, negate: boolean, expectedElementText: string) {
    console.log(`the ${elementKey} on the ${iframeName} iframe should ${negate ? "not " : ""}equal the text ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const iframeIdentifier = getElementLocator(page!, iframeName, globalConfig);
    const iframe = await getIframe(page!, iframeIdentifier);

    const content = await iframe!.locator(elementIdentifier).textContent();
    expect((content === expectedElementText) === !negate).toBeTruthy();
  }
);
