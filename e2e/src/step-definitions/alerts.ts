import { Then } from "@cucumber/cucumber";
import { ScenarioWorld } from "./setup/world";
import { logger } from "../logger";

Then(
  /^I click (accept)?(dismiss)? on the alert dialog$/,
  async function (this: ScenarioWorld, accept: string, dismiss: string) {
    logger.log(`I click ${accept ? "accept" : "dismiss"} on the alert dialog`);

    const { page } = this;

    if (dismiss) {
      logger.debug("Alert dismissed: ", dismiss, accept);
    } else {
      logger.debug("Alert accepted: ", accept, dismiss);
    }

    dismiss != null
      ? page?.on("dialog", (dialog) => dialog.dismiss())
      : page?.on("dialog", (dialog) => dialog.accept());
  }
);
