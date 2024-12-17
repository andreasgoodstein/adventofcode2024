import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const data = readFile("day9/problem.txt")[0].split("");

const solve1 = (data: string[]): bigint => {
  const diskString: string[] = [];

  for (let n = 0; n < data.length; n++) {
    const sizeOnDisk = Number.parseInt(data[n], 10);
    for (let f = 0; f < sizeOnDisk; f++) {
      // write fileId or empty space
      diskString.push(n % 2 === 0 ? (n / 2).toString() : ".");
    }
  }

  let start = diskString.indexOf(".");
  let end = diskString.length - 1;
  while (diskString[end] === ".") {
    end--;
  }

  while (start < end) {
    [diskString[start], diskString[end]] = [diskString[end], diskString[start]];
    while (diskString[start] !== ".") {
      start++;
    }
    while (diskString[end] === ".") {
      end--;
    }
  }

  let checksum = BigInt(0);
  for (let n = 0; n < diskString.length; n++) {
    if (diskString[n] === ".") {
      break;
    }

    checksum += BigInt(n * Number.parseInt(diskString[n], 10));
  }

  return checksum;
};

console.log(timeFunction(() => solve1(data)));
