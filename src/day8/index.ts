import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

type Coord2D = [number, number];

const data: string[][] = readFile("day8/problem.txt").map((line) =>
  line.split("")
);

const solve1 = (data: string[][]): number => {
  const antennas: Record<string, Coord2D[]> = {};
  const antiNodes = new Set<string>();

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const frequency = data[y][x];

      if (frequency === ".") {
        continue;
      }

      antennas[frequency]?.forEach((node) => {
        const antiNodePair = getAntiNodePair([x, y], [node[0], node[1]]);

        antiNodePair.forEach((antiNode) => {
          if (isNodeValid(antiNode, data[y].length, data.length)) {
            antiNodes.add(`${antiNode[0]},${antiNode[1]}`);
          }
        });
      });

      antennas[frequency] = [...(antennas[frequency] ?? []), [x, y]];
    }
  }

  return antiNodes.size;
};

const getAntiNodePair = (first: Coord2D, second: Coord2D): Coord2D[] => {
  const diffVector: Coord2D = [first[0] - second[0], first[1] - second[1]];

  return [
    [first[0] + diffVector[0], first[1] + diffVector[1]],
    [second[0] - diffVector[0], second[1] - diffVector[1]],
  ];
};

const solve2 = (data: string[][]): number => {
  const antennas: Record<string, Coord2D[]> = {};
  const antiNodes = new Set<string>();

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const frequency = data[y][x];

      if (frequency === ".") {
        continue;
      }

      antennas[frequency]?.forEach((node) => {
        const antiNodeRange = getAntiNodeRange(
          [x, y],
          [node[0], node[1]],
          data[y].length,
          data.length
        );

        antiNodeRange.forEach((antiNode) => {
          antiNodes.add(`${antiNode[0]},${antiNode[1]}`);
        });
      });

      antennas[frequency] = [...(antennas[frequency] ?? []), [x, y]];
    }
  }

  return antiNodes.size;
};

const getAntiNodeRange = (
  first: Coord2D,
  second: Coord2D,
  maxX: number,
  maxY: number
): Coord2D[] => {
  const diffVector: Coord2D = [first[0] - second[0], first[1] - second[1]];

  const result: Coord2D[] = [first, second];

  let antiNode: Coord2D = [first[0] + diffVector[0], first[1] + diffVector[1]];
  while (isNodeValid(antiNode, maxX, maxY)) {
    result.push(antiNode);
    antiNode = [antiNode[0] + diffVector[0], antiNode[1] + diffVector[1]];
  }

  antiNode = [second[0] - diffVector[0], second[1] - diffVector[1]];
  while (isNodeValid(antiNode, maxX, maxY)) {
    result.push(antiNode);
    antiNode = [antiNode[0] - diffVector[0], antiNode[1] - diffVector[1]];
  }

  return result;
};

const isNodeValid = (coord: Coord2D, maxX: number, maxY: number) =>
  coord[0] >= 0 && coord[1] >= 0 && coord[0] < maxX && coord[1] < maxY;

console.log(timeFunction(() => solve2(data)));
