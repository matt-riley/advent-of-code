const fs = require("fs");

const data = fs
  .readFileSync("data.txt", "utf-8")
  .split("\n\n")
  .map((val) =>
    val.split("\n").reduce((t, c) => {
      t += parseInt(c);
      return t;
    }, 0)
  )
  .sort((a, b) => b - a);

// part 1
console.log(`Part 1: ${data[0]}`);

// part 2
console.log(
  `Part 2: ${data.slice(0, 3).reduce((t, c) => {
    t += c;
    return t;
  }, 0)}`
);
