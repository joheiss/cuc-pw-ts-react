import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { logger } from "../logger";

Then(/^I click (accept)?(dismiss)? on the alert dialog$/, async function (this: ScenarioWorld, accept: boolean, dismiss: boolean) {
  logger.log(`I click ${accept ? "accept" : "dismiss"} on the alert dialog`);

  const { page } = this;

  !!dismiss ? page?.on("dialog", (dialog) => dialog.dismiss()) : page?.on("dialog", (dialog) => dialog.accept());
});
