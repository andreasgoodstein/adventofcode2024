import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

enum Direction {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
}

const data: string[][] = readFile("day6/sample.txt").map((line) =>
  line.split("")
);

const findStart = (data: string[][]): [number, number] => {
  let guardX = -1;
  let guardY = -1;

  for (let y = 0; y < data.length; y++) {
    if (guardX !== -1) {
      break;
    }

    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] === "^") {
        guardX = x;
        guardY = y;
        break;
      }
    }
  }

  return [guardX, guardY];
};

const followPath = (data: string[][], start: [number, number]) => {
  let direction = Direction.UP;
  let [guardX, guardY] = start;

  let isCycle = false;
  const seenCoordinates = new Set<string>();
  const seenDirections = new Map<string, Direction>();

  while (
    guardY > -1 &&
    guardX > -1 &&
    guardY < data.length &&
    guardX < data[guardY].length &&
    !isCycle
  ) {
    switch (direction) {
      case Direction.UP: {
        while (data[guardY][guardX] !== "#") {
          const coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, direction);

          guardY -= 1;
          if (guardY < 0) {
            break;
          }
        }
        if (isCycle || guardY < 0) {
          break;
        }

        guardY += 1;
        direction = Direction.RIGHT;
        seenDirections.delete(`${guardX},${guardY}`);
        break;
      }

      case Direction.DOWN: {
        while (data[guardY][guardX] !== "#") {
          const coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, direction);

          guardY += 1;
          if (guardY === data.length) {
            break;
          }
        }
        if (isCycle || guardY === data.length) {
          break;
        }

        guardY -= 1;
        direction = Direction.LEFT;
        seenDirections.delete(`${guardX},${guardY}`);
        break;
      }

      case Direction.LEFT: {
        while (data[guardY][guardX] !== "#") {
          const coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, direction);

          guardX -= 1;
          if (guardX < 0) {
            break;
          }
        }
        if (isCycle || guardX < 0) {
          break;
        }

        guardX += 1;
        direction = Direction.UP;
        seenDirections.delete(`${guardX},${guardY}`);
        break;
      }

      case Direction.RIGHT: {
        while (data[guardY][guardX] !== "#") {
          const coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, direction);

          guardX += 1;
          if (guardX === data[guardY].length) {
            break;
          }
        }
        if (isCycle || guardX === data[guardY].length) {
          break;
        }

        guardX -= 1;
        direction = Direction.DOWN;
        seenDirections.delete(`${guardX},${guardY}`);
        break;
      }

      default:
        break;
    }
  }

  return { isCycle, seenCoordinates };
};

const solve1 = (data: string[][]) => {
  const start = findStart(data);

  return followPath(data, start);
};

const solve2 = (data: string[][]) => {
  const start = findStart(data);

  const { seenCoordinates } = followPath(data, start);

  const cycleCausingObstacles = [];

  return seenCoordinates.size;
};

console.log(timeFunction(() => solve2(data)));
