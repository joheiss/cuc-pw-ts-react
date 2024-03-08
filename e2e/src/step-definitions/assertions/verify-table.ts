import { expect } from "@playwright/test";
import { DataTable, Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "../setup/world";
import { ElementKey } from "../setup/global";
import { getElementLocator } from "../../support/web-element-helper";
import { logger } from "../../logger";

Then(
  /^the "([^"]*)" table should( not)? equal the following:$/,
  async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
    logger.log(`the ${elementKey} table should ${negate ? "not " : ""}equal the following:`);

    const { page, globalConfig } = this;

    const elementIdentifier = getElementLocator(page!, elementKey, globalConfig);

    const data = await page?.locator(`${elementIdentifier} tbody tr`).evaluateAll((rows) => {
      return rows.map((row) => {
        const cells = row.querySelectorAll("th, td");
        return Array.from(cells).map((cell) => cell.textContent);
      });
    });
    // const data = await page?.$$eval(`${elementIdentifier} tbody tr`, (rows) => {
    //   return rows.map((row) => {
    //     const cells = row.querySelectorAll("td");
    //     return Array.from(cells).map((cell) => cell.textContent);
    //   });
    // });
    expect((JSON.stringify(data) === JSON.stringify(dataTable.raw())) === !negate).toBeTruthy();
  }
);
