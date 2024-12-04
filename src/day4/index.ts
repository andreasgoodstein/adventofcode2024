import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const readData = (): string[][] =>
  readFile("day4/problem.txt").map((line) => line.split(""));

const solve1 = (data: string[][]): number => {
  let xmasCount = 0;
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] !== "X") {
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

const doesSpellXmas = (m: string, a: string, s: string) =>
  m === "M" && a === "A" && s === "S";

console.log(timeFunction(() => solve1(readData())));
