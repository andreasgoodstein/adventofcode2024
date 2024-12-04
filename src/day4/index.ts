import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const readData = (): string[][] =>
  readFile("day4/problem.txt").map((line) => line.split(""));

const solve1 = (data: string[][]): number => {
  let xmasCount = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] !== "X") {
        // not start of xmas
        continue;
      }

      if (y > 2) {
        // search up
        if (doesSpellXmas(data[y - 1][x], data[y - 2][x], data[y - 3][x])) {
          xmasCount += 1;
        }

        if (x > 2) {
          // search up left
          if (
            doesSpellXmas(
              data[y - 1][x - 1],
              data[y - 2][x - 2],
              data[y - 3][x - 3]
            )
          ) {
            xmasCount += 1;
          }
        }

        if (x < data[y].length - 3) {
          // search up right
          if (
            doesSpellXmas(
              data[y - 1][x + 1],
              data[y - 2][x + 2],
              data[y - 3][x + 3]
            )
          ) {
            xmasCount += 1;
          }
        }
      }
      if (y < data.length - 3) {
        // search down
        if (doesSpellXmas(data[y + 1][x], data[y + 2][x], data[y + 3][x])) {
          xmasCount += 1;
        }

        if (x > 2) {
          // search down left
          if (
            doesSpellXmas(
              data[y + 1][x - 1],
              data[y + 2][x - 2],
              data[y + 3][x - 3]
            )
          ) {
            xmasCount += 1;
          }
        }

        if (x < data[y].length - 3) {
          // search down right
          if (
            doesSpellXmas(
              data[y + 1][x + 1],
              data[y + 2][x + 2],
              data[y + 3][x + 3]
            )
          ) {
            xmasCount += 1;
          }
        }
      }

      if (x > 2) {
        // search left
        if (doesSpellXmas(data[y][x - 1], data[y][x - 2], data[y][x - 3])) {
          xmasCount += 1;
        }
      }

      if (x < data[y].length - 3) {
        // search right
        if (doesSpellXmas(data[y][x + 1], data[y][x + 2], data[y][x + 3])) {
          xmasCount += 1;
        }
      }
    }
  }

  return xmasCount;
};

const solve2 = (data: string[][]): number => {
  let masXCount = 0;

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] !== "A") {
        // not center of x-mas
        continue;
      }

      if (
        y === 0 ||
        x === 0 ||
        y === data.length - 1 ||
        x === data[y].length - 1
      ) {
        // on border, x-mas not possible
        continue;
      }

      if (
        containsMasX(
          data[y - 1][x - 1],
          data[y - 1][x + 1],
          data[y + 1][x - 1],
          data[y + 1][x + 1]
        )
      ) {
        masXCount += 1;
      }
    }
  }

  return masXCount;
};

const doesSpellXmas = (m: string, a: string, s: string) =>
  m === "M" && a === "A" && s === "S";

const containsMasX = (
  upLeft: string,
  upRight: string,
  downLeft: string,
  downRight: string
): boolean => {
  if (
    upLeft === "M" &&
    upRight === "M" &&
    downLeft === "S" &&
    downRight === "S"
  ) {
    return true;
  }

  if (
    upLeft === "S" &&
    upRight === "S" &&
    downLeft === "M" &&
    downRight === "M"
  ) {
    return true;
  }

  if (
    upLeft === "M" &&
    upRight === "S" &&
    downLeft === "M" &&
    downRight === "S"
  ) {
    return true;
  }

  if (
    upLeft === "S" &&
    upRight === "M" &&
    downLeft === "S" &&
    downRight === "M"
  ) {
    return true;
  }

  return false;
};

console.log(timeFunction(() => solve2(readData())));
