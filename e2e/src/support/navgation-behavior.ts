import { Page } from "@playwright/test";
import { GlobalConfig, PageId } from "../step-definitions/setup/global";

/**
 * Navigates to a given page - utilizing config to find the corrrect url
 * @param page
 * @param pageId
 * @param globalConfig
 */
export const navigateToPage = async (page: Page, pageId: PageId, globalConfig: GlobalConfig): Promise<void> => {
  const { hostsConfig, pagesConfig } = globalConfig;

  // determine host
  const { UI_AUTOMATION_HOST: hostname = "localhost" } = process.env;
  const hostPath = hostsConfig[hostname];
  const url = new URL(hostPath);

  // determine page
  const pagesConfigItem = pagesConfig[pageId];
  url.pathname = pagesConfigItem.route;

  await page.goto(url.href, { waitUntil: "domcontentloaded" });
};

/**
 * Check if current url path matches the given page id
 * @param page
 * @param pageId
 * @param globalConfig
 * @returns
 */
export const currentPathMatchesPageId = (page: Page, pageId: PageId, globalConfig: GlobalConfig): boolean => {
  const { pathname: currentPath } = new URL(page.url());
  return pathMatchesPageId(currentPath, pageId, globalConfig);
};

/**
 * Check if page id exists in global configuration
 * @param path
 * @param pageId
 * @param pagesConfig
 * @returns
 */
const pathMatchesPageId = (path: string, pageId: PageId, { pagesConfig }: GlobalConfig): boolean => {
  const pageRegexString = pagesConfig[pageId].regex;
  const pageRegex = new RegExp(pageRegexString);
  return pageRegex.test(path);
};

/**
 * Returns the page id from global configuration for a given page
 * @param page
 * @param globalConfig
 * @returns
 */
export const getCurrentPageId = (page: Page, globalConfig: GlobalConfig): PageId => {
  const { pagesConfig } = globalConfig;
  const pageIds = Object.keys(pagesConfig);
  const { pathname: currentPath } = new URL(page.url());
  const currentPageId = pageIds.find((pageId) => pathMatchesPageId(currentPath, pageId, globalConfig));
  if (!currentPageId) {
    throw new Error(
      `Failed to get page name from current route ${currentPath}, possible pages ${JSON.stringify(pagesConfig)}`
    );
  }
  return currentPageId;
};

/**
 * Reload page
 * @param page
 */
export const reloadPage = async (page: Page): Promise<void> => {
  await page.reload();
};
