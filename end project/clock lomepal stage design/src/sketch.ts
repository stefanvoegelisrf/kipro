import GUI from 'lil-gui';
import p5, { BLEND_MODE } from 'p5';
import { LightTube } from './lighttube';
import { FlashingLight } from './flashinglight';
import { ISettings, blendModes } from './settings';

const drawLightingRig = (sketch: p5, tubeLightGlowColor: string, currentDate: Date) => {
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

    let halwidthBaseLine = rectangleWidth * 0.5;
    let amplitudeHalfWidth = (halwidthBaseLine - (halwidthBaseLine * 0.3)) / 2;
    let thirdWidthBaseline = rectangleWidth * 0.3;
    let amplitudeThirdWidth = (thirdWidthBaseline - (thirdWidthBaseline * 0.5)) / 2;
    let quarterWidthBaseline = rectangleWidth * 0.25;
    let amplitudeQuarterWidth = (quarterWidthBaseline - (quarterWidthBaseline * 0.5)) / 2;

    let milliseconds = currentDate.getMilliseconds();
    let seconds = currentDate.getSeconds();
    let secondsWithMilliseconds = currentDate.getSeconds() + milliseconds / 1000;
    let secondsAngle = sketch.map(secondsWithMilliseconds, 0, 59, 0, 360);
    let thirdWidthAlternatingBasedOnSeconds = thirdWidthBaseline - amplitudeThirdWidth * sketch.cos(secondsAngle);

    let minutes = currentDate.getMinutes();
    let minutesWithSeconds = minutes + sketch.map(secondsWithMilliseconds, 0, 59, 0, 100) / 100;
    let minutesAngle = sketch.map(minutesWithSeconds, 0, 59, 0, 360);
    let halfWidthAlternatingBasedOnMinutes = halwidthBaseLine - amplitudeHalfWidth * sketch.cos(minutesAngle);
    let quarterWidthAlternatingBasedOnMinutes = quarterWidthBaseline - amplitudeQuarterWidth * sketch.cos(minutesAngle);


    let hours = currentDate.getHours();
    let tubeLightWithChangingValueGlowColor = "#00FFFF";
    // draw vertical light tubes
    let verticalLightTubes = [
        // left side
        new LightTube(rectangleStart, rectangleStart, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingValueGlowColor, cornerRadius),
        new LightTube(rectangleStart, rectangleWidth * 0.3, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        // left middle
        new LightTube(-rectangleWidth * 0.25, -rectangleWidth * 0.1, tubeWidth, halfWidthAlternatingBasedOnMinutes, tubeLightWithChangingValueGlowColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, -rectangleStart, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingValueGlowColor, cornerRadius),
        // middle
        new LightTube(0, rectangleStart, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        new LightTube(0, 0, tubeWidth, rectangleWidth * 0.3, tubeLightGlowColor, cornerRadius),
        new LightTube(0, -rectangleStart + 50, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        // right middle
        new LightTube(rectangleWidth * 0.25, -rectangleStart * 0.6, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor, cornerRadius),
        new LightTube(rectangleWidth * 0.25, rectangleStart * 0.5, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingValueGlowColor, cornerRadius),
        new LightTube(rectangleWidth * 0.25, rectangleStart * 1.3, tubeWidth, rectangleWidth * 0.15, tubeLightGlowColor, cornerRadius),
        // right side
        new LightTube(-rectangleStart, -rectangleStart * 0.3, tubeWidth, halfWidthAlternatingBasedOnMinutes, tubeLightWithChangingValueGlowColor, cornerRadius),

    ];
    verticalLightTubes.forEach((lightTube) => {
        if (seconds === 0) {
            lightTube.startFlashing();
        }
        lightTube.display(sketch);
    });
    // draw horizontal light tubes
    sketch.rotate(90)
    let horizontalLightTubes = [
        // top
        new LightTube(rectangleStart, rectangleStart * 0.8, tubeWidth, rectangleWidth * 0.6, tubeLightGlowColor, cornerRadius),
        new LightTube(rectangleStart, -rectangleStart * 0.5, tubeWidth, rectangleWidth * 0.2, tubeLightGlowColor, cornerRadius),
        // top middle
        new LightTube(-rectangleWidth * 0.25, 0, tubeWidth, quarterWidthAlternatingBasedOnMinutes, tubeLightWithChangingValueGlowColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, rectangleStart, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor, cornerRadius),
        new LightTube(-rectangleWidth * 0.25, rectangleWidth * 0.5, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingValueGlowColor, cornerRadius),
        // middle
        new LightTube(0, rectangleStart * 0.5, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor, cornerRadius),
        new LightTube(0, -rectangleStart * 1.1, tubeWidth, rectangleWidth * 0.35, tubeLightGlowColor, cornerRadius),
        // bottom middle
        new LightTube(rectangleWidth * 0.25, -rectangleStart * 0.2, tubeWidth, rectangleWidth * 0.5, tubeLightGlowColor, cornerRadius),
        // bottom
        new LightTube(-rectangleStart, rectangleStart, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingValueGlowColor, cornerRadius),
        new LightTube(-rectangleStart, 0, tubeWidth, quarterWidthAlternatingBasedOnMinutes, tubeLightWithChangingValueGlowColor, cornerRadius),
        new LightTube(-rectangleStart, -rectangleStart, tubeWidth, rectangleWidth * 0.25, tubeLightGlowColor, cornerRadius),
    ];
    horizontalLightTubes.forEach((lightTube) => {
        if (seconds === 0) {
            lightTube.startFlashing();
        }
        lightTube.display(sketch);
    });
    sketch.pop();
}

let settings: ISettings = {
    lightingRigs: {
        left: {
            scale: 1,
            x: -600,
            y: 0,
            rotation: 0
        },
        middle: {
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0
        },
        right: {
            scale: 1,
            x: 600,
            y: 0,
            rotation: 0
        }
    },
    clock: {
        fake: false,
        speedUp: false,
        timeFactor: 10,
        time: {
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        },
        displayInBackground: true
    },
    glowColor: "#ff0000",
    sinOffsetEnabled: false,
    rotationEnabled: false,
    blendMode: "BLEND"
}
let lights: FlashingLight[] = [];
let normalTime = new Date();
let fastTime = new Date(normalTime);
let rubikMonoOne: p5.Font;
const setBlendMode = (blendMode: blendModes) => {
    settings.blendMode = blendMode;
}


const addLight = (sketch: p5, offset: number) => {
    let size = sketch.random(50, 150);
    let x = (sketch.noise(sketch.millis() * 0.1 + offset) - 0.5) * sketch.width * 2 - size;
    let y = (sketch.noise(sketch.millis() * 0.1 + offset + 2) - 0.5) * sketch.height * 2 - size;
    lights.push(new FlashingLight(x, y, size));
}
const actions = {
    haveFun() {
        settings.rotationEnabled = true;
        settings.sinOffsetEnabled = true;
        settings.clock.speedUp = true;
        settings.clock.timeFactor = 1000;
        settings.clock.displayInBackground = false;
        settings.lightingRigs.left.scale = 2;
        settings.lightingRigs.middle.scale = 2;
        settings.lightingRigs.right.scale = 2;
        settings.lightingRigs.left.x = 0;
        settings.lightingRigs.middle.x = 0;
        settings.lightingRigs.right.x = 0;
    },
    hypnotize() {
        settings.rotationEnabled = true;
        settings.sinOffsetEnabled = true;
        settings.clock.speedUp = false;
        settings.clock.displayInBackground = false;
        settings.lightingRigs.left.scale = 2;
        settings.lightingRigs.middle.scale = 2;
        settings.lightingRigs.right.scale = 2;
        settings.lightingRigs.left.x = 0;
        settings.lightingRigs.middle.x = 0;
        settings.lightingRigs.right.x = 0;
    },
    calmWithText() {
        settings.rotationEnabled = false;
        settings.sinOffsetEnabled = false;
        settings.clock.speedUp = false;
        settings.clock.timeFactor = 10;
        settings.clock.displayInBackground = true;
        settings.lightingRigs.left.scale = 1;
        settings.lightingRigs.middle.scale = 1;
        settings.lightingRigs.right.scale = 1;
        settings.lightingRigs.left.x = -600;
        settings.lightingRigs.middle.x = 0;
        settings.lightingRigs.right.x = 600;
    }
}
const blendModeOptions: blendModes[] = [
    "BLEND",
    "ADD",
    "DARKEST",
    "LIGHTEST",
    "DIFFERENCE",
    "EXCLUSION",
    "MULTIPLY",
    "SCREEN",
    "REPLACE",
    "OVERLAY",
    "HARD_LIGHT",
    "SOFT_LIGHT",
    "DODGE",
    "BURN",
    "SUBTRACT"
];
const applyBlendMode = (sketch: p5, blendMode: blendModes) => {
    switch (blendMode) {
        case "BLEND":
            sketch.blendMode(sketch.BLEND);
            break;
        case "ADD":
            sketch.blendMode(sketch.ADD);
            break;
        case "DARKEST":
            sketch.blendMode(sketch.DARKEST);
            break;
        case "LIGHTEST":
            sketch.blendMode(sketch.LIGHTEST);
            break;
        case "DIFFERENCE":
            sketch.blendMode(sketch.DIFFERENCE);
            break;
        case "EXCLUSION":
            sketch.blendMode(sketch.EXCLUSION);
            break;
        case "MULTIPLY":
            sketch.blendMode(sketch.MULTIPLY);
            break;
        case "SCREEN":
            sketch.blendMode(sketch.SCREEN);
            break;
        case "REPLACE":
            sketch.blendMode(sketch.REPLACE);
            break;
        case "OVERLAY":
            sketch.blendMode(sketch.OVERLAY);
            break;
        default:
            sketch.blendMode(sketch.BLEND);
            break;
    }
}
const sketch = (sketch: p5) => {
    sketch.preload = () => {
        // Load the font
        rubikMonoOne = sketch.loadFont('assets/fonts/Rubik_Mono_One/RubikMonoOne-Regular.ttf');
    };
    sketch.setup = function () {
        let customizeSketchGui = new GUI();
        customizeSketchGui.open(false);
        customizeSketchGui.addColor(settings, 'glowColor').listen();
        customizeSketchGui.add(settings, 'sinOffsetEnabled').listen();
        customizeSketchGui.add(settings, 'rotationEnabled').listen();
        customizeSketchGui.add(settings, 'blendMode', blendModeOptions).onChange((value: blendModes) => {
            setBlendMode(value);
        });
        const presetsGui = customizeSketchGui.addFolder('Presets');
        presetsGui.add(actions, 'haveFun').name('have fun');
        presetsGui.add(actions, 'hypnotize').name('Hypnotize');
        presetsGui.add(actions, 'calmWithText').name('Calm with text');
        const clockGui = customizeSketchGui.addFolder('Clock')
        clockGui.add(settings.clock, 'speedUp').listen();
        clockGui.add(settings.clock, 'timeFactor', 1, 1000, 1).listen();
        clockGui.add(settings.clock, 'fake').listen();
        clockGui.add(settings.clock.time, 'hours', 0, 24, 1).listen();
        clockGui.add(settings.clock.time, 'minutes', 0, 60, 1).listen();
        clockGui.add(settings.clock.time, 'seconds', 0, 60, 1).listen();
        clockGui.add(settings.clock.time, 'milliseconds', 0, 1000, 1).listen();
        clockGui.add(settings.clock, 'displayInBackground');
        const lightingRigLeftGui = customizeSketchGui.addFolder('Lighting Rig Left');
        lightingRigLeftGui.add(settings.lightingRigs.left, 'x', -1000, 1000, 10).listen();
        lightingRigLeftGui.add(settings.lightingRigs.left, 'y', -1000, 1000, 10).listen();
        lightingRigLeftGui.add(settings.lightingRigs.left, 'rotation', 0, 360, 10).listen();
        lightingRigLeftGui.add(settings.lightingRigs.left, 'scale', 0, 1, 0.01).listen();
        const lightingRigMiddleGui = customizeSketchGui.addFolder('Lighting Rig Middle');
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'x', -1000, 1000, 10).listen();
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'y', -1000, 1000, 10).listen();
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'rotation', 0, 360, 10).listen();
        lightingRigMiddleGui.add(settings.lightingRigs.middle, 'scale', 0, 1, 0.01).listen();
        const lightingRigRightGui = customizeSketchGui.addFolder('Lighting Rig Right');
        lightingRigRightGui.add(settings.lightingRigs.right, 'x', -1000, 1000, 10).listen();
        lightingRigRightGui.add(settings.lightingRigs.right, 'y', -1000, 1000, 10).listen();
        lightingRigRightGui.add(settings.lightingRigs.right, 'rotation', 0, 360, 10).listen();
        lightingRigRightGui.add(settings.lightingRigs.right, 'scale', 0, 1, 0.01).listen();
        sketch.frameRate(60);
        sketch.angleMode(sketch.DEGREES);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = function () {
        applyBlendMode(sketch, settings.blendMode);
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

        if (settings.clock.speedUp) {
            fastTime.setTime(normalTime.getTime() + (sketch.millis() * settings.clock.timeFactor));
        } else {
            normalTime = new Date();
        }
        let currentDate = settings.clock.speedUp ? fastTime : normalTime;
        if (settings.clock.fake) {
            currentDate.setHours(settings.clock.time.hours);
            currentDate.setMinutes(settings.clock.time.minutes);
            currentDate.setSeconds(settings.clock.time.seconds);
            currentDate.setMilliseconds(settings.clock.time.milliseconds);
        }
        if (settings.clock.displayInBackground) {
            sketch.push();
            sketch.textSize(200);
            sketch.fill(255);
            sketch.textFont(rubikMonoOne);
            sketch.textAlign(sketch.CENTER, sketch.CENTER);
            sketch.text(currentDate.toLocaleTimeString(), 0, 0)
            sketch.pop();
        }
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();
        let milliseconds = currentDate.getMilliseconds();
        let secondsWithMilliseconds = seconds + milliseconds / 1000;
        let minutesWithMilliseconds = minutes + secondsWithMilliseconds / 60;
        let minutesAngle = sketch.map(minutesWithMilliseconds, 0, 59, 0, 360);
        let hoursWithMinutes = currentDate.getHours() + minutesWithMilliseconds / 60;
        let hoursAngle = sketch.map(hoursWithMinutes, 0, 24, 0, 360);
        if (!settings.rotationEnabled) {
            hoursAngle = 0;
            minutesAngle = 0;
        }

        let sinOffsetMultiplier = 60;
        let sinOffset = (sketch.sin(sketch.millis() * 0.01) * sinOffsetMultiplier);
        if (!settings.sinOffsetEnabled) {
            sinOffset = 0;
        }
        // let sinOffset = 0;

        // draw lighting rig on the left
        sketch.push();
        sketch.scale(settings.lightingRigs.left.scale);
        sketch.translate(settings.lightingRigs.left.x + sinOffset, settings.lightingRigs.left.y)
        sketch.rotate(settings.lightingRigs.right.rotation + minutesAngle);
        drawLightingRig(sketch, settings.glowColor, currentDate);
        sketch.pop();

        // draw lighting rig in the middle
        sketch.push();
        sketch.scale(settings.lightingRigs.middle.scale);
        sketch.translate(settings.lightingRigs.middle.x, settings.lightingRigs.middle.y - sinOffset)
        sketch.rotate(settings.lightingRigs.middle.rotation + hoursAngle);
        drawLightingRig(sketch, settings.glowColor, currentDate);
        sketch.pop()

        // draw lighting rig on the right
        sketch.push();
        sketch.scale(settings.lightingRigs.right.scale);
        sketch.translate(settings.lightingRigs.right.x - sinOffset, settings.lightingRigs.right.y)
        sketch.rotate(settings.lightingRigs.right.rotation - minutesAngle);
        drawLightingRig(sketch, settings.glowColor, currentDate);
        sketch.pop();
    }

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
};

new p5(sketch);