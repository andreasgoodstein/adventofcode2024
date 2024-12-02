// https://adventofcode.com/2024/day/2

import { readFile } from "../tools/readFile.js";

const readData = (): number[][] =>
  readFile("day2/problem.txt").map((line) =>
    line.split(" ").map((number) => Number.parseInt(number, 10))
  );

const isLevelUnsafe = (
  isIncreasing: boolean,
  first: number,
  second: number
): boolean =>
  (isIncreasing && first >= second) ||
  (!isIncreasing && first <= second) ||
  Math.abs(first - second) > 3;

const isReportUnsafe = (report: number[]): boolean => {
  const isReportIncreasing = report[0] < report[1];

  for (let n = 1; n < report.length; n++) {
    if (isLevelUnsafe(isReportIncreasing, report[n - 1], report[n])) {
      return true;
    }
  }

  return false;
};

const solveFirst = (): number => {
  const data = readData();

  let safeReportCount = 0;
  data.forEach((report) => {
    if (isReportUnsafe(report)) {
      return;
    }

    safeReportCount += 1;
  });

  return safeReportCount;
};

const solveSecond = (): number => {
  const data = readData();

  let safeReportCount = 0;
  data.forEach((report) => {
    if (!isReportUnsafe(report)) {
      safeReportCount += 1;
      return;
    }

    const alternativeReports = report.map((_, index) => {
      const clone = [...report];
      clone.splice(index, 1);

      return clone;
    });

    if (alternativeReports.some((altReport) => !isReportUnsafe(altReport))) {
      safeReportCount += 1;
    }
  });

  return safeReportCount;
};

console.log(solveSecond());
