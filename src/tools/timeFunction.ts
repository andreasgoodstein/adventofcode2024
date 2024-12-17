export const timeFunction = (
  action: () => bigint | number | string
): bigint | number | string => {
  console.time("runtime");

  const result = action();

  console.timeEnd("runtime");

  return result;
};
