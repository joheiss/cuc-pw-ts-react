import { Page } from "@playwright/test";
import { logger } from "../logger";
import { ElementLocator } from "../step-definitions/setup/global";

export const waitFor = async <T>(
  predicate: () => T | Promise<T>,
  options?: { timeout?: number; wait?: number }
): Promise<T> => {
  const { timeout = 10000, wait = 2000 } = options || {};

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const startDate = new Date();

  while (new Date().getTime() - startDate.getTime() < timeout) {
    const result = await predicate();
    if (result) return result;
    await sleep(wait);
    logger.log(`Waiting ${wait}ms`);
  }

  throw new Error(`Wait time of ${timeout}ms exceeded!`);
};

export const waitForSelector = async (page: Page, elementIdentifier: ElementLocator): Promise<boolean> => {
  try {
    await page.waitForSelector(elementIdentifier, {
      state: "visible",
      timeout: Number(process.env.SELECTOR_TIMEOUT ?? "5000"),
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const waitForSelectorOnPage = async (page: Page, elementIdentifier: ElementLocator, pages: Page[], pageIndex: number): Promise<boolean> => {
  try {
    await pages[pageIndex].waitForSelector(elementIdentifier, {
      state: "visible",
      timeout: Number(process.env.SELECTOR_TIMEOUT ?? "5000"),
    });
    return true;
  } catch (error) {
    return false;
  }
};
