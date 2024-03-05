import playwright, { Browser, BrowserType, BrowserContextOptions, Page, BrowserContext } from "playwright";
import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import { env } from "../../env/parse-env";
import { GlobalConfig, GlobalVariables } from "./global";

type CustomWorldProperties = {
  debug: boolean;
  browser: Browser;
  context: BrowserContext;
  page: Page;
  globalConfig: GlobalConfig;
  globalVariables: GlobalVariables;
};
export class ScenarioWorld extends World<CustomWorldProperties> {
  debug: boolean;
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  globalConfig: GlobalConfig;
  globalVariables: GlobalVariables;

  constructor(options: IWorldOptions) {
    super(options);
    this.debug = false;
    this.globalConfig = options.parameters as GlobalConfig;
    this.globalVariables = {} as GlobalVariables;
  }

  async init(contextOptions?: BrowserContextOptions): Promise<any> {
    // make sure all objects are closed at the beginning of a scenario
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();

    this.browser = await this.newBrowser();
    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();

    return true;
  }

  private async newBrowser(): Promise<Browser> {
    const automationBrowsers = ["chromium", "firefox", "webkit"];
    type AutomationBrowser = (typeof automationBrowsers)[number];
    const automationBrowser = env("UI_AUTOMATION_BROWSER") as AutomationBrowser;

    const browserType: BrowserType = playwright[automationBrowser];
    const browser = await browserType.launch({
      headless: process.env.HEADLESS !== "false",
      devtools: process.env.DEVTOOLS !== "false",
      args: ["--disable-web-security", "--disable-features=IsolateOrigins, site-per-process"],
    });
    return browser;
  }
}

setWorldConstructor(ScenarioWorld);
