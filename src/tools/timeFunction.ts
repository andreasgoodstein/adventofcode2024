export const timeFunction = (action: () => number) => {
  console.time("runtime");

  const result = action();

  console.timeEnd("runtime");

  return result;
};
