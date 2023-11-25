import GUI from 'lil-gui';
import p5 from 'p5';

class LightTube {
    constructor(x: number, y: number, w: number, h: number, glowColor: string, cornerRadius: number) {
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
    public glowColor: string;
    public cornerRadius: number;
}

const hexToRgb = (hex: string) => {
    //convert hex to rgb
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b }
}

const drawLightTube = (sketch: p5, x: number, y: number, width: number, height: number, glowColor: string, cornerRadius: number) => {
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
        let glowColorRgb = hexToRgb(glowColor);
        sketch.stroke(glowColorRgb.r, glowColorRgb.g, glowColorRgb.b, alpha);
        sketch.rect(x, y, width + spread, height + spread, glowBorder);
    }
    sketch.pop();
}

const drawLightingRig = (sketch: p5, tubeLightGlowColor: { cssColor: string }) => {
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

    // draw vertical light tubes
    let verticalLightTubes = [
        // left side
        new LightTube(rectangleStart, rectangleStart, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(rectangleStart, rectangleWidth * 0.3, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor.cssColor, cornerRadius),
        // left middle
        new LightTube(-rectangleWidth * 0.25, -rectangleWidth * 0.1, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, -rectangleStart, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor.cssColor, cornerRadius),
        // middle
        new LightTube(0, rectangleStart, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(0, 0, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(0, -rectangleStart + 50, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor.cssColor, cornerRadius),
        // right middle
        new LightTube(rectangleWidth * 0.25, -rectangleStart * 0.6, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor.cssColor, cornerRadius),
        // right side
        new LightTube(-rectangleStart, -rectangleStart * 0.3, tubeWidth, rectangleWidth * 0.55, tubeLightGlowColor.cssColor, cornerRadius),

    ];
    verticalLightTubes.forEach((lightTube) => {
        drawLightTube(sketch, lightTube.x, lightTube.y, lightTube.width, lightTube.height, lightTube.glowColor, lightTube.cornerRadius);
    });
    // draw horizontal light tubes
    sketch.rotate(90)
    let horizontalLightTubes = [
        // top
        new LightTube(rectangleStart, rectangleStart, tubeWidth, rectangleWidth * 0.7, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(rectangleStart, -rectangleStart * 0.5, tubeWidth, rectangleWidth * 0.2, tubeLightGlowColor.cssColor, cornerRadius),
        // top middle
        new LightTube(-rectangleWidth * 0.25, -rectangleWidth * 0.3, tubeWidth, rectangleWidth * 0.9, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, rectangleWidth * 0.5, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor.cssColor, cornerRadius),
        // middle
        new LightTube(0, rectangleStart * 0.5, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(0, -rectangleStart * 1.1, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor.cssColor, cornerRadius),
        // bottom middle
        new LightTube(rectangleWidth * 0.25, -rectangleStart * 0.2, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor.cssColor, cornerRadius),
        // bottom
        new LightTube(-rectangleStart, rectangleStart, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(-rectangleStart, 0, tubeWidth, rectangleWidth * 0.25, tubeLightGlowColor.cssColor, cornerRadius),
        new LightTube(-rectangleStart, -rectangleStart, tubeWidth, rectangleWidth * 0.25, tubeLightGlowColor.cssColor, cornerRadius),
    ];
    horizontalLightTubes.forEach((lightTube) => {
        drawLightTube(sketch, lightTube.x, lightTube.y, lightTube.width, lightTube.height, lightTube.glowColor, lightTube.cornerRadius);
    });
    sketch.pop();

    // place lights on brackets
}
let tubeLightGlowColor = { cssColor: "#ff0000" };


const sketch = (sketch: p5) => {
    sketch.setup = function () {
        let customizeSketchGui = new GUI();
        customizeSketchGui.addColor(tubeLightGlowColor, 'cssColor');
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
        drawLightingRig(sketch, tubeLightGlowColor);
        sketch.pop();

        // draw lighting rig in the middle
        sketch.push();
        sketch.translate(0, 200)
        sketch.rotate(270);
        drawLightingRig(sketch, tubeLightGlowColor);
        sketch.pop()

        // draw lighting rig on the right
        sketch.push();
        sketch.translate(700, -100)
        sketch.rotate(180);
        drawLightingRig(sketch, tubeLightGlowColor);
        sketch.pop();
    }

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
};

new p5(sketch);