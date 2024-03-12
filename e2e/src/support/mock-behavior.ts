import { Page } from "playwright/test";
import { GlobalConfig, MockConfigKey, MockPayloadKey, MockServerKey } from "../step-definitions/setup/global";
import { logger } from "../logger";

export const interceptResponse = async (
  page: Page,
  mockServerKey: MockServerKey,
  mockConfigKey: MockConfigKey,
  mockPayloadKey: MockPayloadKey,
  globalConfig: GlobalConfig
): Promise<void> => {
  const { hostsConfig, mocksConfig, mockPayloadMappings } = globalConfig;

  const mockServerHostUrl = hostsConfig[mockServerKey];
  const mockServerRoute = mocksConfig[mockConfigKey];
  const mockServerPayload = mockPayloadMappings[mockPayloadKey];

  if (!mockServerPayload) {
    throw new Error(`🧨 Unable to find the ${mockPayloadKey} payload json 🧨`);
  }

  logger.debug("mocked users payload: ", mockServerPayload);

  await page.route(`${mockServerHostUrl}${mockServerRoute}`, (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(mockServerPayload),
    })
  );
};
