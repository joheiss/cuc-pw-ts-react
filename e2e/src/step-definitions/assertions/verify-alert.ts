import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ScenarioWorld } from "../setup/world";
import { getElementLocator } from "../../support/web-element-helper";
import { ElementKey } from "../setup/global";
import { clickElement } from "../../support/html-behavior";
import { logger } from "../../logger";

Then(
  /^after clicking the "([^"]*)" (?:button|link|icon|element) the alert dialog should( not)? contain the message "(.*)"$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
    logger.log(`the alert dialog should ${negate ? "not " : ""}contain the message ${expectedElementText}`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    page?.on("dialog", async (dialog) => {
      logger.debug("message: ", dialog.message());
      expect(dialog.message()).toContain(expectedElementText);
      await dialog.dismiss();
    });
    await clickElement(page!, elementIdentifier);
  }
);
