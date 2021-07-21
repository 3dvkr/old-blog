---
title: "JavaScript Part 2: how do we juggle information and why would we want to?" 
date: 2021-02-16
tags: ["javascript"]
excerpt: "This is a syntax-focused sprint that delves into functions, expanding on the code from Part 1."
---

## Who is this for?

This post is for anyone who read [Part 1](/posts/js_part1), or anyone new to JavaScript. The style is more exploratory than step-by-step. All the pointers and tips from Part 1 apply here. 

Just like in Part 1, this post assumes no previous computer programming background. It's a sprint. Google fast, Google often.

## 'Juggling information?'

We'll take some 'starter' pieces of information, or inputs, and carry out a series of steps or instructions. Those instructions might, for example, update the information, reset values, create new information, among other things. 

## Why functions?

If we spell out the steps to juggle information each time we need those steps, and we changed our minds later about what those steps are, we have to hunt down every time we wrote out those steps to make those changes. That'd be frustrating.

A function is a way for us to write down the information-juggling steps *once*, before we even know exactly what information we'll be juggling. 

If we're going to pull this off, we'll need: 
1. a way to point to those steps from anywhere in our code
2. a way to write those information-juggling steps without knowing the specifics of that information
3. a way to feed in our information into these instructions once we know the specifics

## Using functions that other people wrote

### e.g. #1: `console.log`

If you run JavaScript code in a browser or Node.js, you have access to the `console` object. The browser and Node.js environments have a console, and provide us with a pre-defined `console` object. It comes with properties and methods related to our console. One of these methods is `console.log`, and its job is to write out strings in the console. If you haven't tried this yet, enter this code snippet into your console: `console.log("Hello World!")`.

Let's see how `console.log` holds up against our requirements from earlier:

1. We point to the instructions--write out a string in the console--by first pointing to the `console` object, and then pointing to the method inside the object, because that's where the instructions are stored.

2. Other people wrote the instructions for us. 

3. After pointing to the method by writing `console.log`, we feed our input `"Hello world!"` string in between two parentheses `()`. 

### e.g. #2: `Math.random`

There's another object that ships with JavaScript, called `Math`. It gives you access to methods related to doing math, like getting a random number. To try this in your console, type `Math.random()` and hit Enter. So how does this meet our requirements:

1. "Get a random number from 0 to 1 and return it" are the instructions for the `Math.random` function. We point to those instructions by pointing to the `Math` object, and then pointing to the `random` method.

2. Other people wrote the instructions for us.

3. We...don't need inputs?

## So what are the parentheses actually doing?
We've used the parentheses to house the inputs when they're needed, but that isn't the main job of the parentheses. When we use parentheses after the function or method's name, we're *calling* the function. In other words, we're asking it to run through its instructions. This means even if our function doesn't need inputs, we still need to include parentheses after the function's name in order for it to run.

## There's another way these two functions are different.
Both functions printed something out in the console, but lets look more closely at the outputs. `console.log` prints out string, as per its instructions, and it also prints out a *return value* of `undefined`. `Math.random` just prints out the return value, a random number. The reason `console.log` prints a string is because that's what its instructions tell it to do. It will also need to print the return value--the `console.log` function does not return anything, so the default of `undefined` gets printed. `Math.random` does not have any instructions to print anything, but it *does* have instructions to return a random number. A function call boils down to its return value, which can be assigned to a variable.

We have no idea what these functions' instructions look like, and we don't really need to know. We can search for or look up what we need to feed into the function--if anything--and what we can expect the function to return--if anything.

## Functions that we can write ourselves

This is a function that multiplies a number of our choosing by two. It's entirely unnecessary, since we can just write `* 2` after our number, but we'll use the function to focus on syntax.  

```javascript
function timesTwo(inputNumber) {
  return inputNumber * 2;
}
```

We need the keyword `function` to tell JavaScript that we're writing/defining/establishing, or *declaring*, a function. We write out what its instructions are in the *function body*. We section off the function body from the rest of the code by writing it in between the curly braces, `{}`. 

Going back to our three requirements:
1. Point to the instructions by naming them (e.g. '`timesTwo`'). The name goes immediately before the `()`.
2. We feed in dummy variables, called *parameters*. They stand in for the actual inputs we'll use when we call the function, because we don't know what the actual inputs are right now. We're deciding to have one parameter in the code snippet above, called `inputNumber`.
3. We feed in the parameter to the instructions by writing it in between `()`.

To try this out, first define the `timesTwo` function in the console using the code above. The console is capable of handling multi-line code snippets. Then, try calling the function with an input number you can choose. Here's one example with `4` as the argument:
```javascript
timesTwo(4); // should return 8
```

## Parameters vs. Arguments

They both represent the information being fed into a function, so it's tempting to use them interchangeably. Here's the difference:

Use the term 'parameter' when you're declaring a function--it's a variable that is standing in for actual inputs. Use the term 'argument' when you're calling the function--you can write the information directly into the function (as we did above), or you can write the name of a variable which has that information assigned to it. 

In the function declaration for `timesTwo`, the parameter was `inputNumber`. In the function call, the `argument` was 4. If you're passing in a variable, name it something different than the parameters from the function declaration. This is a good habit to start building while the code is still only a handful of lines. Here's the same function call with a variable as an argument:

```javascript
let testNumber = 4;
timesTwo(testNumber); 
```

## Function Expressions

They're another way to write functions. This might feel more pointless and unnecessary than writing a function to multiply by two, and as a beginner, that's a fair response. There are situations where they come in handy, and it's tough to expand on those situations with the information from Part 1 and Part 2. 

We declare a *variable*, and assign a function to that variable, like we would assign a string or object. We can leave blank the area where we'd normally write the function's name, because the variable's name is how we'll refer to the function.

```javascript
const timesTwo = function (inputNumber) {
                    return inputNumber * 2;
                  }
```

The space between `function` and the `()` is optional. 

## Arrow Functions

This is yet another way to write functions. We'll start with the syntax from the function expressions section. Remove the word `function` entirely. We will instead tell JavaScript that this is a function by adding a `=>` arrow in between the `(...)` and `{...}`.

e.g. 
```javascript
const timesTwo = (inputNumber) => {return inputNumber * 2}
```

The aim of this syntax is to be less bulky, so it gives us two more options:
- leave out the `{}` brackets *and* `return`--do both or do neither--when the function only has one line
- leave out the `()` brackets when the function needs one parameter--they're required for multiple parameters and zero parameters

The function from above becomes:
```javascript
const timesTwo = inputNumber => inputNumber * 2;
```

## How much juggling should one function do?
One function should accomplish one task. In other words, you should be able to tell someone what a function does in one short sentence. 

e.g. 
- "Prints a string to the console." 
- "Returns a random number." 
- "Multiplies a number by two." 

The whole strategy with functions is to make code more bite-sized, so that it's easier to maintain, understand, and debug. If one function handles multiple complex juggling manuevers, it can be broken into multiple simpler functions.

At this point, all functions from [JavaScript Part 1](/posts/js-part1) are covered, except `Chicken()` . I'll need another blog post to explain how functions can create objects. Part 3 goes over the ideas covered here in the context of two new functions.


## Closing thoughts

Part 1 covered how we hold on to information. Part 2 has just covered how to manage doing things with that information. This was at an introductory level, and hopefully it leaves you better-equipped to understand, write, and use functions for actual web dev situations. 

