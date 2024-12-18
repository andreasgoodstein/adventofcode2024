import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const data = readFile("day11/problem.txt")[0].split(" ");

const solve1 = (maxBlinks = 25) => {
  let stones = data.reduce<Record<string, number>>(
    (map, number) => ({ ...map, [number]: (map[number] ?? 0) + 1 }),
    {}
  );

  for (let n = 0; n < maxBlinks; n++) {
    const newStones: Record<string, number> = {};

    Object.entries(stones).forEach(([value, count]) => {
      if (value === "0") {
        newStones["1"] = (newStones["1"] ?? 0) + count;
        return;
      }

      const valueLength = value.length;
      if (valueLength % 2 === 0) {
        const leftValue = Number.parseInt(
          value.slice(0, valueLength / 2),
          10
        ).toString();
        const rightValue = Number.parseInt(
          value.slice(valueLength / 2),
          10
        ).toString();

        newStones[leftValue] = (newStones[leftValue] ?? 0) + count;
        newStones[rightValue] = (newStones[rightValue] ?? 0) + count;
        return;
      }

      const newValue = Number.parseInt(value, 10) * 2024;
      newStones[newValue] = (newStones[newValue] ?? 0) + count;
    });

    stones = newStones;
  }

  const totalStones = Object.values(stones).reduce(
    (sum, count) => sum + BigInt(count),
    0n
  );

  return totalStones;
};

const solve2 = () => solve1(75);

console.log(timeFunction(() => solve2()));
