/**
 * Parses the input value before processing to replace a trigger vatiable with a looked up value - if needed
 * @param input
 * @returns parsed / looked up value
 */
export const parseInput = (input: string): string => {
  const lookupTrigger = process.env.VAR_LOOKUP_TRIGGER ?? "$.";
  return isLookupVariable(input, lookupTrigger) ? getLookupVariable(input, lookupTrigger) : input;
};

/**
 * Checks if an input contains a lookup trigger
 * @param input
 * @param lookupTrigger
 * @returns true or false
 */
const isLookupVariable = (input: string, lookupTrigger: string): boolean =>
  !!lookupTrigger && input.startsWith(lookupTrigger);

/**
 * Retrieve the "real" value for a lookup trigger
 * @param input
 * @param lookupTrigger
 * @returns value looked up from an environment variable
 */
const getLookupVariable = (input: string, lookupTrigger: string): string => {
  const envVariable = input.substring(lookupTrigger.length);
  const lookupValue = process.env[envVariable];

  if (!lookupValue) {
    throw new Error(`Could not retrieve ${input} lookup trigger`);
  }

  return lookupValue;
};
