import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

type MapSet = Record<string, Set<string>>;

const readData = () => readFile("day5/problem.txt").join("\n").split("\n\n");

const solve1 = (rules: string[], pageList: string[]): number => {
  const ruleMapSet = rules.reduce<MapSet>((mapSet, rule) => {
    const [before, after] = rule.split("|");

    const set = mapSet[before] ?? new Set();
    set.add(after);
    mapSet[before] = set;

    return mapSet;
  }, {});

  let validPageSum = 0;
  pageList.forEach((list) => {
    const pages = list.split(",");

    for (let i = 0; i < pages.length - 1; i++) {
      const before = pages[i];
      const after = pages[i + 1];
      const ruleIsBroken = ruleMapSet[after]?.has(before) ?? false;
      if (ruleIsBroken) {
        return;
      }
    }

    validPageSum += Number.parseInt(pages[Math.floor(pages.length / 2)], 10);
  });

  return validPageSum;
};

const solve2 = () => {};

const [rules, pages] = readData().map((section) => section.split("\n"));

console.log(timeFunction(() => solve1(rules, pages)));
