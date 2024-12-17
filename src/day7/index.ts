import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const data = readFile("day7/sample.txt");

const solve1 = (data: string[]): number => {
  const problemList = data.map<[string, string[]]>((line) => {
    const [sum, parts] = line.split(":");

    return [sum, parts.trim().split(" ")];
  });

  let possibleProblemSum = 0;
  problemList.forEach(([sum, parts]) => {
    console.log(sum, parts);
  });

  return possibleProblemSum;
};

const getPossibleSums = (parts: string[]) => {};

const getPossibleOperations = (partLength: number) =>
  Array(partLength).map((_) => []);

console.log(timeFunction(() => solve1(data)));
