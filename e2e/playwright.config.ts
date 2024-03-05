import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    launchOptions: {
      devtools: true,
    },
    testIdAttribute: "data-id",
  },
});
