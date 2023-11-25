import GUI from 'lil-gui';
import p5 from 'p5';

class LightTube {
    constructor(x: number, y: number, w: number, h: number, glowColor: { r: number, g: number, b: number }, cornerRadius: number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.glowColor = glowColor;
        this.cornerRadius = cornerRadius;
    }
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public glowColor: { r: number, g: number, b: number };
    public cornerRadius: number;
}

const drawLightTube = (sketch: p5, x: number, y: number, width: number, height: number, glowColor: { r: number, g: number, b: number }, cornerRadius: number) => {
    sketch.push();
    sketch.noStroke();
    sketch.rectMode(sketch.CENTER);
    sketch.rect(x, y, width, height, cornerRadius);

    let glowMaxRadius = 50; // Max radius of the glow
    let glowBorder = glowMaxRadius * 0.5; // Border of the glow
    let steps = glowMaxRadius * 0.5; // Number of steps for the glow effect
    let maxAlpha = 100; // Max alpha value of the glow
    sketch.noFill();

    for (let i = 0; i < steps; i++) {
        let alpha = sketch.map(i, 0, steps, maxAlpha, 0); // Decreasing alpha value
        let spread = sketch.map(i, 0, steps, 0, glowMaxRadius); // Increasing spread of the glow
        sketch.stroke(glowColor.r, glowColor.g, glowColor.b, alpha);
        sketch.rect(x, y, width + spread, height + spread, glowBorder);
    }
    sketch.pop();
}

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
        (rectangleWidth * 0.15),
        -(rectangleWidth * 0.1),
        (rectangleWidth * 0.1),
        (rectangleWidth * 0.2)
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
    sketch.push();
    let tubeWidth = 10;
    let cornerRadius = 5;
    let tubeLightGlowColor = { r: 255, g: 0, b: 0 };
    // draw vertical light tubes
    let lightTubes = [
        // left side
        new LightTube(rectangleStart, rectangleStart, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        new LightTube(rectangleStart, rectangleWidth * 0.3, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        // left middle
        new LightTube(-rectangleWidth * 0.25, rectangleStart + 100, tubeWidth, rectangleWidth * 0.6, tubeLightGlowColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, -rectangleStart, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        // middle
        new LightTube(0, rectangleStart, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        new LightTube(0, 0, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        new LightTube(0, -rectangleStart + 50, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        // right middle
        new LightTube(rectangleWidth * 0.25, 0 + 100, tubeWidth, rectangleWidth * 0.8, tubeLightGlowColor, cornerRadius),
        // right side
        new LightTube(-rectangleStart, rectangleStart + 100, tubeWidth, rectangleWidth * 0.75, tubeLightGlowColor, cornerRadius),

    ];
    lightTubes.forEach((lightTube) => {
        drawLightTube(sketch, lightTube.x, lightTube.y, lightTube.width, lightTube.height, lightTube.glowColor, lightTube.cornerRadius);
    });
    sketch.pop();

    // place lights on brackets
}

const sketch = (sketch: p5) => {
    sketch.setup = function () {
        let customizeSketchGui = new GUI();
        sketch.angleMode(sketch.DEGREES);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = function () {
        sketch.background(0);
        sketch.translate(sketch.width / 2, sketch.height / 2);
        sketch.scale(0.5);
        // draw lighting rig on the left
        sketch.push();
        sketch.translate(-700, -300)
        drawLightingRig(sketch);
        sketch.pop();

        // draw lighting rig in the middle
        sketch.push();
        sketch.translate(0, 200)
        sketch.rotate(270);
        drawLightingRig(sketch);
        sketch.pop()

        // draw lighting rig on the right
        sketch.push();
        sketch.translate(700, -100)
        sketch.rotate(180);
        drawLightingRig(sketch);
        sketch.pop();
    }

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
};

new p5(sketch);