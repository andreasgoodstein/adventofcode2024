// https://adventofcode.com/2024/day/1

import { readFile } from "../tools/readFile.js";

const readData = () =>
  readFile("day1/problem.txt").map((line) =>
    line
      .split(" ")
      .filter(Boolean)
      .map((number) => Number.parseInt(number, 10))
  );

const solveFirst = (): number => {
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

const solveSecond = (): number => {
  const data = readData();

  const firstList: number[] = [];
  const secondMap: Record<number, number> = [];

  data.forEach((line) => {
    firstList.push(line[0]);
    secondMap[line[1]] = (secondMap[line[1]] ?? 0) + 1;
  });

  let differenceSum = 0;
  firstList.forEach((number) => {
    differenceSum += number * (secondMap[number] ?? 0);
  });

  return differenceSum;
};

console.log(solveSecond());
