import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

type Problem = {
  aX: number;
  aY: number;
  bX: number;
  bY: number;
  prizeX: number;
  prizeY: number;
};

const numberRegex = /\d+/g;

const data = readFile("day13/problem.txt").join("\n");

const parseNumbersFromLine = (line: string): [number, number] => {
  const matches = line.matchAll(numberRegex);

  return [
    parseInt(matches.next()!.value![0], 10),
    parseInt(matches.next()!.value![0], 10),
  ];
};

const problems: Problem[] = data.split("\n\n").map((problem) => {
  const lines = problem.split("\n");

  const [aX, aY] = parseNumbersFromLine(lines[0]);
  const [bX, bY] = parseNumbersFromLine(lines[1]);
  const [prizeX, prizeY] = parseNumbersFromLine(lines[2]);

  return { aX, aY, bX, bY, prizeX, prizeY };
});

const solve1 = () => {
  let tokens = 0;

  const solutions = problems.map(solveProblem);

  solutions.forEach(([aCount, bCount]) => {
    tokens += aCount * 3 + bCount * 1;
  });

  return tokens;
};

const solveProblem = ({
  aX,
  aY,
  bX,
  bY,
  prizeX,
  prizeY,
}: Problem): [number, number] => {
  let aCount = 0;
  let bCount = 0;

  while (prizeX > 0 && prizeY > 0) {
    if (prizeX % bX === 0 && prizeY % bY === 0 && prizeX / bX === prizeY / bY) {
      bCount = prizeX / bX;
      return [aCount, bCount];
    }

    prizeX -= aX;
    prizeY -= aY;

    aCount++;
  }

  return [0, 0];
};

console.log(timeFunction(() => solve1()));
