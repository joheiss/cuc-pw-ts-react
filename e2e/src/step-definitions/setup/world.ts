import playwright, { Browser, BrowserType, BrowserContextOptions, Page, BrowserContext } from "playwright";
import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";
import { env } from "../../env/parse-env";
import { GlobalConfig, GlobalVariables } from "./global";

export type Screen = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

export class ScenarioWorld extends World {
  screen!: Screen;
  globalConfig: GlobalConfig;
  globalVariables: GlobalVariables;

  constructor(options: IWorldOptions) {
    super(options);
    this.globalConfig = options.parameters as GlobalConfig;
    this.globalVariables = { currentScreen: "" };
  }

  async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
    // make sure all objects are closed at the beginning of a scenario
    await this.screen?.page.close();
    await this.screen?.context.close();
    await this.screen?.browser.close();

    const browser = await this.newBrowser();
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    this.screen = { browser, context, page };
    return this.screen;
  }

  private async newBrowser(): Promise<Browser> {
    const automationBrowsers = ["chromium", "firefox", "webkit"];
    type AutomationBrowser = (typeof automationBrowsers)[number];
    const automationBrowser = env("UI_AUTOMATION_BROWSER") as AutomationBrowser;

    const browserType: BrowserType = playwright[automationBrowser];
    const browser = await browserType.launch({
      headless: process.env.HEADLESS !== "false",
      args: ["--disable-web-security", "--disable-features=IsolateOrigins, site-per-process"],
    });
    return browser;
  }
}

setWorldConstructor(ScenarioWorld);
