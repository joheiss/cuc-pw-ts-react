import { Page } from "@playwright/test";
import { GlobalConfig, PageId } from "../step-definitions/setup/global";

export const navigateToPage = async (page: Page, pageId: PageId, globalConfig: GlobalConfig): Promise<void> => {
  const { hostsConfig, pagesConfig } = globalConfig;

  // determine host
  const { UI_AUTOMATION_HOST: hostname = "localhost" } = process.env;
  const hostPath = hostsConfig[hostname];
  const url = new URL(hostPath);

  // determine page
  const pagesConfigItem = pagesConfig[pageId];
  url.pathname = pagesConfigItem.route;

  await page.goto(url.href);
};

export const currentPathMatchesPageId = (page: Page, pageId: PageId, globalConfig: GlobalConfig): boolean => {
  const { pathname: currentPath } = new URL(page.url());
  return pathMatchesPageId(currentPath, pageId, globalConfig);
};

const pathMatchesPageId = (path: string, pageId: PageId, { pagesConfig }: GlobalConfig): boolean => {
  const pageRegexString = pagesConfig[pageId].regex;
  const pageRegex = new RegExp(pageRegexString);
  return pageRegex.test(path);
};

export const getCurrentPageId = (page: Page, globalConfig: GlobalConfig): PageId => {
  const { pagesConfig } = globalConfig;
  const pageIds = Object.keys(pagesConfig);
  const { pathname: currentPath } = new URL(page.url());
  const currentPageId = pageIds.find((pageId) => pathMatchesPageId(currentPath, pageId, globalConfig));
  if (!currentPageId) {
    throw new Error(`Failed to get page name from current route ${currentPath}, possible pages ${JSON.stringify(pagesConfig)}`);
  }
  return currentPageId;
};
