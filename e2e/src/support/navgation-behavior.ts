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
