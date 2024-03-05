import { Page } from "@playwright/test";
import { ElementKey, GlobalConfig, ElementLocator } from "../step-definitions/setup/global";
import { getCurrentPageId } from "./navgation-behavior";

export const getElementLocator = (page: Page, elementKey: ElementKey, globalConfig: GlobalConfig): ElementLocator => {
  const { pageElementMappings } = globalConfig;
  const currentPage = getCurrentPageId(page, globalConfig);

  return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
};

export const convertPosToIndex = (position: string): number => {
  return Number(position.match(/\d/g)?.join("")) - 1;
};
