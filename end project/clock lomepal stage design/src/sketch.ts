import GUI from 'lil-gui';
import p5 from 'p5';

const drawLightingRig = (sketch: p5) => {
    // draw dark grey lighting brackets
    // lighting brackets are square and divided into 4 sections
    let rectangleWidth = 400;
    let rectangleStart = -rectangleWidth * 0.5;
    sketch.push();
    sketch.strokeWeight(10);
    sketch.stroke(105, 105, 105, 100);

    let horizontalAdditionalXOfStartPoint = [
        -(rectangleWidth * 0.1),
        (rectangleWidth * 0.1),
        -(rectangleWidth * 0.2),
        (rectangleWidth * 0.15),
        -(rectangleWidth * 0.1)
    ];
    let horizontalAdditionalXOfEndPoint = [
        (rectangleWidth * 0.1),
        (rectangleWidth * 0.1),
        (rectangleWidth * 0.1),
        (rectangleWidth * 0.1),
        (rectangleWidth * 0.1)
    ];
    // draw horizontal lines
    for (let i = 0; i < 5; i++) {
        sketch.line(rectangleStart + horizontalAdditionalXOfStartPoint[i], rectangleStart + rectangleWidth / 4 * i, rectangleStart + rectangleWidth + horizontalAdditionalXOfEndPoint[i], rectangleStart + rectangleWidth / 4 * i);
    }
    let verticalAdditionalYOfStartPoint = [
        -(rectangleWidth * 0.1),
        -(rectangleWidth * 0.25),
        -(rectangleWidth * 0.05),
        -(rectangleWidth * 0.2),
        -(rectangleWidth * 0.1)
    ];
    let verticalAdditionalYOfEndPoint = [
        (rectangleWidth * 0.1),
        0,
        (rectangleWidth * 0.15),
        (rectangleWidth * 0.05),
        (rectangleWidth * 0.1)
    ];
    // draw vertical lines
    for (let i = 0; i < 5; i++) {
        sketch.line(rectangleStart + rectangleWidth / 4 * i, rectangleStart + verticalAdditionalYOfStartPoint[i], rectangleStart + rectangleWidth / 4 * i, rectangleStart + rectangleWidth + verticalAdditionalYOfEndPoint[i]);
    }
    sketch.pop();


    // place lights on brackets
}

const sketch = (sketch: p5) => {
    sketch.setup = function () {
        let customizeSketchGui = new GUI();
        sketch.angleMode(sketch.DEGREES);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.background(255);
    }

    sketch.draw = function () {
        sketch.translate(sketch.width / 2, sketch.height / 2);
        drawLightingRig(sketch);
    }

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
};

new p5(sketch);