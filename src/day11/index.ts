import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const data = readFile("day11/problem.txt")[0]
  .split(" ")
  .map((number) => Number.parseInt(number, 10));

const solve1 = () => {
  let stones = [...data];

  for (let n = 0; n < 25; n++) {
    const newStones: number[] = [];

    stones.forEach((stone) => {
      if (stone === 0) {
        newStones.push(1);
        return;
      }

      const stoneString = stone.toString();
      const stoneStringLength = stoneString.length;
      if (stoneStringLength % 2 === 0) {
        const leftValue = Number.parseInt(
          stoneString.slice(0, stoneStringLength / 2),
          10
        );
        const rightValue = Number.parseInt(
          stoneString.slice(stoneStringLength / 2),
          10
        );

        newStones.push(leftValue, rightValue);
        return;
      }

      newStones.push(stone * 2024);
    });

    stones = newStones;
  }

  return stones.length;
};

console.log(timeFunction(() => solve1()));
