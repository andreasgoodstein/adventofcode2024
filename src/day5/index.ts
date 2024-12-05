import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

type MapSet = Record<string, Set<string>>;

const readData = () => readFile("day5/problem.txt").join("\n").split("\n\n");

const solve1 = (ruleMapSet: MapSet, pageList: string[]): number => {
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

const solve2 = (ruleMapSet: MapSet, pageList: string[]) => {
  let fixedPageSum = 0;
  pageList.forEach((list) => {
    const pages = list.split(",");

    let fixApplied = false;
    let stillNeedsFixing = false;
    do {
      stillNeedsFixing = false;
      for (let i = 0; i < pages.length - 1; i++) {
        const before = pages[i];
        const after = pages[i + 1];
        const ruleIsBroken = ruleMapSet[after]?.has(before) ?? false;
        if (ruleIsBroken) {
          [pages[i], pages[i + 1]] = [pages[i + 1], pages[i]];
          fixApplied = true;
          stillNeedsFixing = true;
        }
      }
    } while (stillNeedsFixing);

    if (fixApplied) {
      fixedPageSum += Number.parseInt(pages[Math.floor(pages.length / 2)], 10);
    }
  });

  return fixedPageSum;
};

const [rules, pages] = readData().map((section) => section.split("\n"));

const ruleMapSet = rules.reduce<MapSet>((mapSet, rule) => {
  const [before, after] = rule.split("|");

  const set = mapSet[before] ?? new Set();
  set.add(after);
  mapSet[before] = set;

  return mapSet;
}, {});

console.log(timeFunction(() => solve2(ruleMapSet, pages)));
