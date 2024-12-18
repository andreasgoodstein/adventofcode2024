import { readFile } from "../tools/readFile.js";
import { timeFunction } from "../tools/timeFunction.js";

const data = readFile("day9/problem.txt")[0];

const diskString = ((): string[] => {
  const diskString: string[] = [];

  for (let n = 0; n < data.length; n++) {
    const sizeOnDisk = Number.parseInt(data[n], 10);
    for (let f = 0; f < sizeOnDisk; f++) {
      // write fileId or empty space
      diskString.push(n % 2 === 0 ? (n / 2).toString() : ".");
    }
  }

  return diskString;
})();

const solve1 = (): bigint => {
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

  return getDiskChecksum(diskString);
};

const getDiskChecksum = (disk: string[]): bigint => {
  let checksum = BigInt(0);

  for (let n = 0; n < disk.length; n++) {
    if (disk[n] === ".") {
      continue;
    }

    checksum += BigInt(n) * BigInt(Number.parseInt(disk[n], 10));
  }

  return checksum;
};

const solve2 = (): bigint => {
  const freeSpace = diskString.filter((byte) => byte === ".").length;
  // construct free space index
  const freeSpaceFragments: [number, number][] = [];

  let cursor = diskString.indexOf(".");
  let size = 0;
  while (cursor < diskString.length) {
    while (cursor < diskString.length && diskString[cursor] !== ".") {
      cursor++;
    }

    while (cursor < diskString.length && diskString[cursor] === ".") {
      cursor++;
      size++;
    }

    // add free space fragment to size indexed hashmap
    freeSpaceFragments.push([size, cursor - size]);

    // reset
    size = 0;
  }

  // swap files
  const seenFileIDs = new Set<string>();
  cursor = diskString.length - 1;
  while (cursor > freeSpaceFragments[0][1]) {
    const fileId = diskString[cursor];
    if (fileId === "." || seenFileIDs.has(fileId)) {
      cursor--;
      continue;
    }

    seenFileIDs.add(fileId);
    const endOfFile = cursor;
    while (diskString[cursor - 1] === fileId) {
      cursor--;
    }

    const fileSize = endOfFile - cursor + 1;

    for (let n = 0; n < freeSpaceFragments.length; n++) {
      if (freeSpaceFragments[n][0] < fileSize) {
        continue;
      }

      for (let f = 0; f < fileSize; f++) {
        const freeByte = freeSpaceFragments[n][1] + f;
        const fileByte = cursor + f;

        [diskString[fileByte], diskString[freeByte]] = [
          diskString[freeByte],
          diskString[fileByte],
        ];
      }

      const newIndex = freeSpaceFragments[n][1] + fileSize;
      const newSize = freeSpaceFragments[n][0] - fileSize;

      if (newSize < 0) {
        throw Error("newSize < 0");
      }

      if (newSize === 0) {
        freeSpaceFragments.splice(n, 1);
      } else {
        freeSpaceFragments.splice(n, 1, [newSize, newIndex]);
      }

      break;
    }
  }
  // console.log(diskString.join(""));
  if (diskString.filter((byte) => byte === ".").length !== freeSpace) {
    throw Error("free space changed");
  }
  return getDiskChecksum(diskString);
};

console.log(timeFunction(() => solve2()));
