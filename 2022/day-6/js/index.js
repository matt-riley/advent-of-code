const fs = require("fs");
const data = fs.readFileSync("../data.txt", "utf8");

const buffers = data.split("\n");
buffers.pop();

const result = buffers.reduce((acc, buff, index) => {
  buff.split("").forEach((char, idx) => {
    if (idx < 3 || acc[index] > 0) return;
    const testStr = buff.slice(idx - 3, idx + 1);
    const strSet = new Set(testStr);
    if (strSet.size === 4) acc[index] = idx + 1;
  });
  return acc;
}, []);

// Part 1
console.log(result);

const result2 = buffers.reduce((acc, buff, index) => {
  buff.split("").forEach((char, idx) => {
    if (idx < 13 || acc[index] > 0) return;
    const testStr = buff.slice(idx - 13, idx + 1);
    const strSet = new Set(testStr);
    if (strSet.size === 14) acc[index] = idx + 1;
  });
  return acc;
}, []);

console.log(result2);
