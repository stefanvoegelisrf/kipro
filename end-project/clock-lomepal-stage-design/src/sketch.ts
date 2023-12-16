import GUI, { Controller } from 'lil-gui';
import p5 from 'p5';
import { ISettings, blendModes } from './settings';
import { LightingRig } from './lightingrig';
import { applyBlendMode, blendModeOptions, hexToRgb, setBlendMode } from './utils';
import rubikMonoOneUrl from '../assets/fonts/Rubik_Mono_One/RubikMonoOne-Regular.ttf';

let settings: ISettings = {
    lightingRigs: {
        left: {
            scale: 1,
            x: -400,
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
            x: 400,
            y: 0,
            rotation: 0
        }
    },
    clock: {
        fake: false,
        speedUp: false,
        timeFactor: 10,
        time: {
            hours: {
                value: 0,
                glowColor: "#0A00B8"
            },
            minutes: {
                value: 0,
                glowColor: "#7209B8"
            },
            seconds: {
                value: 0,
                glowColor: "#B8128C"
            },
            milliseconds: 0
        },
        displayInBackground: true
    },
    backgroundSettings: {
        enabled: true,
        color: "#000000",
        alpha: 100
    },
    flashInterval: 60,
    sinOffsetEnabled: true,
    sinOffsetMultiplier: 60,
    rotationEnabled: true,
    blendMode: "BLEND",
    demoMode: false,
    demoModeInterval: 10,
    randomDemoMode: false,
    randomDemoModeInterval: 10
}
const drawLightingRig = (sketch: p5, currentDate: Date) => {
    let lightingRig = new LightingRig();
    lightingRig.drawBaseStructure(sketch);
    lightingRig.drawLights(sketch, currentDate, settings);
}
let normalTime = new Date();
let fastTime = new Date(normalTime);
let rubikMonoOne: p5.Font;
let demoModeIndex = 0;
let demoModeIntervalId: number | undefined = undefined;
let demoModeButtonController: Controller | undefined = undefined;
let randomDemoModeButtonController: Controller | undefined = undefined;
let isPortrait = window.innerHeight > window.innerWidth;

const setNextPreset = () => {
    const presets = Object.keys(actions);
    let nextPreset = actions.presets.calmWithText;
    switch (demoModeIndex) {
        case 0:
            nextPreset = actions.presets.calmWithText;
            break;
        case 1:
            nextPreset = actions.presets.haveFun;
            break;
        case 2:
            nextPreset = actions.presets.hypnotize;
            break;
        case 3:
            nextPreset = actions.presets.stageSettingMoody;
            break;
        case 4:
            nextPreset = actions.presets.pauseTheTime;
            break;
        case 5:
            nextPreset = actions.presets.multipleLayers;
            break;
        default:
            nextPreset = actions.presets.calmWithText;
            break;
    }
    demoModeIndex++;

    if (demoModeIndex >= presets.length) {
        demoModeIndex = 0;
    }

    nextPreset();
}

const setNextRandomPreset = () => {
    actions.presets.surpriseMe();
}

