import { Page } from "playwright";
import { ElementKey, GlobalVariables, GlobalConfig, ElementLocator } from "../step-definitions/setup/global";

export const getElementLocator = (
  page: Page,
  elementKey: ElementKey,
  globalVariables: GlobalVariables,
  globalConfig: GlobalConfig
): ElementLocator => {
  const { pageElementMappings } = globalConfig;
  const currentPage = globalVariables.currentScreen;

  return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
};
