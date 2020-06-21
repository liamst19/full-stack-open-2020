/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
