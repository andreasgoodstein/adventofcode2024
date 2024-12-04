import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const readData = (): string => readFile("day3/problem.txt").join("");

const multiplicationRegEx = /mul\(\d{1,3},\d{1,3}\)/g;
const numberRegEx = /\d{1,3}/g;

const solve1 = (data: string) => {
  const validMultiplications = data.match(multiplicationRegEx);

  let sum = 0;
  validMultiplications?.forEach((multiplication) => {
    const [a, b] = multiplication.match(numberRegEx) ?? ["0", "0"];
    const first = parseInt(a, 10);
    const second = parseInt(b, 10);

    sum += first * second;
  });

  return sum;
};

const solve2 = (data: string) => {
  const dontSplits = data.split("don't()");

  let sum = 0;
  sum += solve1(dontSplits.splice(0, 1)[0]);

  dontSplits.forEach((split) => {
    const doIndex = split.indexOf("do()");
    sum += solve1(split.slice(doIndex));
  });

  return sum;
};

console.log(timeFunction(() => solve2(readData())));
