# 25.9.2023

## Übung Bild beschreiben

Describe the image so it can be recreated

### Image



### Description(prompt for ChatGPT)

Create a p5js script that creates a rectangle(name:rectanglebase) with an aspect ratio of 1:1.141. On top of this rectangle, place another rectangle (name:rectanglehorizontal) that starts at the middle of the first rectangle and expands indefinitely to the right and the left. The height of rectanglehorizontal is 50% relative to the height of the rectanglebase. The rectanglehorizontal has gray border on the top and the bottom. The rectanglehorizontal is filled with vertical lines that span from top to bottom and are 5px with with 10px spacing. The rectanglehorizontal is duplicated and then rotated 45 degrees. The rectanglehorizontal is duplicated again and the rotated 90 degrees.

### Generated code

```

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(255);

  let baseWidth = width * 0.6;
  let baseHeight = baseWidth * 1.141;
  let baseX = (width - baseWidth) / 2;
  let baseY = (height - baseHeight) / 2;

  // rectanglebase
  fill(200);
  rect(baseX, baseY, baseWidth, baseHeight);

  let horizontalHeight = baseHeight * 0.5;
  let lineWidth = 5;
  let lineSpacing = 10;

  // rectanglehorizontal
  fill(255);
  for (let x = 0; x < width; x += lineWidth + lineSpacing) {
    rect(x, (height - horizontalHeight) / 2, lineWidth, horizontalHeight);
  }

  // adding gray border
  stroke(100);
  strokeWeight(1);
  line(0, (height - horizontalHeight) / 2, width, (height - horizontalHeight) / 2);
  line(0, (height + horizontalHeight) / 2, width, (height + horizontalHeight) / 2);

  // rectanglehorizontal rotated 45 degrees
  push();
  translate(width / 2, height / 2);
  rotate(PI / 4);
  for (let x = -width; x < width; x += lineWidth + lineSpacing) {
    rect(x, -(horizontalHeight / sqrt(2)), lineWidth, horizontalHeight);
  }
  pop();

  // rectanglehorizontal rotated 90 degrees
  push();
  translate(width / 2, height / 2);
  rotate(PI / 2);
  for (let x = -width; x < width; x += lineWidth + lineSpacing) {
    rect(x, -(horizontalHeight / 2), lineWidth, horizontalHeight);
  }
  pop();
}


```