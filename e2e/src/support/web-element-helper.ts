import { Page } from "@playwright/test";
import { ElementKey, GlobalConfig, ElementLocator } from "../step-definitions/setup/global";
import { getCurrentPageId } from "./navgation-behavior";

/**
 * Returns the element locator for a given element key - as configured in global config
 * @param page
 * @param elementKey
 * @param globalConfig
 * @returns locator
 */
export const getElementLocator = (page: Page, elementKey: ElementKey, globalConfig: GlobalConfig): ElementLocator => {
  const { pageElementMappings } = globalConfig;
  const currentPage = getCurrentPageId(page, globalConfig);

  const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];

  if (!elementIdentifier) {
    throw new Error(`🧨 Unable to find element key "${elementKey}" in global configuration 🧨`);
  }

  return elementIdentifier;
};

/**
 * Return (zero-based) index for a given position name, like 1st -> 0, 2nd -> 1, 3rd -> 2, 4th -> 3, ...
 * @param position
 * @returns index number - zero based
 */
export const convertPosToIndex = (position: string): number => {
  return Number(position.match(/\d/g)?.join("")) - 1;
};