const actions = {
    presets: {
        haveFun() {
            settings.rotationEnabled = true;
            settings.sinOffsetEnabled = true;
            settings.sinOffsetMultiplier = 80;
            settings.clock.speedUp = true;
            settings.clock.timeFactor = 250;
            settings.clock.displayInBackground = false;
            settings.clock.time.hours.glowColor = "#fe218b";
            settings.clock.time.minutes.glowColor = "#fed700";
            settings.clock.time.seconds.glowColor = "#21b0fe";
            settings.lightingRigs.left.scale = 2;
            settings.lightingRigs.middle.scale = 2;
            settings.lightingRigs.right.scale = 2;
            settings.lightingRigs.left.x = 0;
            settings.lightingRigs.middle.x = 0;
            settings.lightingRigs.right.x = 0;
            settings.backgroundSettings.enabled = false;
            settings.flashInterval = 20;
            setBlendMode("SUBTRACT", settings);
        },
        hypnotize() {
            settings.rotationEnabled = true;
            settings.sinOffsetEnabled = true;
            settings.clock.fake = false;
            settings.clock.speedUp = true;
            settings.clock.timeFactor = 10;
            settings.clock.displayInBackground = false;
            settings.clock.time.hours.glowColor = "#0A00B8";
            settings.clock.time.minutes.glowColor = "#7209B8";
            settings.clock.time.seconds.glowColor = "#B8128C";
            settings.lightingRigs.left.scale = 2;
            settings.lightingRigs.middle.scale = 2;
            settings.lightingRigs.right.scale = 2;
            settings.lightingRigs.left.x = 0;
            settings.lightingRigs.middle.x = 0;
            settings.lightingRigs.right.x = 0;
            settings.backgroundSettings.alpha = 100;
            settings.flashInterval = 10;
            setBlendMode("SUBTRACT", settings);
        },
        calmWithText() {
            settings.rotationEnabled = true;
            settings.sinOffsetEnabled = true;
            settings.sinOffsetMultiplier = 60;
            settings.clock.fake = false;
            settings.clock.speedUp = false;
            settings.clock.displayInBackground = true;
            settings.clock.time.hours.glowColor = "#0A00B8";
            settings.clock.time.minutes.glowColor = "#7209B8";
            settings.clock.time.seconds.glowColor = "#B8128C";
            settings.lightingRigs.left.scale = 1;
            settings.lightingRigs.middle.scale = 1;
            settings.lightingRigs.right.scale = 1;
            settings.lightingRigs.left.x = -400;
            settings.lightingRigs.middle.x = 0;
            settings.lightingRigs.right.x = 400;
            settings.backgroundSettings.enabled = true;
            settings.backgroundSettings.color = "#000000";
            settings.flashInterval = 60;
            setBlendMode("BLEND", settings);
        },
        stageSettingMoody() {
            settings.rotationEnabled = true;
            settings.sinOffsetEnabled = true;
            settings.sinOffsetMultiplier = 30;
            settings.clock.fake = false;
            settings.clock.speedUp = false;
            settings.clock.displayInBackground = false;
            settings.clock.time.hours.glowColor = "#ffbe0b"
            settings.clock.time.minutes.glowColor = "#fb5607"
            settings.clock.time.seconds.glowColor = "#ff006e"
            settings.lightingRigs.left.scale = 1.5;
            settings.lightingRigs.middle.scale = 1.5;
            settings.lightingRigs.right.scale = 1.5;
            settings.lightingRigs.left.x = -400;
            settings.lightingRigs.middle.x = 0;
            settings.lightingRigs.right.x = 400;
            settings.backgroundSettings.enabled = true
            settings.flashInterval = 30;
            setBlendMode("BLEND", settings);
        },
        pauseTheTime() {
            settings.rotationEnabled = true;
            settings.sinOffsetEnabled = true;
            settings.sinOffsetMultiplier = 100;
            settings.clock.fake = true;
            settings.clock.time.hours.value = 12;
            settings.clock.time.minutes.value = 35;
            settings.clock.time.seconds.value = 10;
            settings.clock.speedUp = false;
            settings.clock.displayInBackground = false;
            settings.clock.time.hours.glowColor = "#65736E"
            settings.clock.time.minutes.glowColor = "#5CF2BA"
            settings.clock.time.seconds.glowColor = "#F25C5C"
            settings.backgroundSettings.enabled = true;
            settings.backgroundSettings.alpha = 30;
            settings.backgroundSettings.color = "#000000";
            settings.lightingRigs.left.scale = 1.5;
            settings.lightingRigs.middle.scale = 1.5;
            settings.lightingRigs.right.scale = 1.5;
            settings.lightingRigs.left.x = 0;
            settings.lightingRigs.middle.x = 0;
            settings.lightingRigs.right.x = 0;
            setBlendMode("BURN", settings);
        },
        multipleLayers() {
            settings.sinOffsetEnabled = true;
            settings.sinOffsetMultiplier = 50;
            settings.rotationEnabled = true;
            settings.backgroundSettings.enabled = true;
            settings.backgroundSettings.color = "#cc908a"
            settings.backgroundSettings.alpha = 170;
            settings.clock.time.hours.glowColor = "#38cc7e";
            settings.clock.time.minutes.glowColor = "#7a6246";
            settings.clock.time.seconds.glowColor = "#c3841c";
            settings.clock.fake = false;
            settings.clock.displayInBackground = true;
            settings.clock.speedUp = false;
            settings.lightingRigs.left.scale = 1.115
            settings.lightingRigs.left.x = 215;
            settings.lightingRigs.middle.scale = 0.142;
            settings.lightingRigs.middle.x = -215;
            settings.lightingRigs.right.scale = 1.939;
            settings.lightingRigs.right.x = -80;
            setBlendMode("BLEND", settings);
        },
        surpriseMe() {
            settings.rotationEnabled = Math.random() > 0.5;
            settings.sinOffsetEnabled = Math.random() > 0.5;
            settings.sinOffsetMultiplier = Math.random() * 300;
            settings.clock.fake = false;
            settings.clock.speedUp = Math.random() > 0.5;
            settings.clock.timeFactor = Math.random() * 10000;
            settings.clock.displayInBackground = Math.random() > 0.5;
            settings.clock.time.hours.glowColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            settings.clock.time.minutes.glowColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            settings.clock.time.seconds.glowColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            settings.lightingRigs.left.scale = Math.random() * 2;
            settings.lightingRigs.middle.scale = Math.random() * 2;
            settings.lightingRigs.right.scale = Math.random() * 2;
            settings.lightingRigs.left.x = (Math.random() - 0.5) * 500;
            settings.lightingRigs.middle.x = (Math.random() - 0.5) * 500;
            settings.lightingRigs.right.x = (Math.random() - 0.5) * 500;
            settings.backgroundSettings.enabled = Math.random() > 0.5;
            settings.backgroundSettings.alpha = Math.random() * 255;
            settings.backgroundSettings.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
    },
    demo: {
        toggleDemoMode() {
            settings.demoMode = !settings.demoMode;
            if (settings.demoMode) {
                if (settings.randomDemoMode) {
                    this.toggleRandomDemoMode();
                }
                demoModeButtonController?.name("Disable demo mode");
                demoModeIntervalId = window.setInterval(() => {
                    setNextPreset();
                }, settings.demoModeInterval * 1000);
            } else {
                demoModeButtonController?.name("Enable demo mode");
                window.clearInterval(demoModeIntervalId);
            }
        },
        toggleRandomDemoMode() {
            settings.randomDemoMode = !settings.randomDemoMode;
            if (settings.randomDemoMode) {
                if (settings.demoMode) {
                    this.toggleDemoMode();
                }
                randomDemoModeButtonController?.name("Disable random demo mode");
                demoModeIntervalId = window.setInterval(() => {
                    setNextRandomPreset();
                }, settings.randomDemoModeInterval * 1000);
            } else {
                randomDemoModeButtonController?.name("Enable random demo mode");
                window.clearInterval(demoModeIntervalId);
            }
        }
    }
}

const clockSketch = (sketch: p5) => {
    sketch.preload = () => {
        // Load the font
        rubikMonoOne = sketch.loadFont(rubikMonoOneUrl);
    };
    sketch.setup = function () {
        configureGui();
        sketch.frameRate(60);
        sketch.angleMode(sketch.DEGREES);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = function () {
        applyBlendMode(sketch, settings.blendMode);
        if (settings.backgroundSettings.enabled) {
            let backgroundRgb = hexToRgb(settings.backgroundSettings.color);
            sketch.background(backgroundRgb.red, backgroundRgb.green, backgroundRgb.blue, settings.backgroundSettings.alpha);
        }
        sketch.translate(sketch.width / 2, sketch.height / 2);
        let currentDate = getDateBasedOnSettings(sketch);
        if (settings.clock.displayInBackground) {
            drawBackgroundClock(sketch, currentDate);
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

        let sinOffset = (sketch.sin(sketch.millis() * 0.01) * settings.sinOffsetMultiplier);
        if (!settings.sinOffsetEnabled) {
            sinOffset = 0;
        }

        // draw lighting rig on the left
        sketch.push();
        sketch.scale(settings.lightingRigs.left.scale);
        sketch.translate(
            isPortrait ? settings.lightingRigs.left.x * 0.5 + Math.abs(sinOffset) : settings.lightingRigs.left.x + sinOffset
            , isPortrait ? settings.lightingRigs.left.y - sinOffset : settings.lightingRigs.left.y)
        sketch.rotate(settings.lightingRigs.right.rotation + minutesAngle);
        drawLightingRig(sketch, currentDate);
        sketch.pop();

        // draw lighting rig in the middle
        sketch.push();
        sketch.scale(settings.lightingRigs.middle.scale);
        sketch.translate(settings.lightingRigs.middle.x, settings.lightingRigs.middle.y - sinOffset)
        sketch.rotate(settings.lightingRigs.middle.rotation + hoursAngle);
        drawLightingRig(sketch, currentDate);
        sketch.pop()

        // draw lighting rig on the right
        sketch.push();
        sketch.scale(settings.lightingRigs.right.scale);
        // sketch.translate(settings.lightingRigs.right.x - sinOffset, settings.lightingRigs.right.y)
        sketch.translate(
            isPortrait ? settings.lightingRigs.right.x * 0.5 - Math.abs(sinOffset) : settings.lightingRigs.right.x - sinOffset
            , isPortrait ? settings.lightingRigs.right.y - sinOffset : settings.lightingRigs.right.y)
        sketch.rotate(settings.lightingRigs.right.rotation - minutesAngle);
        drawLightingRig(sketch, currentDate);
        sketch.pop();
    }

    sketch.windowResized = function () {
        isPortrait = window.innerHeight > window.innerWidth;
        console.log(isPortrait);
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
};

const drawBackgroundClock = (sketch: p5, currentDate: Date) => {
    sketch.push();
    sketch.fill(255);
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textFont(rubikMonoOne);
    let textSize = 200;
    if (isPortrait) {
        sketch.translate(0, -150);
        sketch.textSize(textSize);
        // draw time parts separately
        sketch.text(String(currentDate.getHours()).padStart(2, '0'), 0, 0)
        sketch.translate(0, +150);
        sketch.text(String(currentDate.getMinutes()).padStart(2, '0'), 0, 0)
        sketch.translate(0, +150);
        sketch.text(String(currentDate.getSeconds()).padStart(2, '0'), 0, 0)
    }
    else {
        if (sketch.width >= 1920) {
            textSize = 200;
        }
        else if (sketch.width >= 1280) {
            textSize = 150;
        }
        else {
            textSize = 100;
        }
        sketch.textSize(textSize);
        sketch.text(currentDate.toLocaleTimeString(), 0, 0)
    }
    sketch.pop();
}

const getDateBasedOnSettings = (sketch: p5) => {
    if (settings.clock.speedUp) {
        fastTime.setTime(normalTime.getTime() + (sketch.millis() * settings.clock.timeFactor));
    } else {
        normalTime = new Date();
    }
    let currentDate = settings.clock.speedUp ? fastTime : normalTime;
    if (settings.clock.fake) {
        currentDate.setHours(settings.clock.time.hours.value);
        currentDate.setMinutes(settings.clock.time.minutes.value);
        currentDate.setSeconds(settings.clock.time.seconds.value);
        currentDate.setMilliseconds(settings.clock.time.milliseconds);
    }
    return currentDate;
}

const configureGui = () => {
    let customizeSketchGui = new GUI();
    customizeSketchGui.title("Settings & Presets");
    customizeSketchGui.open(false);

    const presetsGui = customizeSketchGui.addFolder('Presets');
    presetsGui.add(actions.presets, 'haveFun').name('Speed me up');
    presetsGui.add(actions.presets, 'hypnotize').name('Hypnotize me slowly');
    presetsGui.add(actions.presets, 'calmWithText').name('I want to read the time');
    presetsGui.add(actions.presets, 'stageSettingMoody').name("I'm in the mood for flowers");
    presetsGui.add(actions.presets, 'pauseTheTime').name("Pause the time please.");
    presetsGui.add(actions.presets, 'multipleLayers').name("Lay all your layers on me");
    presetsGui.add(actions.presets, 'surpriseMe').name("Surprise me");

    const demoModeGui = presetsGui.addFolder('Demo Mode');
    demoModeGui.open(false);
    demoModeButtonController = demoModeGui.add(actions.demo, 'toggleDemoMode').name("Enable demo mode").listen();
    demoModeGui.add(settings, 'demoModeInterval', 1, 60, 1).name("Demo interval").listen();
    randomDemoModeButtonController = demoModeGui.add(actions.demo, 'toggleRandomDemoMode').name("Enable random demo mode").listen();
    demoModeGui.add(settings, 'randomDemoModeInterval', 1, 60, 1).name("Random interval").listen();

    const settingsGui = customizeSketchGui.addFolder('Settings');
    settingsGui.open(false);
    settingsGui.add(settings, 'sinOffsetEnabled').name("Enable lighting rig offset based on sin").listen();
    settingsGui.add(settings, 'sinOffsetMultiplier', 0, 300, 1).min(0).max(300).step(1).name("Multiply sin value by").listen();
    settingsGui.add(settings, 'rotationEnabled').name("Enable rotation").listen();
    settingsGui.add(settings, 'blendMode', blendModeOptions).name("Blend mode").onChange((value: blendModes) => {
        setBlendMode(value, settings);
    });
    settingsGui.add(settings, 'flashInterval').min(0).max(60).step(1).name("Flash interval in seconds").listen();

    const backgroundGui = settingsGui.addFolder('Background');
    backgroundGui.open(false);
    backgroundGui.add(settings.backgroundSettings, 'enabled').listen();
    backgroundGui.addColor(settings.backgroundSettings, 'color').listen();
    backgroundGui.add(settings.backgroundSettings, 'alpha', 0, 255, 1).listen();

    const clockGui = settingsGui.addFolder('Clock')
    clockGui.open(false);
    clockGui.add(settings.clock, 'speedUp').name("Speed up time").listen();
    clockGui.add(settings.clock, 'timeFactor', 1, 10000, 1).name("Speed up by factor").listen();

    const timePartsGui = clockGui.addFolder('Time Parts');
    timePartsGui.add(settings.clock, 'fake').name('Enable fake values').listen();
    timePartsGui.add(settings.clock.time.hours, 'value').min(0).max(24).step(1).name('Hour').listen();
    timePartsGui.addColor(settings.clock.time.hours, 'glowColor').name("Hour glow color").listen();
    timePartsGui.add(settings.clock.time.minutes, 'value').min(0).max(60).step(1).name('Minute').listen();
    timePartsGui.addColor(settings.clock.time.minutes, 'glowColor').name("Minute glow color").listen();
    timePartsGui.add(settings.clock.time.seconds, 'value').min(0).max(60).step(1).name('Second').listen();
    timePartsGui.addColor(settings.clock.time.seconds, 'glowColor').name("Second glow color").listen();
    timePartsGui.add(settings.clock.time, 'milliseconds', 0, 1000, 1).listen();
    timePartsGui.add(settings.clock, 'displayInBackground').name("Display clock in background").listen();

    const lightingRigLeftGui = settingsGui.addFolder('Lighting Rig Left');
    lightingRigLeftGui.open(false);
    lightingRigLeftGui.add(settings.lightingRigs.left, 'x', -1000, 1000, 10).listen();
    lightingRigLeftGui.add(settings.lightingRigs.left, 'y', -1000, 1000, 10).listen();
    lightingRigLeftGui.add(settings.lightingRigs.left, 'rotation', 0, 360, 10).listen();
    lightingRigLeftGui.add(settings.lightingRigs.left, 'scale', 0, 1, 0.01).listen();

    const lightingRigMiddleGui = settingsGui.addFolder('Lighting Rig Middle');
    lightingRigMiddleGui.open(false);
    lightingRigMiddleGui.add(settings.lightingRigs.middle, 'x', -1000, 1000, 10).listen();
    lightingRigMiddleGui.add(settings.lightingRigs.middle, 'y', -1000, 1000, 10).listen();
    lightingRigMiddleGui.add(settings.lightingRigs.middle, 'rotation', 0, 360, 10).listen();
    lightingRigMiddleGui.add(settings.lightingRigs.middle, 'scale', 0, 1, 0.01).listen();

    const lightingRigRightGui = settingsGui.addFolder('Lighting Rig Right');
    lightingRigRightGui.open(false);
    lightingRigRightGui.add(settings.lightingRigs.right, 'x', -1000, 1000, 10).listen();
    lightingRigRightGui.add(settings.lightingRigs.right, 'y', -1000, 1000, 10).listen();
    lightingRigRightGui.add(settings.lightingRigs.right, 'rotation', 0, 360, 10).listen();
    lightingRigRightGui.add(settings.lightingRigs.right, 'scale', 0, 1, 0.01).listen();
}

new p5(clockSketch);