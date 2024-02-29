import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { waitFor } from "../../support/wait-for-behavior";

Then(/^the "([^"]*)" should contain the text "(.*)"$/, async function (elementKey: ElementKey, expectedElementText: string) {
  console.log(`the ${elementKey} should contain the text ${expectedElementText}`);

  const {
    screen: { page },
    globalVariables,
    globalConfig,
  } = this;

  const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig);

  await waitFor(async () => {
    const elementText = await page.textContent(elementIdentifier);
    return elementText?.includes(expectedElementText);
  });

  // const content = await this.screen.page.locator(elementIdentifier).textContent();
  // expect(content).toBe(expectedElementText);
});
