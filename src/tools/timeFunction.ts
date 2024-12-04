export const timeFunction = (
  action: () => number | string
): number | string => {
  console.time("runtime");

  const result = action();

  console.timeEnd("runtime");

  return result;
};
