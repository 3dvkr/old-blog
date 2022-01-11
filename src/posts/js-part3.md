---
title: "JavaScript Part 3: Playing Rock-Paper-Scissors-Lizard-Spock"
date: 2021-03-10
tags: ["javascript"]
featuredTitle: "JS Part 3: Rock-Paper-Scissors-Lizard-Spock"
excerpt: "This is an example of writing JavaScript code, using syntax covered in Parts 1 and 2."
---
Conditional logic is one of the most universal concepts in programming. Conditionals let us gate off sections of code, and these sections only run if the condition is met. For simple conditions, the well-worn if-else statement works. 

But what happens when we want multiple conditions to be true? We can either have multiple nested if-statements, or we can stitch the conditions with the AND operator (`&&`) or the OR operator (`||`). Both options are difficult to write and difficult to read—it's probably just as difficult to maintain. This tutorial will explore an alternative to the well-known if-else structure: we're going to use an object's key-value pairs.

## ...by playing Rock-Paper-Scissors-Lizard-Spock?

We'll start with setting up the simpler Rock-Paper-Scissors, and we'll put it together the long way. Two players choose between rock, paper, and scissors. Here are the win-conditions:

- rock beats scissors 
- scissors beats paper
- paper beats rock

## Rock-Paper-Scissors using `if` / `else if` / `else`

In our game, the player will be competing with a bot. We have two tasks to perform: choosing a move for the bot, and determining the winner. We will need to write two functions. To choose a move, we'll have `Math.random` return a number and then use conditional statements to return a move based on that number.
```javascript
function rockPaperScissors() {
  let randomNum = Math.random();
  if (num < .3333) {return 'rock'}
  else if (num < .6666) {return 'paper'}
  else {return 'scissors'}
}
```
The winner will be chosen when we actually play the game. We'll do this with our second function. The player will start a new game by calling this function and passing in one of the options as a string (e.g. `rpsPlay('rock')`). 

We'll call the `rockPaperScissors` function to choose a move for the bot, and display the bot's 'choice' to the player in the console. There are three outcomes when we compare the player's choice to the bot's choice: they chose the same move (a tie), the player won, or the player lost (see win conditions in the previous section). Here's what that looks like:

```javascript
function playRPS(playChoice) {
  let botChoice = rockPaperScissors();
  console.log("Bot's choice is : " + botChoice);
  if (botChoice == playChoice) {
    return "TIE";
  } else if (
    (botChoice == "rock" && playChoice == "paper") ||
    (botChoice == "paper" && playChoice == "scissors") ||
    (botChoice == "scissors" && playChoice == "rock")
  ) {
    return "WIN";
  } else {
    return "LOSE";
  }
}
```
The first condition (`botChoice == playChoice`) compares two strings—the two moves—and this is enough to decide that the game results in a tie. The else-statement doesn't have a condition, because it's the code that runs if none of the previous conditions are true. Now we turn to the win-conditions in the `else if`-statement. There are three moves that our player can choose from, and each option has only one corresponding move that it can beat. This leaves us with 3 * 1 conditions, and we stitch them together with the two logical operators.

To help with readability, this `else if` condition goes on for three lines, with extra brackets, even though the AND operator operates before the OR operator. 

## Should we try this strategy for Rock-Paper-Scissors-Lizard-Spock?

Here are the new win-conditions:
- rock beats scissors or lizard
- paper beats rock or spock
- scissors beats rock or lizard
- lizard beats paper or spock
- spock beats scissors or rock

Now, there are five moves that our player can choose from, and each option has two corresponding move that it can beat. We can write 5 * 2—that's *ten*—lines in that `else if` condition, or we could use objects to reduce all that code to one line.

## Rewriting `rpsPlay` with objects

To rewrite our `rpsPlay` function, we'll introduce an object before the conditional expressions with three key-value pairs. We'll use the player's choice as the key names, and the corresponding values will be the bot's choice that will lead to the player winning the game. 

This is the object with the list of win-conditions:

```javascript
let winObj = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};
```
To 'search' for the pair of moves where the player wins, we can 'search' what the bot needs to play by putting the player's move in square brackets, e.g. `winObj['rock']`. This evaluates to `'scissors'`. We can now use the player's choice to look up the required opposing move for the player to win, and compare it to what the bot actually chose. 

Here is the function with the object added, and the `else if` condition modified:

```javascript
function playRPS(choice) {
  let botChoice = rockPaperScissors();

  console.log("Bot's choice is : " + botChoice);

  let winObj = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (botChoice == choice) {
    return "TIE";
  } else if (winObj[choice] == botChoice) {
    return "WIN";
  } else {
    return "LOSE";
  }
}
```

## Applying the new strategy to Rock-Paper-Scissors-Lizard-Spock

For Rock-Paper-Scissors-Lizard-Spock, we'll write out the two functions again. Our first function, which chooses the bot's move, needs the two new options added to it:

```javascript
let rpsls = () => {
    let num = Math.random();
    if (num < .2) {return 'rock'}
    else if (num < .4) {return 'paper'}
    else if (num < .6) {return 'scissors'}
    else if (num < .8) {return 'lizard'}
    else {return 'spock'}
}
```

For the second function, copy the code from the end of the previous section and rename the function as `playRPSLS`. We'll replace the old `rockPaperScissors` function in the first line with our new function name, and write a comment in place of the lines we need to change:

```javascript
function playRPSLS(choice) {
  let botChoice = rpsls();

  console.log("Bot's choice is : " + botChoice);

  // declare and define winObj

  if (botChoice == choice) {
    return "TIE";
  } else if (
      // new condition
  ) {
    return "WIN";
  } else {
    return "LOSE";
  }
}
```

The `winObj` we defined in `playRPS` had string-types as its values, because we only had to check one possible value. In `playRPSLS`, we will need to check for two options. This means we'll change each value in `winObj` to be an array with two strings. Here is the new `winObj`:

```javascript
let winObj = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['rock', 'lizard'],
  lizard: ['paper', 'spock'],
  spock: ['scissors', 'rock']
}
```

If the bot's choice matches *either* option, that means our player wins. We find the relevant array as we did in the previous section: `winObj[choice]`. We can check if the bot's choice is one of the strings in the array using the `.includes` method. This is the final `playRPSLS` function:

```javascript
let playRPSLS = (choice) => {
  let botChoice = rpsls();

  let winObj = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["rock", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["scissors", "rock"],
  };

  if (choice == botChoice) {
    return "TIE";
  } else if (winObj[choice].includes(botChoice)) {
    return "WIN";
  } else {
    return "LOSE";
  }
};
```

## Playing a game of Rock-Paper-Scissors-Lizard-Spock

To play either game, we'll call the second function (`playRPS` or `playRPSLS`). In order to display the value it returns, we'll write the function call inside `console.log`. After the first and second function are defined in your console or written in your .js file, run `console.log(playRPSLS('rock'));`. You can replace `'rock'` with another choice. You can also have two bots play against each other—that is, having two random choices face off—by calling the first function inside the second function, and printing it: `console.log(playRPSLS(rpsls()));`. One way to extend your skills beyond this tutorial is to handle error-checking, as any typos result in an error.