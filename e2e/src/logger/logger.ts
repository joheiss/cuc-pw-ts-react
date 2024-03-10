import { env } from "../env/parse-env";

const DEBUG = "debug";
const LOG = "log";
const ERROR= "error";
const OFF = "off";

const LOG_LEVELS = [DEBUG, LOG, ERROR, OFF];
export type LogLevel = (typeof LOG_LEVELS)[number];

type LogFunction = (...msg: any[]) => void;

type Logger = {
  debug: LogFunction;
  log: LogFunction;
  error: LogFunction;
};

let loggerSingleton: Logger | null = null;

export const getLogger = (): Logger => {
  if (!loggerSingleton) {
    const logLevel = env("LOG_LEVEL");
    const validLogLevel = stringIsOfOptions<LogLevel>(logLevel, LOG_LEVELS);
    loggerSingleton = createLogger(validLogLevel);
  }
  return loggerSingleton!;
};

export const stringIsOfOptions = <T extends string>(logLevel: string, options: readonly string[]): T => {
  if (logLevelIsT(logLevel, options)) {
    return logLevel as T;
  }
  throw new Error(`🧨 Logger "${logLevel}" needs to be one of "${options}" 🧨`);
};

const logLevelIsT = <T extends string>(logLevel: string, options: readonly string[]): logLevel is T => {
  return options.includes(logLevel);
};

const createLogger = (logLevel: LogLevel): Logger => {
  const activeLogLevels = getLogLevels(logLevel);
  const logger = logFuncAtLevels(activeLogLevels);

  return LOG_LEVELS.reduce(
    (acc: Record<string, LogFunction>, level: LogLevel) => ({
      ...acc,
      [level]: (...msg: any[]) => logger(level, ...msg),
    }),
    {}
  ) as Logger;
};

const logFuncAtLevels =
  (logLevels: LogLevel[], logFunction: Logger = console) =>
  (logLevel: LogLevel, ...msg: any[]) => {
    if (logLevel !== OFF && logLevels.indexOf(logLevel) !== -1 && msg.length > 0) {
      logFunction[logLevel](...msg);
    }
  };

const getLogLevels = (logLevel: LogLevel): LogLevel[] => {
  const logLevelIndex = LOG_LEVELS.indexOf(logLevel);
  return LOG_LEVELS.slice(logLevelIndex);
};
