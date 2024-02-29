export const env = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw Error(`No environment variable found for ${key}`);
  }
  return value;
};

export const envNumber = (key: string): number => {
  const value = env(key);
  return Number(value);
}