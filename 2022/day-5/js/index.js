const fs = require("fs");
const data = fs.readFileSync("../data.txt", "utf8");

const [stacks, commands] = data.split("\n\n");

// work out the commands
const commandsArray = commands.split("\n");
commandsArray.pop();

// This returns an array of arrays
// The contained arrays are the following:
// [amount of crates, from, to]
const commandLines = commandsArray.map((command) => {
  const words = command.split(" ");
  return [parseInt(words[1]), parseInt(words[3]) - 1, parseInt(words[5]) - 1];
});

// work out the stacks
// first split the stacks into an array of lines
const stackLines = stacks.split("\n");
// get rid of the last line
stackLines.pop();

// reverse the order - this will make sense later
stackLines.reverse();

// Now we need to get the actual letters for the crates
const stacksArray = stackLines.reduce((acc, stack) => {
  // split the line into an array of crates
  const stackArray = stack
    .split(/\s\s\s\s/)
    .flatMap((line) => line.split(/\s/));
  // even if the stack is empty, there will be an entry at the moment so we can use the length of the line array to indicate a stack number
  for (let i = 0; i < stackArray.length; i++) {
    // create the regex to get the letter
    const regex = /\[(\w)\]/;
    // try to get the letter
    const matches = stackArray[i].match(regex);
    if (acc[i] === undefined) {
      acc[i] = [];
    }
    if (matches) {
      acc[i].push(matches[1]);
    }
  }
  return acc;
}, []);

// for Part 2
const notMoved = JSON.parse(JSON.stringify(stacksArray));

const moveCrate = (stacks, from, to) => stacks[to].push(stacks[from].pop());
// now use the commands to move the crates
commandLines.forEach((command) => {
  if (command[0] === 1) {
    moveCrate(stacksArray, command[1], command[2]);
  } else {
    for (let i = 0; i < command[0]; i++) {
      moveCrate(stacksArray, command[1], command[2]);
    }
  }
});

const topCrates = stacksArray.map((stack) => stack[stack.length - 1]).join("");

// Part 1
console.log(topCrates);

const moveCrate2 = (stacks, amt, from, to) => {
  return stacks[to].push(...stacks[from].splice(-amt));
};
commandLines.forEach((command) => {
  moveCrate2(notMoved, command[0], command[1], command[2]);
});

const topCrates2 = notMoved.map((stack) => stack[stack.length - 1]).join("");

// Part 2
console.log(topCrates2);
