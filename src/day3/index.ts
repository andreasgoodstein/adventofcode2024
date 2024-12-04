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

console.log(timeFunction(() => solve1(readData())));
