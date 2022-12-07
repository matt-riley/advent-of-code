const fs = require("fs");
const data = fs.readFileSync("../data.txt", "utf8");
const assignments = data.split("\n");

assignments.pop();

const assignmentsToInt = assignments.map((line) =>
  line
    .split(",")
    .map((nums) => nums.split("-").map((numstr) => parseInt(numstr)))
);

// 2-4 = .XXX.....
// 6-8 = .....XXX.
//
// 2-3 = .XX......
// 4-5 = ...XX....
//
// Fully consumes
// 6-6 = .....X...
// 4-6 = ...XXX...

const findOverlap = (a, b) => {
  return (a[0] >= b[0] && a[1] <= b[1]) || (a[0] <= b[0] && a[1] >= b[1]);
};
const total = assignmentsToInt
  .map((assignment) => {
    const [a, b] = assignment;
    return findOverlap(a, b);
  })
  .reduce((acc, bool) => {
    if (bool) {
      acc++;
    }
    return acc;
  }, 0);

// Part 1
console.log(total);

const toRange = (a, b) => {
  return [...Array(b - a + 1).keys()].map((num) => num + a);
};

const total2 = assignmentsToInt
  .map((assignment) => {
    const [a, b] = assignment;
    const first = toRange(a[0], a[1]);
    const second = toRange(b[0], b[1]);
    return first.filter((a) => second.includes(a)).length > 0;
  })
  .reduce((acc, bool) => {
    if (bool) {
      acc++;
    }
    return acc;
  }, 0);

// Part 2
console.log(total2);
