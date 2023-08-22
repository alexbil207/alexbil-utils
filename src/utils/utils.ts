export const flatten = (arr: unknown[]): unknown[] => {
  return arr.reduce((accumulator: unknown[], currentValue: unknown) => {
    return accumulator.concat(
      Array.isArray(currentValue) ? flatten(currentValue) : currentValue
    );
  }, []);
};

const _compose =
  (f: any, g: any) =>
  (...args: any[]) =>
    f(g(...args));
export const compose = (...fns: any) => fns.reduce(_compose);

const PromiseAll = async (promises: Promise<string>[]): Promise<string[]> => {
  const arr: string[] = [];
  promises.map(async (promise) => {
    const res = await promise;
    arr.push(res);
  });
  return arr;
};

export const utilFunctions = {
  flatten,
  compose,
  PromiseAll,
};
