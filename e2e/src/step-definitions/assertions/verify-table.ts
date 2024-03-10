import { expect } from "@playwright/test";
import { DataTable, Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "../setup/world";
import { ElementKey } from "../setup/global";
import { getElementLocator } from "../../support/web-element-helper";
import { logger } from "../../logger";
import { getTableData } from "../../support/html-behavior";
import { showErrorMessage } from "../../support/error-helper";

Then(
  /^the "([^"]*)" table should( not)? equal the following:$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
    logger.log(`the ${elementKey} table should ${negate ? "not " : ""}equal the following:`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const data = await getTableData(page!, elementIdentifier);

    try {
      expect((data === JSON.stringify(dataTable.raw())) === !negate).toBeTruthy();
    } catch (error) {
      showErrorMessage(
        `🧨 Assertion failed: the content in table "${elementKey}" does ${
          !negate ? "not " : ""
        }equal the listed values 🧨`
      );
    }
  }
);
