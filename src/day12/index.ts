import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

type Region = {
  area: number;
  perimeter: number;
  side: number;
  type: string;
};

const data = readFile("day12/sample.txt").map((line) => line.split(""));

const getId = (x: number, y: number): string => `${x},${y}`;

const getNeighbors = (x: number, y: number): [number, number][] => [
  [x - 1, y],
  [x + 1, y],
  [x, y - 1],
  [x, y + 1],
];

const containsOppositeNeighbors = (list: ReturnType<typeof getNeighbors>) =>
  list.length > 1 && list[0][1] === list[1][1];

const validNeighbors =
  (type: Region["type"]) =>
  ([x, y]: [number, number]) =>
    y > -1 &&
    x > -1 &&
    y < data.length &&
    x < data[y].length &&
    data[y][x] === type;

const getAllRegions = () => {
  const seenPlots = new Set<string>();
  const regions: Region[] = [];
  const plotsToExplore: [number, number][] = [];

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (seenPlots.has(getId(x, y))) {
        continue;
      }

      const newRegion: Region = {
        area: 1,
        perimeter: 4,
        side: 4,
        type: data[y][x],
      };

      seenPlots.add(getId(x, y));

      const neighborsWithSamePlants = getNeighbors(x, y).filter(
        validNeighbors(newRegion.type)
      );

      newRegion.perimeter -= neighborsWithSamePlants.length;
      newRegion.side -= neighborsWithSamePlants.length;

      plotsToExplore.push(...neighborsWithSamePlants);

      while (plotsToExplore.length > 0) {
        const [x1, y1] = plotsToExplore.shift()!;
        const id = getId(x1, y1);
        if (seenPlots.has(id)) {
          continue;
        }

        seenPlots.add(id);

        let moreNeighbors = getNeighbors(x1, y1).filter(
          validNeighbors(newRegion.type)
        );

        newRegion.area += 1;
        newRegion.perimeter += 4 - moreNeighbors.length;

        moreNeighbors = moreNeighbors.filter(
          (neighbor) => !seenPlots.has(getId(...neighbor))
        );

        if (moreNeighbors.length === 0) {
          newRegion.side += 3;
        }
        if (moreNeighbors.length === 1) {
          newRegion.side += 1;
        }

        plotsToExplore.push(...moreNeighbors);
      }

      regions.push(newRegion);
    }
  }

  return regions;
};

const solve1 = () => {
  const regions = getAllRegions();

  return regions.reduce(
    (sum, region) => sum + region.area * region.perimeter,
    0
  );
};

const solve2 = () => {
  const regions = getAllRegions();

  console.log(regions);

  return regions.reduce((sum, region) => sum + region.side * region.area, 0);
};

console.log(timeFunction(() => solve1()));
