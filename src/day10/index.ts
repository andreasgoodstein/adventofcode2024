import { Graph, GraphNode } from "../tools/graph.js";
import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const data = readFile("day10/problem.txt").map((line) =>
  line.split("").map((number) => Number.parseInt(number, 10))
);

const solve1 = (): number => {
  // build graph
  const hill = new Graph();

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      const height = data[y][x];

      hill.addNode([x, y, height]);

      if (height === 9) {
        continue;
      }

      // look left
      if (x > 0) {
        const inclineLeft = data[y][x - 1] - height;
        if (inclineLeft === 1) {
          hill.addEdge([x, y], [x - 1, y]);
        }
      }

      // look right
      if (x < data[y].length - 1) {
        const inclineRight = data[y][x + 1] - height;
        if (inclineRight === 1) {
          hill.addEdge([x, y], [x + 1, y]);
        }
      }

      // look up
      if (y > 0) {
        const inclineUp = data[y - 1][x] - height;
        if (inclineUp === 1) {
          hill.addEdge([x, y], [x, y - 1]);
        }
      }

      // look down
      if (y < data.length - 1) {
        const inclineDown = data[y + 1][x] - height;
        if (inclineDown === 1) {
          hill.addEdge([x, y], [x, y + 1]);
        }
      }
    }
  }

  let trailScoreSum = 0;
  hill.getAllNodes().forEach((trailHead) => {
    if (trailHead.value !== 0) {
      return;
    }

    const seenTrails = new Set<string>();

    let trailScore = 0;
    const edgesToWalk: GraphNode[] = [];
    trailHead.edges.forEach((edge) => {
      edgesToWalk.push(edge);
    });

    while (edgesToWalk.length > 0) {
      const edge = edgesToWalk.pop()!;
      const { edges, value } = hill.getNode(edge) ?? {};

      if (value === 9) {
        const edgeId = `${edge[0]},${edge[1]}`;
        if (seenTrails.has(edgeId)) {
          continue;
        }
        trailScore++;
        seenTrails.add(edgeId);
      } else {
        edges?.forEach((newEdge) => {
          edgesToWalk.push(newEdge);
        });
      }
    }

    trailScoreSum += trailScore;
  });

  return trailScoreSum;
};

const solve2 = () => {};

console.log(timeFunction(() => solve1()));
