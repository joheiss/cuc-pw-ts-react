export const parseInput = (input: string): string => {
  const lookupTrigger = process.env.VAR_LOOKUP_TRIGGER ?? "$.";
  return isLookupVariable(input, lookupTrigger) ? getLookupVariable(input, lookupTrigger) : input;
};

const isLookupVariable = (input: string, lookupTrigger: string): boolean =>
  !!lookupTrigger && input.startsWith(lookupTrigger);

const getLookupVariable = (input: string, lookupTrigger: string): string => {
  const envVariable = input.substring(lookupTrigger.length);
  const lookupValue = process.env[envVariable];

  if (!lookupValue) {
    throw new Error(`Could not retrieve ${input} lookup trigger`);
  }

  return lookupValue;
};
