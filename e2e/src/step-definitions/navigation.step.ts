import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PageId } from "./setup/global";
import { currentPathMatchesPageId, navigateToPage } from "../support/navgation-behavior";
import { ScenarioWorld } from "./setup/world";

Given(/I am on the "([^"]*)" page$/, async function (this: ScenarioWorld, pageId: PageId) {
  console.log(`I am on the ${pageId} page`);

  const { page, globalConfig } = this;

  await navigateToPage(page!, pageId, globalConfig);

  expect(currentPathMatchesPageId(page!, pageId, globalConfig)).toBeTruthy();
});

Then(/^I am directed to the "([^"]*)" page$/, async function (this: ScenarioWorld, pageId: PageId) {
  console.log(`I am directed to the ${pageId} page`);

  const { page, globalConfig } = this;

  expect(currentPathMatchesPageId(page!, pageId, globalConfig)).toBeTruthy();
});
