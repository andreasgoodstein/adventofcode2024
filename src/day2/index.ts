// https://adventofcode.com/2024/day/2

import { readFile } from "../tools/readFile.js";

const readData = (): number[][] =>
  readFile("day2/problem.txt").map((line) =>
    line.split(" ").map((number) => Number.parseInt(number, 10))
  );

const solveFirst = (): number => {
  const data = readData();

  let safeReportCount = 0;
  data.forEach((report) => {
    const isReportIncreasing = report[0] < report[1];

    for (let n = 1; n < report.length; n++) {
      if (isReportIncreasing && report[n] <= report[n - 1]) {
        return;
      }
      if (!isReportIncreasing && report[n] >= report[n - 1]) {
        return;
      }
      if (Math.abs(report[n] - report[n - 1]) > 3) {
        return;
      }
    }

    safeReportCount += 1;
  });

  return safeReportCount;
};

console.log(solveFirst());
