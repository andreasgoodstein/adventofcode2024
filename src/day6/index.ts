import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

enum Direction {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
}

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
  const seenDirections = new Map<string, Direction[]>();

  while (
    guardY > -1 &&
    guardX > -1 &&
    guardY < data.length &&
    guardX < data[guardY].length &&
    !isCycle
  ) {
    switch (direction) {
      case Direction.UP: {
        let coordinate = "";

        while (data[guardY][guardX] !== "#") {
          coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, [
            ...(seenDirections.get(coordinate) ?? []),
            direction,
          ]);

          guardY -= 1;
          if (guardY < 0) {
            break;
          }
        }
        if (isCycle || guardY < 0) {
          break;
        }

        guardY += 1;
        seenDirections.set(
          coordinate,
          seenDirections.get(coordinate)?.filter((dir) => dir !== direction) ??
            []
        );
        direction = Direction.RIGHT;
        break;
      }

      case Direction.DOWN: {
        let coordinate = "";

        while (data[guardY][guardX] !== "#") {
          coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, [
            ...(seenDirections.get(coordinate) ?? []),
            direction,
          ]);

          guardY += 1;
          if (guardY === data.length) {
            break;
          }
        }
        if (isCycle || guardY === data.length) {
          break;
        }

        guardY -= 1;
        seenDirections.set(
          coordinate,
          seenDirections.get(coordinate)?.filter((dir) => dir !== direction) ??
            []
        );
        direction = Direction.LEFT;
        break;
      }

      case Direction.LEFT: {
        let coordinate = "";

        while (data[guardY][guardX] !== "#") {
          coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, [
            ...(seenDirections.get(coordinate) ?? []),
            direction,
          ]);

          guardX -= 1;
          if (guardX < 0) {
            break;
          }
        }
        if (isCycle || guardX < 0) {
          break;
        }

        guardX += 1;
        seenDirections.set(
          coordinate,
          seenDirections.get(coordinate)?.filter((dir) => dir !== direction) ??
            []
        );
        direction = Direction.UP;
        break;
      }

      case Direction.RIGHT: {
        let coordinate = "";

        while (data[guardY][guardX] !== "#") {
          coordinate = `${guardX},${guardY}`;
          isCycle =
            seenCoordinates.has(coordinate) &&
            (seenDirections.get(coordinate)?.includes(direction) ?? false);
          if (isCycle) {
            break;
          }

          seenCoordinates.add(coordinate);
          seenDirections.set(coordinate, [
            ...(seenDirections.get(coordinate) ?? []),
            direction,
          ]);

          guardX += 1;
          if (guardX === data[guardY].length) {
            break;
          }
        }
        if (isCycle || guardX === data[guardY].length) {
          break;
        }

        guardX -= 1;
        seenDirections.set(
          coordinate,
          seenDirections.get(coordinate)?.filter((dir) => dir !== direction) ??
            []
        );
        direction = Direction.DOWN;
        break;
      }

      default:
        throw new Error("Impossible Direction");
    }
  }

  return { isCycle, seenCoordinates };
};

const solve1 = (data: string[][]) => {
  const start = findStart(data);

  return followPath(data, start).seenCoordinates.size;
};

const solve2 = (data: string[][]) => {
  const start = findStart(data);

  const { seenCoordinates } = followPath(data, start);

  seenCoordinates.delete(`${start[0]},${start[1]}`);

  let cycleCausingObstacleCount = 0;
  seenCoordinates.forEach((coordinate) => {
    const [x, y] = coordinate
      .split(",")
      .map((number) => Number.parseInt(number, 10));

    data[y][x] = "#";

    const { isCycle } = followPath(data, start);
    if (isCycle) {
      cycleCausingObstacleCount += 1;
    }

    data[y][x] = ".";
  });

  return cycleCausingObstacleCount;
};

const data: string[][] = readFile("day6/problem.txt").map((line) =>
  line.split("")
);

console.log(timeFunction(() => solve2(data)));
