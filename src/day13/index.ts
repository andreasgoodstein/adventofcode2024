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
  const d = aX * bY - aY * bX;
  const dX = prizeX * bY - prizeY * bX;
  const dY = prizeY * aX - prizeX * aY;

  const aCount = dX / d;
  const bCount = dY / d;

  if (aCount % 1 !== 0) {
    return [0, 0];
  }

  return [aCount, bCount];
};

const OFFSET = 10_000_000_000_000;

const solve2 = () => {
  let tokens = 0;

  const solutions = problems.map((problem) => {
    return solveProblem({
      ...problem,
      prizeX: problem.prizeX + OFFSET,
      prizeY: problem.prizeY + OFFSET,
    });
  });

  solutions.forEach(([aCount, bCount]) => {
    tokens += aCount * 3 + bCount;
  });

  return tokens;
};

console.log(timeFunction(() => solve2()));
