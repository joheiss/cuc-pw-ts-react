import { ensureDir, emptyDir } from "fs-extra";
import { env } from "../env/parse-env";
import { getEnv } from "../env/env";

// get test results path from env parameters
getEnv();
const path = env("TEST_RESULTS_PATH");

// make sure path exists and is empty
try {
  ensureDir(path);
  emptyDir(path);
} catch (error) {
  console.error(`Could not create ${path} folder: ` + error);
}
