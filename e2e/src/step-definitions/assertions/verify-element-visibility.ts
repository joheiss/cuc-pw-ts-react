import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { waitFor } from "../../support/wait-for-behavior";

Then(/^the "([^"]*)" should be displayed$/, async function (elementKey: ElementKey) {
  console.log(`the ${elementKey} should be displayed`);

  const {
    screen: { page },
    globalVariables,
    globalConfig,
  } = this;

  const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig);

  await waitFor(async () => {
    const isElementVisible = (await page.$(elementIdentifier)) != null;
    return isElementVisible;
  });

  // const locator = page.locator(elementIdentifier);
  // await expect(locator).toBeVisible();
});
