import { readFile } from "../tools/readFile.js";

const readData = () =>
  readFile("day1/problem.txt").map((line) =>
    line
      .split(" ")
      .filter(Boolean)
      .map((number) => Number.parseInt(number, 10))
  );

export const solveFirst = (): number => {
  const data = readData();

  const firstList: number[] = [];
  const secondList: number[] = [];

  data.forEach((line) => {
    firstList.push(line[0]);
    secondList.push(line[1]);
  });

  firstList.sort();
  secondList.sort();

  let differenceSum = 0;
  for (let n = 0; n < firstList.length; n++) {
    differenceSum += Math.abs(firstList[n] - secondList[n]);
  }

  return differenceSum;
};

console.log(solveFirst());
