import { Frame, Page } from "@playwright/test";
import { ElementLocator } from "../step-definitions/setup/global";

export const checkElement = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  await page.locator(elementIdentifier).check();
};

export const clickElement = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  await page.locator(elementIdentifier).click();
};

export const clickElementAndWait = async (page: Page, elementIdentifier: ElementLocator, waitMs: number): Promise<void> => {
  await page.locator(elementIdentifier).click();
  await page.waitForTimeout(waitMs);
};

export const clickElementAtIndex = async (page: Page, elementIdentifier: ElementLocator, index: number): Promise<void> => {
  await page.locator(elementIdentifier).nth(index).click();
};

export const getIframe = async (page: Page, iframeIdentifier: ElementLocator): Promise<Frame | undefined | null> => {
  await page.waitForSelector(iframeIdentifier);
  const handle = await page.$(iframeIdentifier);
  const iframe = await handle?.contentFrame();
  return iframe;
};

export const getAttributeValue = async (page: Page, elementIdentifier: ElementLocator, attrName: string): Promise<String | null> => {
  return page.locator(elementIdentifier).getAttribute(attrName);
};

export const getValue = async (page: Page, elementIdentifier: ElementLocator): Promise<String | null> => {
  return getAttributeValue(page, elementIdentifier, "value");
};

export const hoverElement = async (page: Page, elementIdentifier: ElementLocator, waitMs?: number): Promise<void> => {
  await page.locator(elementIdentifier).hover();
};

export const inputValue = async (page: Page, elementIdentifier: ElementLocator, inputValue: string): Promise<void> => {
  // await page.locator(elementIdentifier).focus();
  await page.locator(elementIdentifier).fill(inputValue);
};

export const inputValueOnIframe = async (iframe: Frame, elementIdentifier: ElementLocator, inputValue: string): Promise<void> => {
  // await iframe.locator(elementIdentifier).focus();
  await iframe.locator(elementIdentifier).fill(inputValue);
};

export const inputValueOnPage = async (
  pages: Page[],
  tabIndex: number,
  elementIdentifier: ElementLocator,
  inputValue: string
): Promise<void> => {
  const page = pages[tabIndex];
  // await page.locator(elementIdentifier).focus();
  await page.locator(elementIdentifier).fill(inputValue);
};

export const isDisabled = async (page: Page, elementIdentifier: ElementLocator): Promise<boolean> => {
  return page.locator(elementIdentifier).isDisabled();
};

export const selectOption = async (page: Page, elementIdentifier: ElementLocator, optionValue: string): Promise<void> => {
  await page.locator(elementIdentifier).focus();
  await page.locator(elementIdentifier).selectOption(optionValue);
};

export const uncheckElement = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  await page.locator(elementIdentifier).uncheck();
};

export const wait = async (page: Page, waitMs: number): Promise<void> => {
  await page.waitForTimeout(waitMs);
};
