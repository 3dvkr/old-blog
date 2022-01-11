---
title: "JavaScript Part 1: how do we hold on to information?" 
date: 2021-01-30
tags: ["javascript"]
excerpt: "This is a syntax-focused sprint from simple data structures to objects. See Part 2 for loops, and functions/ methods."
---

## Who is this for?

This code is from a work session, inspired by the most common questions from the #100Devs cohort at the time of writing. It's an open-ended exploration, and we're not building anything.

It would apply to anyone starting out, and assumes no previous computer programming background. It's a sprint. By focusing on syntax, my hope is that you'll write more code, and the computer programming concepts will click with practice and further reading. I won't cover those concepts here. 

## A few suggestions
1. Please type out the code as you read along. Copy and paste as little as possible.
2. Predict what the console will print.
3. If you're not familiar with linking files to an HTML document, consider writing along in:
    - codepen.io 
    - playcode.io
    - jsfiddle.net

Oh, one last thing: please try to 'break' the code as you go. Leave out words, or write them in the wrong order. Leave out punctuation. Take credit for doing this, even if it was unintentional. Knowing what not to type is just as important as knowing what works.

## The code

### Declare variables of different types
```javascript
let chickenQty = 4; // a number

let firstChicken = 'Bob'; // a string
let secondChicken = 'Sam';
let thirdChicken = 'Henriette'; 
let thirdChickenNickName = 'Henny'
let fourthChicken = 'Colonel Sanders';
```
*"I wish there was a better and faster way..."*

Before we move on, here are a few more notes on the code above. We're allowed to reassign (using `=`) these throughout the code, but won't use 'let' again, because we can only *declare* a specific variable *once* per code.

#### Notes on how to name variables
Variable names are made up on the spot.
    - Choose a variable name for each chicken (up to you)
    - Declare it with `let` or `const`
    - Assign a value to it. In this case, our value is a string-type.

### Creating an array
`[]` are called square brackets. Use them to create an array, and also to access the information stored inside by its position.

### How is the information labelled
```javascript
let chickenNames = ['Bob', 'Sam', 'Henny', 'Colonel Sanders'];
thirdChicken = 'Henriette';
//OR 
chickenNames = [firstChicken, secondChicken, thirdChickenNickName, fourthChicken];
```


Make a note of Henny, and how we can include her official name and nickname when we group together all the chickens in `chickenNames`. We don't want to include `'Henny'` and `'Henriette'` in the array, because then we might think we have five chickens, when we actually have four chickens. So, where do we store this extra information? Objects. Before that, lets finish up a few other things here.
```javascript
// chickenNames.length for quantity of chickens.
chickenQty = chickenNames.length;
```

Indices label the position of the element, starting at zero from the left side.
```javascript
console.log(chickenNames[0]); 
console.log(chickenNames[1]);
console.log(chickenNames[2]);
console.log(chickenNames[3]);
// There's something different about this one:
console.log(chickenNames[4]);
```

*"I wish there was a better and faster way..."*
### Iterating: going over each thing/element in a grouping of info 

Two data types can group info together: arrays, and objects. Iterating is a way for us to go through that information with less code.
```javascript
console.log('Basic for-loop set-up ------------');
for (let counter = 0; counter < chickenQty; counter++) {
  console.log(chickenNames[counter]);
}
```

#### New notation with for-loops
`()` are called 'parentheses.' Inside, create a counter. Its job is to count. Overall, we usually don't care enough about this counter's name. You'll typically see it called '`i`'.
```javascript
    console.log('This is the for loop, but with a tinier counter name------------ ')
    for (let i = 0; i < chickenQty; i++) {
    console.log(chickenNames[i]);
    }
```

`{}` are called curly brackets or curly braces. They section off the instructions that run every time the for-loop runs. This is one of two important uses for curly braces. We'll see the second one shortly.

*"I wish there was a better and faster way..."*

#### for-of loops and for-in loops

