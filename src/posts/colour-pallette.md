---
title: "How to make a colour palette app"
date: 2021-04-22
tags: ["javascript"]
excerpt: "This is a beginner-friendly tutorial using HTML, CSS, and vanillaJS."
---

## What exactly are we building?
We're building a small app that lets the user pick three colours, or can suggest two colours that work well with a colour that the user has chosen. We'll use [HSL values](/posts/hsl) to choose our colours and build our pallette. Most of the focus is on vanillaJS.

Here's the app:
<p class="codepen" data-height="488" data-theme-id="dark" data-default-tab="html,result" data-user="dvkr" data-slug-hash="JjWooEd" data-preview="true" style="height: 488px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Colour Pallette">
  <span>See the Pen <a href="https://codepen.io/dvkr/pen/JjWooEd">
  Colour Pallette</a> by dvkr (<a href="https://codepen.io/dvkr">@dvkr</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## How/where do I build it?
Codepen is easiest. Another option is to create a folder with one HTML file, one CSS file, and one JavaScript file, and code along with a code editor. Link the CSS and JavaScript to the HTML file. 

## Starter Code
Here is the HTML code. In the first section, there are three `div` containers which will display the colour selected. We'll need a way to target all three together, and each of them individually, so they'll need a class and id. In the second section, there are three input fields, and two buttons. You can read more about the attributes for the input element [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

```html
<main>            
    <section>
        <div class="colourChoice" id="choice1">First colour</div>
        <div class="colourChoice" id="choice2">Second colour</div>
        <div class="colourChoice" id="choice3">Third colour</div>
    </section>
    <section>
        <p>Enter HSL values:</p>
    </section>
    <section class="values">
        <label for="hue">Hue
            <input type="number" id="hue" max="360" min="0">
        </label>
         <label for="sat">Saturation
            <input type="number" id="sat" max="100" min="0">
        </label>
        <label for="light">Lightness
            <input type="number" id="light" max="100" min="0">
        </label>
                                    
        <button id="changeBtn"> Change colour</button>
        <button id="suggestBtn">Suggest colour</button>
    </section>
</main>
```
## Building the app with JavaScript

Most objects and methods in this project's JavaScript code are from the [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). Instead of for-loops, we'll use arrays and the `forEach` method. To parse values, we'll use the `slice` and `splice` methods on strings and arrays. To generate random values, we'll use the `Math` module.


First, we'll need to assign the three inputs to variables, so we can access their values in response to user interaction.
```javascript
const hue = document.getElementById('hue');
const sat = document.getElementById('sat');
const light = document.getElementById('light');
```

Next, we'll target the first button with its id, and use the `addEventListener` method to add interactiveness. This method's first argument is the event that it listens for (a click), and the second argument is a callback function that runs once it detects that event (`getHSL`). Since the `addEventListener` method is calling the function, do not add `()` after the function's name.

The function definition for `getHSL` is below. Its job is to retrive the values from the input fields and apply that colour as the background to the selected `colourChoice` div. For now, we'll have it always change the first div's background colour (`#choice1`).

```javascript
document.getElementById('changeBtn').addEventListener('click', getHSL);

function getHSL() {
    let hueVal = +hue.value;
    let satVal = +sat.value;
    let lightVal = +light.value;

    document.getElementById('choice1').style.backgroundColor = `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`;
}
```
In a newline above our event listener, we'll target all three `.colourChoice` divs. Declare a new variable `selection`, and assign the first div as the default element. Then, we'll add an event listener to all three divs, with an anonymous callback function as the second argument:
```javascript
const colourChoice = document.querySelectorAll('.colourChoice');
let selection = colourChoice[0];
colourChoice.forEach(div => div.addEventListener('click', () => {
    selection = div;
}));
```

We can now replace `document.getElementById('choice1')` with `selection` in the `getHSL` function.

At this point, our first button works, but we'll want a way to provide feedback in case the user doesn't provide valid inputs. Let's start by changing the first three lines of the `getHSL` function:

```javascript
function getHSL() {
    let hueVal = hue.value ? +hue.value : -1;
    let satVal = sat.value ? +sat.value : -1;
    let lightVal = light.value ? +light.value : -1;
  // more code...
}
```
We're using the ternary operator to choose the value to assign. If a value is provided, it will assign that value, casted from a String-type to a Number-type with the `+` in front. If it is missing, it will assign `-1`. 

Then we'll need to check if the value is between 0 and 360 for the hue, and 0 and 100 for saturation and lightness. To provide feedback, we'll have a red border around that input field. In order to clear errors from previous attempts, the first thing the function should do every time it runs is reset the border style. After updating the background colour, we'll also update the text content of the selected div to the hsl value. Here is the updated `getHSL` function definition:

```javascript
function getHSL() {
    [hue, sat, light].forEach(el => el.style.border = "1px dotted black"); // reset style
    let hueVal = hue.value ? +hue.value : -1;
    let satVal = sat.value ? +sat.value : -1;
    let lightVal = light.value ? +light.value : -1;
    
    // check for errors, and provide feedback
    if (hueVal >= 0 && hueVal <= 360 
            && satVal >= 0 && satVal <= 100 
            && lightVal >= 0 && lightVal <= 100) {
        selection.style.backgroundColor = `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`;
        selection.textContent = `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`;
    } else {
        function makeRed(whichBox) {whichBox.style.border = "3px solid red";}
        if (!(hueVal >= 0 && hueVal <= 360)) {makeRed(hue)}
        if (!(satVal >= 0 && satVal <= 100)) {makeRed(sat)}
        if (!(lightVal >= 0 && lightVal <= 100)) {makeRed(light)}
    }
}
```

Those `if`-statements could be easier to read. Lets define a little function that checks if a number falls within the range we want:
```javascript
function inBetween(input, min, max) {return input >= min && input <= max;}
```
Going into the `getHSL()` function definition, we can add this function right before the `if-else` statement, and use it to re-write the `if`-conditions in a more readable way:

```javascript
function getHSL() {
  [hue, sat, light].forEach((el) => (el.style.border = "1px dotted black"));
  let hueVal = hue.value ? +hue.value : -1;
  let satVal = sat.value ? +sat.value : -1;
  let lightVal = light.value ? +light.value : -1;

  function inBetween(input, min, max) {return input >= min && input <= max;}

  if (inBetween(hueVal, 0, 360) &&
    inBetween(satVal, 0, 100) &&
    inBetween(lightVal, 0, 100)
  ) {
    selection.style.backgroundColor = `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`;
    selection.textContent = `hsl(${hueVal}, ${satVal}%, ${lightVal}%)`;
  } else {
    function makeRed(whichValue) {
      whichValue.style.border = "3px solid red";
    }
    if (!inBetween(hueVal, 0, 360)) {makeRed(hue);}
    if (!inBetween(satVal, 0, 100)) {makeRed(sat);}
    if (!inBetween(lightVal, 0, 100)) {makeRed(light);}
  }
}
```

In a new line below the `#changeBtn`'s event listener, we'll add another event listener on `#suggestBtn` with a new callback function `suggestHSL`. Together, the two lines are:
```javascript
document.querySelector('#changeBtn').addEventListener('click', getHSL);
document.querySelector('#suggestBtn').addEventListener('click', suggestHSL);
```
The `suggestHSL` function runs when the user clicks the second button. Here is the function definition with pseudocode:

```javascript
function suggestHSL() {
    // exit the function if the first `.choiceColour` div has no background colour
    // extract the first div's HSL values from the div's text content
    // for the remaining two `.choiceColour` divs
      // pick a new hue, saturation, and lightness
}
```
To keep the code modular, we'll need two new functions: `extractHSL` for the second point, and `newValue` to find the values for the third point. Our `suggestHSL` function definition now looks like this:
```javascript
function suggestHSL() {
    if (!colourChoice[0].style.backgroundColor) {return null}
    let [hueValFirst, satValFirst, lightValFirst] = extractHSL(colourChoice[0]);

    Array.from(colourChoice).splice(1).forEach((el, index) => {

       let hueNew = (hueValFirst + (120 * (index + 1))) % 360;
       let satNew = newValue(satValFirst);
       let lightNew = newValue(lightValFirst, true);
       el.style.backgroundColor = `hsl(${hueNew}, ${satNew}%, ${lightNew}%)`;
       el.textContent = `hsl(${hueNew}, ${satNew}%, ${lightNew}%)`;
    });
}
```

The `extractHSL` function to parse the values for hue, saturation, and lightness from the text:

```javascript

function extractHSL(selectedBox) {
    let [hueBox, satBox, lightBox] = selectedBox.textContent.slice(4,-1).split(',');
    return [+hueBox, +satBox.slice(0, -1), +lightBox.slice(0, -1)];
}
```
The `newValue` function finds a new value for the saturation and lightness based on those values for the first `.choiceColour` div. It does different calculations depending on which value we're calculating, with saturation being the default. 

- If those values are low (below 33%), it returns a saturation value slightly higher than the input, or a lightness value between 20% and 85%. 
- If those values are high (above 66%), it returns a saturation value slightly below the input, or a lightness value between 15% and 80%. 
- Otherwise, it returns a saturation or lightness value between 25% and 75%. 

By placing some restrictions and keeping the values from being entirely random, the suggested palette is more likely to have colours that work well together.
```javascript
function newValue(num, lightFlag = false) {
    let distance =  Math.ceil(Math.random() * (num % 33));
    if (num < 33) {
        return lightFlag ? 33 + distance : 20 + Math.ceil(Math.random() * 65)
    } else if (num > 66) {
        return lightFlag ? 66 - distance : 80 - Math.ceil(Math.random() * 65)
    } else {
        return 25 + Math.ceil(Math.random() * 50);
    }
}
```
There is one more place we can use the `extractHSL` function. If we click on a div that already has a background colour, we can have those values load in the input fields. This will allow for minor changes to the HSL, without the user having the manually copy the values into the fields. This line goes at the end of the callback function in the `.colourChoice` divs' event listeners:
```javascript
colourChoice.forEach(div => div.addEventListener('click', () => {
    selection = div;
    if (div.style.backgroundColor) [hue.value, sat.value, light.value] = extractHSL(div);
}));
```

The complete code is available [here](https://codepen.io/dvkr/pen/JjWooEd). For a JavaScript exercise that does *not* involve DOM manipulation, I walk through building [Rock-Paper-Scissors-Lizard-Spock](/posts/js-part3).