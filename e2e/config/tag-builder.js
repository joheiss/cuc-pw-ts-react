const globalConfig = require("./config/global-config.js");

const getEnvList = () => {
  const envList = Object.keys(globalConfig.hostsConfig);
  if (envList.length === 0) {
    throw Error(`🧨 No environments mapped in your global-config.js`);
  }
  return envList;
};

const generateCucumberRuntimeTag = (runtimeEnv, runtimeTag) => {
  const tagExpression = getEnvList()
    .filter((e) => e !== runtimeEnv)
    .map((e) => `(@${runtimeTag} and not @${e})`)
    .join(" and ");
  return tagExpression;
};

module.exports = { generateCucumberRuntimeTag };
