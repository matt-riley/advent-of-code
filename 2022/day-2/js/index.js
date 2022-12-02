const fs = require("fs");

const data = fs.readFileSync("../data.txt", "utf8");

const options = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
};

const individualScore = {
  X: 1,
  Y: 2,
  Z: 3,
};

const draw = (theirs, mine) => options[theirs] === options[mine];
const win = (theirs, mine) =>
  (theirs === "A" && mine === "Y") ||
  (theirs === "B" && mine === "Z") ||
  (theirs === "C" && mine === "X");

const dataArr = data.split("\n");
dataArr.pop();

const scores = dataArr.map((line) => {
  const played = line.split(" ");
  if (draw(played[0], played[1])) {
    return 3 + individualScore[played[1]];
  } else if (win(played[0], played[1])) {
    return 6 + individualScore[played[1]];
  }
  return individualScore[played[1]];
});

const total = scores.reduce((acc, score) => {
  if (typeof score === "number") {
    acc += score;
  }
  return acc;
}, 0);
console.log(`Part 1: ${total}`);

// part 2
const realIndividualScores = {
  A: 1,
  B: 2,
  C: 3,
};

const realResults = {
  X: 0,
  Y: 3,
  Z: 6,
};

const toWin = {
  A: "B",
  B: "C",
  C: "A",
};
const toLose = {
  A: "C",
  B: "A",
  C: "B",
};

const getScore = (theirs, mine) => {
  let choice;
  switch (mine) {
    case "X":
      choice = toLose[theirs];
      break;
    case "Z":
      choice = toWin[theirs];
      break;
    default:
      choice = theirs;
  }
  return realResults[mine] + realIndividualScores[choice];
};
const realScores = dataArr.map((line) => {
  const played = line.split(" ");
  return getScore(played[0], played[1]);
});

console.log(`Part 2: ${realScores.reduce((acc, score) => acc + score, 0)}`);
