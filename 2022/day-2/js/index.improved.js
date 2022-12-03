const fs = require("fs");

const data = fs.readFileSync("../data.txt", "utf8");
const dataArr = data.split("\n");
dataArr.pop();

/*
 * Common rules we know:
 *
 * A = ROCK (1pt)
 * B = PAPER (2pts)
 * C = SCISSORS (3pts)
 *
 * To win (6 pts):
 *
 * A beats C
 * B beats A
 * C beats B
 *
 * To draw (3 pts):
 * A draws with A
 * B draws with B
 * C draws with C
 *
 * To lose (0 pts):
 * A loses to B
 * B loses to C
 * C loses to A
 *
 * The assumption for our half of the codex is this for part one:
 * X == A
 * Y == B
 * Z == C
 *
 * */

// We know that the opponent can have A, B or C as their hand
const codeForOpponents = ["A", "B", "C"];

// We know what the score is for W/D/L:
const outcomeScore = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};

// We know our hand is always going to be one of the following
const ourHand = ["X", "Y", "Z"];

// To win there are 3 possible outcomes.
// So for example if they have A - codeForOpponents[0] we have to have Y - ourHand[1]
// If we were to put this into an array, it would be this:
// const wins = []
// wins[index of codeForOpponents[A]] = [index of ourHand[Y]] - which is the same as `wins[0] = 1`
// Of course we can just hard code this:
const wins = [1, 2, 0];

// We can do the same for losses
// So for example if they have A - codeForOpponents[0] we have to have Z - ourHand[2]
// A loses to
const losses = [2, 0, 1];

// Now we have these lets deal with each line
const result_1 = dataArr
  .map((line) => {
    // split the line into their hand and what we guess is our hand
    const [them, me] = line.split(" ");
    // So we can work out the index of their choice
    const theirChoiceIndex = codeForOpponents.indexOf(them);
    // And we can work out the index of ours
    const myChoiceIndex = ourHand.indexOf(me);

    // Now we can work out the outcome - let's do it long form
    // To win:
    // wins[theirChoiceIndex] returns a number, this number has to be the same as myChoiceIndex
    const win = wins[theirChoiceIndex] === myChoiceIndex;
    // And to work out if we have lost it's the same but using the losses array:
    const loss = losses[theirChoiceIndex] === myChoiceIndex;

    // Then we need to get our score (just based on outcome)
    // For this we know that:
    // if the result of our 'win' const is true then we have won which means we have outcomeScore.WIN (or 6 pts)
    // else if the result of our 'loss' const is true then we have lost which means we have outcomeScore.LOSE (or 0 pts)
    // else we have drawn which means we have outcomeScore.DRAW (or 3 pts)
    //
    // That is basically the code that we could write to determine the score, however we can write it as a ternary
    // and make it a one liner:
    const score = win
      ? outcomeScore.WIN
      : loss
      ? outcomeScore.LOSE
      : outcomeScore.DRAW;
    // As JavaScript objects use 0 based indexing, and we have guessed that if our hand is Y then it is Rock, which is equal to 1pt,
    // so myChoiceIndex will be 0 and therefore to get the right score we need to add 1, 0+1 = 1, and this matches for all of the possible
    // scores for our hand.
    // To get the total score for the game we have to add our hand score to the score of the outcome so we have to do:
    return myChoiceIndex + 1 + score;
  })
  // To get the total score we have to add all of the scores together
  .reduce((acc, score) => acc + score, 0);

// Using the test data file this should return 15
console.log(result_1);

// After we get the correct information about the codex we have to change our calculation
// Now we know that:
// X = lose (ourHand index 0)
// Y = draw (ourHand index 1)
// Z = win (ourHand index 2)
//
// Using the test data
// A Y = we must draw so we need A A (or 0 0)
// B X = we must lose so we need B C (or 1 2)
// C Z = we must win so we need C A (or 2 0)
//
// So...
//
// If our hand is Z (2) then we must win - which would be the index of their hand in wins
// Which means wins index 2 - C would need to be 0 - which is A - which matches with wins[theirChoiceIndex] from before
// If our hand is X (0) then we must lose - which would be the index of their hand in losses
// Which means losses index 1 - B loses to C would be 2 - which is C - which matches with losses[theirChoiceIndex] from before
// If our hand is Y (1) then we must draw - which would be the index of their hand in codeForOpponents
//
// So lets code this
const result_2 = dataArr
  .map((line) => {
    const [them, me] = line.split(" ");
    // first we need to get the index of our hand
    const myChoiceIndex = ourHand.indexOf(me);
    // and the index of their hand
    const theirChoiceIndex = codeForOpponents.indexOf(them);
    // if myChoiceIndex is 0 then we lose so the score is losses[thereChoiceIndex] + 1 + outcomeScore.LOSE
    // else if myChoiceIndex is 1 then we draw so the score is theirChoiceIndex + 1 + outcomeScore.DRAW
    // else myChoiceIndex is 2 then we win so the score is wins[thereChoiceIndex] + 1 + outcomeScore.WIN
    // so the score is:
    return myChoiceIndex === 0
      ? losses[theirChoiceIndex] + 1 + outcomeScore.LOSE
      : myChoiceIndex === 1
      ? theirChoiceIndex + 1 + outcomeScore.DRAW
      : wins[theirChoiceIndex] + 1 + outcomeScore.WIN;
  })
  // then we need to add all of the scores together
  .reduce((acc, score) => acc + score, 0);

// Using the test data file this should return 12
console.log(result_2);

// To improve it further we can lose one set of iteration
// by removing the map function and including the calculation
// of the score in the reduce function
const result_3 = dataArr.reduce((total, line) => {
  const [them, me] = line.split(" ");
  const myChoiceIndex = ourHand.indexOf(me);
  const theirChoiceIndex = codeForOpponents.indexOf(them);
  const score =
    myChoiceIndex === 0
      ? losses[theirChoiceIndex] + 1 + outcomeScore.LOSE
      : myChoiceIndex === 1
      ? theirChoiceIndex + 1 + outcomeScore.DRAW
      : wins[theirChoiceIndex] + 1 + outcomeScore.WIN;
  total += score;
  return total;
}, 0);

// using the test data file this should return 12
console.log(result_3);
