export const stringIsOfOptions = <T extends string>(stringLevel: string, options: readonly string[]): T => {
  if (stringLevelIsT(stringLevel, options)) {
    return stringLevel as T;
  }
  throw new Error(`🧨 String "${stringLevel}" needs to be one of "${options}" 🧨`);
};

const stringLevelIsT = <T extends string>(stringLevel: string, options: readonly string[]): stringLevel is T => {
  return options.includes(stringLevel);
};
