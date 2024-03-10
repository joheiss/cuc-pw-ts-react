export type PageId = string;
export type ElementKey = string;
export type ElementLocator = string;
export type WaitForTargetType = string;
export type WaitForTarget = PageId | ElementKey;

export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>;

export type PagesConfig = Record<PageId, Record<string, string>>;
export type HostsConfig = Record<string, string>;
export type GlobalVariables = { [key: string]: string };

export type ErrorConfig = {
  originalErrMsgRegexString: string;
  parsedErrorMessage: string;
};
export type ErrorsConfig = ErrorConfig[];

export type GlobalConfig = {
  hostsConfig: HostsConfig;
  pagesConfig: PagesConfig;
  pageElementMappings: PageElementMappings;
  errorsConfig: ErrorsConfig;
};
