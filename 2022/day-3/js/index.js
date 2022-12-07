const fs = require("fs");
const data = fs.readFileSync("../data.txt", "utf8");

const sacks = data.split("\n");
sacks.pop();
const compartments = sacks.map((sack) => {
  const half = Math.ceil(sack.length / 2);
  return [sack.slice(0, half), sack.slice(half)];
});

const findDupe = (a, b) => {
  return a.reduce((acc, item) => {
    if (b.includes(item)) {
      acc = item;
    }
    return acc;
  }, "");
};

const isUpperCase = (char) => {
  return char === char.toUpperCase();
};

const getPriority = (item) => {
  if (isUpperCase(item)) {
    return item.toLowerCase().charCodeAt(0) - 97 + 27;
  }
  return item.charCodeAt(0) - 97 + 1;
};

const total = compartments
  .map((sack) => {
    return findDupe([...sack[0]], sack[1]);
  })
  .reduce((acc, dupe) => {
    acc += getPriority(dupe);
    return acc;
  }, 0);

// part 1
console.log(total);

// elf needs three sacks
const elfSacks = sacks.reduce((acc, sack, idx) => {
  const chunkIdx = Math.floor(idx / 3);
  if (!acc[chunkIdx]) {
    acc[chunkIdx] = [];
  }
  acc[chunkIdx].push(sack);
  return acc;
}, []);

const findDupe2 = (a, b, c) => {
  return a.reduce((acc, item) => {
    if (b.includes(item) && c.includes(item)) {
      acc = item;
    }
    return acc;
  }, "");
};
const elfTotal = elfSacks
  .map((sack) => {
    return findDupe2([...sack[0]], sack[1], sack[2]);
  })
  .reduce((acc, dupe) => {
    acc += getPriority(dupe);
    return acc;
  }, 0);

console.log(elfTotal);
