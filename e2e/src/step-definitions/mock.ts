import { When } from "@cucumber/cucumber";
import { logger } from "../logger";
import { ScenarioWorld } from "./setup/world";
import { MockServerKey, MockConfigKey, MockPayloadKey } from "./setup/global";
import { interceptResponse } from "../support/mock-behavior";

When(
  /^the "([^"]*)" endpoint for "([^"]*)" is mocked with "([^"]*)"$/,
  async function (
    this: ScenarioWorld,
    mockServerKey: MockServerKey,
    mockConfigKey: MockConfigKey,
    mockPayloadKey: MockPayloadKey
  ) {
    logger.log(`the ${mockServerKey} endpoint for ${mockConfigKey} is mocked with ${mockPayloadKey}`);

    const { page, globalConfig } = this;

    await interceptResponse(page!, mockServerKey, mockConfigKey, mockPayloadKey, globalConfig);
  }
);
