import { Frame, Page } from "@playwright/test";
import { ElementLocator } from "../step-definitions/setup/global";

/**
 * Checks a radio button or checkbox which is located using elementIdentifier
 * @param page
 * @param elementIdentifier
 */
export const checkElement = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  await page.locator(elementIdentifier).check();
};

/**
 * Clicks a button, link, icon or any other clickable element, located via elementIdentifier
 * @param page
 * @param elementIdentifier
 */
export const clickElement = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  await page.locator(elementIdentifier).click();
};

/**
 * Clicks a button, link, icon or any other clickable element and waits for a given amount of milliseconds
 * @param page
 * @param elementIdentifier
 * @param waitMs
 */
export const clickElementAndWait = async (
  page: Page,
  elementIdentifier: ElementLocator,
  waitMs: number
): Promise<void> => {
  await page.locator(elementIdentifier).click();
  await page.waitForTimeout(waitMs);
};

/**
 * Clicks a button or any other element that triggers a new page or tag and waits until this new tab or page
 * is loaded
 * @param page
 * @param elementIdentifier
 */
export const clickElementAndWaitForLoadState = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  const pagePromise = page.context().waitForEvent("page");
  await page.locator(elementIdentifier).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();
};
/**
 * Clicks an element which can be identfied by a locator and an index
 * @param page
 * @param elementIdentifier
 * @param index
 */
export const clickElementAtIndex = async (
  page: Page,
  elementIdentifier: ElementLocator,
  index: number
): Promise<void> => {
  await page.locator(elementIdentifier).nth(index).click();
};

/**
 * Returns the value of an element attribute
 * @param page
 * @param elementIdentifier
 * @param attrName
 * @returns
 */
export const getElementAttributeValue = async (
  page: Page,
  elementIdentifier: ElementLocator,
  attrName: string
): Promise<String | null> => {
  // return page.locator(elementIdentifier).evaluate<string, HTMLInputElement>(element => element[attrName]);
  return page.locator(elementIdentifier).getAttribute(attrName);
};

/**
 * Returns te number of elements for a given selector
 * @param page
 * @param elementIdentifier
 * @returns
 */
export const getElementCount = async (page: Page, elementIdentifier: ElementLocator): Promise<number | null> => {
  const count = await page!.locator(elementIdentifier).count();
  return count;
};

/**
 * Returns the data from the rows and columns of a table in a JSON string
 * @param page
 * @param elementIdentifier
 * @returns
 */
export const getTableData = async (page: Page, elementIdentifier: ElementLocator): Promise<string> => {
  const data = await page?.locator(`${elementIdentifier} tbody tr`).evaluateAll((rows) => {
    return rows.map((row) => {
      const cells = row.querySelectorAll("th, td");
      return Array.from(cells).map((cell) => cell.textContent);
    });
  });
  return JSON.stringify(data);
};

/**
 *
 * @param page Returns the text content of an element
 * @param elementIdentifier
 * @returns
 */
export const getElementText = async (page: Page, elementIdentifier: ElementLocator): Promise<String | null> => {
  return page.locator(elementIdentifier).textContent();
};

/**
 * Returns the text content of an element at a given index
 * @param page
 * @param elementIdentifier
 * @param index
 * @returns
 */
export const getElementTextAtIndex = async (
  page: Page,
  elementIdentifier: ElementLocator,
  index: number
): Promise<String | null> => {
  return page.locator(elementIdentifier).nth(index).textContent();
};

/**
 * Returns the text content of an element on an iframe
 * @param page
 * @param iframeIdentifier
 * @param elementIdentifier
 * @returns
 */
export const getElementTextOnIframe = async (
  page: Page,
  iframeIdentifier: ElementLocator,
  elementIdentifier: ElementLocator
): Promise<String | null> => {
  return page.frameLocator(iframeIdentifier).locator(elementIdentifier).textContent();
};

/**
 * Returns the value of an element
 * @param page
 * @param elementIdentifier
 * @returns
 */
export const getElementValue = async (page: Page, elementIdentifier: ElementLocator): Promise<string | null> => {
  return page.locator(elementIdentifier).evaluate<string, HTMLInputElement>((element) => element.value);
};

/**
 * Hovers over an element (optionally, for a given amount of milliseconds)
 * @param page
 * @param elementIdentifier
 * @param waitMs
 */
export const hoverElement = async (page: Page, elementIdentifier: ElementLocator, waitMs?: number): Promise<void> => {
  await page.locator(elementIdentifier).hover();
};

/**
 * Fills an input element with a given value
 * @param page
 * @param elementIdentifier
 * @param inputValue
 */
export const inputValue = async (page: Page, elementIdentifier: ElementLocator, inputValue: string): Promise<void> => {
  await page.locator(elementIdentifier).fill(inputValue);
};

/**
 * Fills an input element on an iframe with a given value
 * @param page
 * @param iframeIdentifier
 * @param elementIdentifier
 * @param inputValue
 */
export const inputValueOnIframe = async (
  page: Page,
  iframeIdentifier: string,
  elementIdentifier: ElementLocator,
  inputValue: string
): Promise<void> => {
  await page.frameLocator(iframeIdentifier).locator(elementIdentifier).fill(inputValue);
};

/**
 * Fills an input element on a given browser tab or page with a given value
 * @param pages
 * @param tabIndex
 * @param elementIdentifier
 * @param inputValue
 */
export const inputValueOnPage = async (
  pages: Page[],
  tabIndex: number,
  elementIdentifier: ElementLocator,
  value: string
): Promise<void> => {
  const page = pages[tabIndex];
  await inputValue(page, elementIdentifier, value);
  // await page.locator(elementIdentifier).fill(inputValue);
};

/**
 * Evaluates whether an element is disabled or not
 * @param page
 * @param elementIdentifier
 * @returns true or false
 */
export const isElementDisabled = async (page: Page, elementIdentifier: ElementLocator): Promise<boolean> => {
  return page.locator(elementIdentifier).isDisabled();
};

/**
 * Scrolls an element into view - if needed
 * @param page
 * @param elementIdentifier
 */
export const scrollElementIntoView = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  await page.locator(elementIdentifier).scrollIntoViewIfNeeded();
};

/**
 * Selects a given option in a select box
 * @param page
 * @param elementIdentifier
 * @param optionValue
 */
export const selectOption = async (
  page: Page,
  elementIdentifier: ElementLocator,
  optionValue: string
): Promise<void> => {
  await page.locator(elementIdentifier).focus();
  await page.locator(elementIdentifier).selectOption(optionValue);
};

/**
 * Unchecks a check box
 * @param page
 * @param elementIdentifier
 */
export const uncheckElement = async (page: Page, elementIdentifier: ElementLocator): Promise<void> => {
  await page.locator(elementIdentifier).uncheck();
};

/**
 * Waits for a given amount of milliseconds
 * @param page
 * @param waitMs
 */
export const wait = async (page: Page, waitMs: number): Promise<void> => {
  await page.waitForTimeout(waitMs);
};
