import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const data: string[][] = readFile("day6/sample.txt").map((line) =>
  line.split("")
);

const solve1 = (data: string[][]): number => {
  let direction = Direction.UP;
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

  const seenCoordinates = new Set<string>();

  while (
    guardY > -1 &&
    guardX > -1 &&
    guardY < data.length &&
    guardX < data[guardY].length
  ) {
    switch (direction) {
      case Direction.UP: {
        while (data[guardY][guardX] !== "#") {
          seenCoordinates.add(`${guardX},${guardY}`);

          guardY -= 1;
          if (guardY < 0) {
            break;
          }
        }

        if (guardY < 0) {
          break;
        }
        guardY += 1;
        direction = Direction.RIGHT;
        break;
      }

      case Direction.DOWN: {
        while (data[guardY][guardX] !== "#") {
          seenCoordinates.add(`${guardX},${guardY}`);

          guardY += 1;
          if (guardY === data.length) {
            break;
          }
        }

        if (guardY === data.length) {
          break;
        }
        guardY -= 1;
        direction = Direction.LEFT;
        break;
      }

      case Direction.LEFT: {
        while (data[guardY][guardX] !== "#") {
          seenCoordinates.add(`${guardX},${guardY}`);

          guardX -= 1;
          if (guardX < 0) {
            break;
          }
        }

        if (guardX < 0) {
          break;
        }
        guardX += 1;
        direction = Direction.UP;
        break;
      }

      case Direction.RIGHT: {
        while (data[guardY][guardX] !== "#") {
          seenCoordinates.add(`${guardX},${guardY}`);

          guardX += 1;
          if (guardX === data[guardY].length) {
            break;
          }
        }

        if (guardX === data[guardY].length) {
          break;
        }
        guardX -= 1;
        direction = Direction.DOWN;
        break;
      }

      default:
        break;
    }
  }

  return seenCoordinates.size;
};

console.log(timeFunction(() => solve1(data)));
