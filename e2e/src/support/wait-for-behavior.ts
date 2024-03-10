import { Page } from "@playwright/test";
import { logger } from "../logger";
import { ElementLocator, GlobalConfig, WaitForTarget, WaitForTargetType } from "../step-definitions/setup/global";
import { handleError } from "./error-helper";

export const enum WaitForResult {
  PASS = 1,
  FAIL = 2,
  ELEMENT_NOT_FOUND = 3,
}
export type WaitForResultWithContext = {
  result: WaitForResult;
  replace?: string;
};

export const waitFor = async <T>(
  predicate: () =>
    | WaitForResult
    | Promise<WaitForResult>
    | WaitForResultWithContext
    | Promise<WaitForResultWithContext>,
  globalConfig: GlobalConfig,
  options?: {
    timeout?: number;
    wait?: number;
    target?: WaitForTarget;
    type?: WaitForTargetType;
    failureMessage?: string;
  }
): Promise<void> => {
  const { timeout = 10000, wait = 2000, target = "", type = "element" } = options || {};

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const startDate = new Date();
  let notFoundContext: string | undefined;

  try {
    while (new Date().getTime() - startDate.getTime() < timeout) {
      const result = await predicate();
      let resultAs: WaitForResult;

      if (result as WaitForResultWithContext) {
        notFoundContext = (result as WaitForResultWithContext).replace;
        resultAs = (result as WaitForResultWithContext).result;
      } else {
        resultAs = result as WaitForResult;
      }

      if (resultAs === WaitForResult.PASS) {
        return;
      } else if (resultAs === WaitForResult.FAIL) {
        throw new Error(options?.failureMessage || "Test assertion failed")
      }
      await sleep(wait);
      logger.debug(`Waiting ${wait}ms`);
    }
    throw new Error(`Wait time of ${timeout}ms for ${notFoundContext || target} exceeded`);
  } catch (error) {
    handleError(globalConfig.errorsConfig, error as Error, target, type);
  }
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

export const waitForSelectorOnPage = async (
  page: Page,
  elementIdentifier: ElementLocator,
  pages: Page[],
  pageIndex: number
): Promise<boolean> => {
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
