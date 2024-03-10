import { logger } from "../logger";
import { ErrorsConfig, WaitForTarget, WaitForTargetType } from "../step-definitions/setup/global";

export const showErrorMessage = (errorMsg: string): void => {
  logger.error(errorMsg);
  throw Error(errorMsg);
};

/**
 * Returns a parsed and cleaned error message
 * @param errorsConfig
 * @param error
 * @param target
 * @param type
 */
export const handleError = (
  errorsConfig: ErrorsConfig,
  error: Error,
  target?: WaitForTarget,
  type?: WaitForTargetType
): void => {
  const errorMessage = error?.message ?? "";
  const errorSummary = getErrorSummary(errorMessage);
  const targetName = target ?? "";
  const targetType = type ?? "";

  if (!errorsConfig || !errorSummary) {
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const parsedErrorMessage = parseErrorMessage(errorsConfig, errorSummary, targetName, targetType);
  logger.error(parsedErrorMessage);
  throw new Error(parsedErrorMessage);
};

/**
 * Returns the error message without the call stack
 * @param errorMessage
 * @returns
 */
const getErrorSummary = (errorMessage: string): string => {
  return errorMessage.split("\n")[0];
};

/**
 * Returns an error message which has been parsed and mapped against global config
 * @param errorsConfig
 * @param errorSummary
 * @param targetName
 * @param targetType
 * @returns
 */
const parseErrorMessage = (
  errorsConfig: ErrorsConfig,
  errorSummary: string,
  targetName: string,
  targetType: string
): string => {
  const targetErrorIndex = errorsConfig
    .map((err) => RegExp(err.originalErrMsgRegexString))
    .findIndex((errRegex) => errRegex.test(errorSummary));

  return targetErrorIndex > -1
    ? errorsConfig[targetErrorIndex].parsedErrorMessage.replace(/{}/g, targetName).replace(/<>/g, targetType)
    : errorSummary;
};