```javascript
console.log('For-of loop------------');
for (chicken of chickenNames) {
  console.log(chicken);
}
console.log('For-in loop------------');
for (position in chickenNames) {
  console.log(position);
} 
```

#### Naming parameters: 'chicken' and 'position'

The general rule with picking names is that the first time you pick the name, it doesn't matter what you call it, but afterwards, we'll use the same name when we want to refer to it. Parameters, unlike variables don't need to be declared with `let` or `const`. It's considerate to choose names that communicate what information/ values you're storing in the variable or parameter.

A full list of commonly used parameters is at the very end of the code. We're going to avoid them for now.

### Creating an Object

#### Use Object Literal notation
```javascript
firstChicken = {
  name: 'Bob'
};
```

Compare this to the very first time we assigned a value to `firstChicken`.

Things to note: 
1. Use curly braces to indicate that the value is an Object type.
    - We previously also used curly braces to section off the body of a for-loop. This is different from what we're doing with curly braces now. Note that there were also two different uses for the square-brackets.
2. Unlike an array, the information inside needs to be labelled by us. The label is called a 'key' and the information is called a 'value.' Together, you'll hear them called 'key-value pairs.' A key and its value are separated with a colon, and each key-value pair is separated with commas (see `thirdChicken`). In Javascript, an object's keys are called its properties.

Here are the rest of the chickens: 

```javascript
secondChicken = {name: 'Sam'}

thirdChicken = {
  name: 'Henriette',
  nickname: 'Henny' // no comma required after the last key-value pair
}


fourthChicken = {
  name: 'Colonel Sanders',
  laysEggs: false
};
```

All of these chickens have different qualities, even though they're all chickens. In Javascript terms, the objects have different properties, even though we'd naturally think they're the same object type. This could get hard to keep track of.

*"Does Bob have a nickname? I can't remember. I wish there was a better and faster way..."*

#### Use an Object Constructor Function
This uses function notation to set up an object constructor function.
```javascript
function Chicken(name, nickname, laysEggs = false) {
  this.name = name;
  this.nickname = nickname;
  this.laysEggs = laysEggs;
}

firstChicken = new Chicken('Bob');
secondChicken = new Chicken('Sam', '', true);
thirdChicken =  new Chicken('Henriette', 'Henny', true);
fourthChicken = new Chicken('Colonel Sanders');

console.log('This is from the Object constructor function ------');
console.log(firstChicken);
console.log(secondChicken);
console.log(thirdChicken);
console.log(fourthChicken);
```


But now we're back to each of the four chickens on their own line, which was the long and tedious thing we were doing at the start of our code.
*"I wish there was a better and faster way..."*
```javascript
chickenNames = [firstChicken, secondChicken, thirdChicken, fourthChicken];
console.log('For-of loop with objects in arrays ------------');
for (chicken of chickenNames) {
  console.log(chicken);
}
```


#### When do we use commas to separate the properties, and when do we use semi-colons?

If using object literals, use a comma (to separate key-value/property-value pairs). If using object constructor functions, use a semi-colon.

### How is the information labelled?

Arrays contain elements. Objects contain key-value or property-value pairs.
Compared to arrays, which have indices (0, 1, 2 ...) to label their elements, *we* choose the labels (or 'property names') for the values stored in objects.

```javascript
const sampleArray = [
  'firstthing', // index is 0
  'secondthing', // index is 1
  'thirdthing' // index is 2
];
const sampleObject = {
  a: 'firstthing', 
  b: 'secondthing',
  c: 'thirdthing'
};
```

Use dot-notation or square-bracket notation to access properties:
```javascript
console.log(thirdChicken.nickname);
console.log(thirdChicken['nickname']);
```

### Conventional Parameter Names

```javascript
key — like key-value pairs
val — value
num — number
arr — array
obj — object

e — event
el — element

res — response
req — request
rej — reject
err — error
```


We've skated over loops, and functions and methods entirely. They're explored in Part 2, which you can find [here](/posts/js-part2). 

I write about the pros and cons of sandbox-style exploration [here](/posts/sandboxes-archery/).
