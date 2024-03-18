export const filterValidQueryParams = <
   T extends Record<string, unknown>,
   K extends keyof T
>(
   params: T,
   validParams: K[]
) => {
   const filteredParams: Partial<T> = {};
   for (const key of validParams) {
      if (Object.hasOwnProperty.call(params, key) && params[key]) {
         filteredParams[key] = params[key];
      }
   }
   return filteredParams;
};
