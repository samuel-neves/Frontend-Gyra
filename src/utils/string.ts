export const Capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const Trim = (str: string): string => {
  return str.trim();
};
