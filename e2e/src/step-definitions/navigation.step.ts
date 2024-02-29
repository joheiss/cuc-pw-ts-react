import { Given } from "@cucumber/cucumber";
import { PageId } from "./setup/global";
import { navigateToPage } from "../support/navgation-behavior";

Given(/I am on the "([^"]*)" page$/, async function (pageId: PageId) {
  console.log(`I am on the ${pageId} page`);

  const {
    screen: { page },
    globalVariables,
    globalConfig,
  } = this;

  globalVariables.currentScreen = pageId;

  await navigateToPage(page, pageId, globalConfig);
});
