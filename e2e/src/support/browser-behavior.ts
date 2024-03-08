import { ViewportSize, devices } from "playwright/test";
import { envNumber } from "../env/parse-env";

export const getViewport = (): ViewportSize => {
  const emulation = process.env.EMULATION || "browser";

  if (emulation === "browser") {
    return { width: envNumber("BROWSER_WIDTH"), height: envNumber("BROWSER_HEIGHT") };
  }

  const device = devices[emulation];
  return { width: device.viewport.width, height: device.viewport.height };
};
