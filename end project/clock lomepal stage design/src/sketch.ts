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

class FlashingLight {
    public x: number;
    public y: number;
    public size: number;
    public brightness: number;
    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.brightness = 200;
    }

    // Method to update the light
    update() {
        this.brightness -= 255 / 100;
        if (this.brightness < 0) {
            this.brightness = 0;
        }
    }

    // Method to display the light
    display(sketch: p5) {
        sketch.push();
        sketch.noStroke();
        sketch.fill(255, 255, 255, this.brightness);
        sketch.circle(this.x, this.y, this.size);
        sketch.pop()
    }
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

const drawLightingRig = (sketch: p5, tubeLightGlowColor: string) => {
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

    let currentDate = new Date();
    let seconds = currentDate.getSeconds();
    let minutes = currentDate.getMinutes();
    let hours = currentDate.getHours();
    let thirdWidth = sketch.map(seconds, 0, 59, 20, rectangleWidth * 0.3);

    // draw vertical light tubes
    let verticalLightTubes = [
        // left side
        new LightTube(rectangleStart, rectangleStart, tubeWidth, thirdWidth, tubeLightGlowColor, cornerRadius),
        new LightTube(rectangleStart, rectangleWidth * 0.3, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        // left middle
        new LightTube(-rectangleWidth * 0.25, -rectangleWidth * 0.1, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, -rectangleStart, tubeWidth, thirdWidth, tubeLightGlowColor, cornerRadius),
        // middle
        new LightTube(0, rectangleStart, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        new LightTube(0, 0, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        new LightTube(0, -rectangleStart + 50, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        // right middle
        new LightTube(rectangleWidth * 0.25, -rectangleStart * 0.6, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor, cornerRadius),
        new LightTube(rectangleWidth * 0.25, rectangleStart * 0.5, tubeWidth, thirdWidth, tubeLightGlowColor, cornerRadius),
        new LightTube(rectangleWidth * 0.25, rectangleStart * 1.3, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        // right side
        new LightTube(-rectangleStart, -rectangleStart * 0.3, tubeWidth, rectangleWidth * 0.55, tubeLightGlowColor, cornerRadius),

    ];
    verticalLightTubes.forEach((lightTube) => {
        drawLightTube(sketch, lightTube.x, lightTube.y, lightTube.width, lightTube.height, lightTube.glowColor, lightTube.cornerRadius);
    });
    // draw horizontal light tubes
    sketch.rotate(90)
    let horizontalLightTubes = [
        // top
        new LightTube(rectangleStart, rectangleStart * 0.8, tubeWidth, rectangleWidth * 0.6, tubeLightGlowColor, cornerRadius),
        new LightTube(rectangleStart, -rectangleStart * 0.5, tubeWidth, rectangleWidth * 0.2, tubeLightGlowColor, cornerRadius),
        // top middle
        new LightTube(-rectangleWidth * 0.25, 0, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, rectangleStart, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, rectangleWidth * 0.5, tubeWidth, thirdWidth, tubeLightGlowColor, cornerRadius),
        // middle
        new LightTube(0, rectangleStart * 0.5, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor, cornerRadius),
        new LightTube(0, -rectangleStart * 1.1, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor, cornerRadius),
        // bottom middle
        new LightTube(rectangleWidth * 0.25, -rectangleStart * 0.2, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor, cornerRadius),
        // bottom
        new LightTube(-rectangleStart, rectangleStart, tubeWidth, thirdWidth, tubeLightGlowColor, cornerRadius),
        new LightTube(-rectangleStart, 0, tubeWidth, rectangleWidth * 0.25, tubeLightGlowColor, cornerRadius),
        new LightTube(-rectangleStart, -rectangleStart, tubeWidth, rectangleWidth * 0.25, tubeLightGlowColor, cornerRadius),
    ];
    horizontalLightTubes.forEach((lightTube) => {
        drawLightTube(sketch, lightTube.x, lightTube.y, lightTube.width, lightTube.height, lightTube.glowColor, lightTube.cornerRadius);
    });
    sketch.pop();

    // place lights on brackets
}

let settings = {
    lightingRigs: {
        left: {
            scale: 0.8,
            x: -700,
            y: -100,
            rotation: 0
        },
        middle: {
            scale: 0.8,
            x: 0,
            y: 100,
            rotation: 270
        },
        right: {
            scale: 0.8,
            x: 700,
            y: -100,
            rotation: 180
        }
    },
    glowColor: "#ff0000"
}
let lights: FlashingLight[] = [];

const addLight = (sketch: p5, offset: number) => {
    let size = sketch.random(50, 150);
    let x = (sketch.noise(sketch.millis() * 0.1 + offset) - 0.5) * sketch.width * 2 - size;
    let y = (sketch.noise(sketch.millis() * 0.1 + offset + 2) - 0.5) * sketch.height * 2 - size;
    lights.push(new FlashingLight(x, y, size));
}

const sketch = (sketch: p5) => {
    sketch.setup = function () {
        let customizeSketchGui = new GUI();
        customizeSketchGui.open(false);
        customizeSketchGui.addColor(settings, 'glowColor');
        const lightingRigLeftGui = customizeSketchGui.addFolder('Lighting Rig Left');
        lightingRigLeftGui.add(settings.lightingRigs.left, 'x', -1000, 1000, 10);
        lightingRigLeftGui.add(settings.lightingRigs.left, 'y', -1000, 1000, 10);
        lightingRigLeftGui.add(settings.lightingRigs.left, 'rotation', 0, 360, 10);
        lightingRigLeftGui.add(settings.lightingRigs.left, 'scale', 0, 1, 0.01);
        const lightingRigMiddleGui = customizeSketchGui.addFolder('Lighting Rig Middle');
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'x', -1000, 1000, 10);
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'y', -1000, 1000, 10);
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'rotation', 0, 360, 10);
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'scale', 0, 1, 0.01)
        const lightingRigRightGui = customizeSketchGui.addFolder('Lighting Rig Right');
        lightingRigRightGui.add(settings.lightingRigs.right, 'x', -1000, 1000, 10);
        lightingRigRightGui.add(settings.lightingRigs.right, 'y', -1000, 1000, 10);
        lightingRigRightGui.add(settings.lightingRigs.right, 'rotation', 0, 360, 10);
        lightingRigRightGui.add(settings.lightingRigs.right, 'scale', 0, 1, 0.01);
        sketch.frameRate(60);
        sketch.angleMode(sketch.DEGREES);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = function () {
        sketch.background(0);
        sketch.translate(sketch.width / 2, sketch.height / 2);

        // Update and display each light
        // for (let i = lights.length - 1; i >= 0; i--) {
        //     lights[i].update();
        //     lights[i].display(sketch);
        //     if (lights[i].brightness <= 0) {
        //         lights.splice(i, 1);
        //     }
        // }
        // if (sketch.frameCount % 30 == 0) {
        //     for (let i = 0; i < 30; i++) {
        //         addLight(sketch, i);
        //     }
        // }

        let currentDate = new Date();
        let minutesWithSeconds = currentDate.getMinutes() + currentDate.getSeconds() / 60;
        let minutesAngle = sketch.map(minutesWithSeconds, 0, 60, 0, 360);
        let hoursWithMinutes = currentDate.getHours() + currentDate.getMinutes() / 60;
        let hoursAngle = sketch.map(hoursWithMinutes, 0, 24, 0, 360);

        let sinOffsetMultiplier = 60;
        let sinOffset = (sketch.sin(sketch.millis() * 0.01) * sinOffsetMultiplier);
        // draw lighting rig on the left
        sketch.push();
        sketch.scale(settings.lightingRigs.left.scale);
        sketch.translate(settings.lightingRigs.left.x + sinOffset, settings.lightingRigs.left.y)
        sketch.rotate(settings.lightingRigs.left.rotation + minutesAngle);
        drawLightingRig(sketch, settings.glowColor);
        sketch.pop();

        // draw lighting rig in the middle
        sketch.push();
        sketch.scale(settings.lightingRigs.middle.scale);
        sketch.translate(settings.lightingRigs.middle.x, settings.lightingRigs.middle.y - sketch.map(sinOffset, -sinOffsetMultiplier, sinOffsetMultiplier, 100, 200))
        sketch.rotate(settings.lightingRigs.middle.rotation + hoursAngle);
        drawLightingRig(sketch, settings.glowColor);
        sketch.pop()

        // draw lighting rig on the right
        sketch.push();
        sketch.scale(settings.lightingRigs.right.scale);
        sketch.translate(settings.lightingRigs.right.x - sinOffset, settings.lightingRigs.right.y)
        sketch.rotate(settings.lightingRigs.right.rotation - minutesAngle);
        drawLightingRig(sketch, settings.glowColor);
        sketch.pop();
    }

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
};

new p5(sketch);