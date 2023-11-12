import { Coordinates, FacePart, FaceSettings } from './customtypes.js';
import { GUI } from 'lil-gui';
import p5 from 'p5';
import * as settingsTemplate from './settings.json';

const sketch = (sketch: p5) => {
    let settings: FaceSettings = { ...settingsTemplate };
    const randomHexColor = () => {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return { r, g, b };
    }

    const randomizeFacePart = (facePart: FacePart) => {
        const angleMin = 0;
        const angleMax = 360;
        facePart.startAngle = sketch.random(angleMin, angleMax);
        facePart.endAngle = sketch.random(angleMin, angleMax);
        facePart.radius = sketch.random(0, 300);
        facePart.pointAmount = sketch.random(0, 100);
        let randomizeStrokeWeight = sketch.random(0, 1) > 0.5;
        let useNoise = randomizeStrokeWeight && sketch.random(0, 1) > 0.5;
        if (useNoise) randomizeStrokeWeight = false;
        facePart.stroke = {
            color: randomHexColor(),
            transparency: sketch.random(0, 255),
            weight: sketch.random(0, 20),
            random: {
                randomize: randomizeStrokeWeight,
                min: 0,
                max: 50
            },
            noise: {
                useNoise: useNoise,
                amount: sketch.random(0, 100),
                speed: sketch.random(0.0001, 0.1),
                offset: sketch.random(0, 9999)
            }
        };
        facePart.offset = {
            coordinates: {
                x: sketch.random(-300, 300),
                y: sketch.random(-300, 300)
            },
            random: {
                randomize: sketch.random(0, 1) > 0.5,
                min: 0,
                max: 50
            },
            noise: {
                useNoise: sketch.random(0, 1) > 0.5,
                amount: sketch.random(0, 100),
                speed: sketch.random(0.0001, 0.1),
                offset: sketch.random(0, 9999)
            }
        }
    }

    sketch.setup = function () {
        let customizeSketchGui = new GUI();
        let actions = {
            savePreset() {
                const preset = customizeSketchGui.save();
                console.log();
                let presetAsString = JSON.stringify(preset);
                navigator.clipboard.writeText(presetAsString)
            },
            loadPreset() {
                navigator.clipboard.readText().then(clipText => {
                    let preset = JSON.parse(clipText);
                    customizeSketchGui.load(preset);
                });
            },
            randomizeSettings() {
                for (let key in settings.faceparts) {
                    randomizeFacePart(settings.faceparts[key]);
                }
            },
            randomizeLeftIris() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'leftiris')!);
            },
            randomizeRightIris() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'rightiris')!);
            },
            randomizeLeftPupil() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'leftpupil')!);
            },
            randomizeRightPupil() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'rightpupil')!);
            },
            randomizeNoseWingLeft() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'nosewingleft')!);
            },
            randomizeNoseWingRight() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'nosewingright')!);
            },
            randomizeNoseTip() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'nosetip')!);
            },
            randomizeMouth() {
                randomizeFacePart(settings.faceparts.find(f => f.name === 'mouth')!);
            },
        };
        customizeSketchGui.add(settings, 'useLines').name('Use lines to connect points');
        customizeSketchGui.add(settings, 'loop').name('Loop sketch').onChange(function (value: boolean) {
            if (value) {
                sketch.loop();
            } else {
                sketch.noLoop();
            }
        });
        customizeSketchGui.add(settings, 'frameRate', 1, 60).step(1).name('Framerate').onChange(function (value: number) {
            sketch.frameRate(value);
        });
        const backgroundFolder = customizeSketchGui.addFolder('Background');
        backgroundFolder.open(false);
        backgroundFolder.addColor(settings.background, 'color');
        backgroundFolder.add(settings.background, 'transparency', 0, 255).step(1)
        backgroundFolder.add(settings.background, 'enabled');
        const backgroundRandomFolder = backgroundFolder.addFolder('Random');
        backgroundRandomFolder.open(false);
        backgroundRandomFolder.add(settings.background, 'randomize');

        const facepartsFolder = customizeSketchGui.addFolder('Face parts');
        facepartsFolder.open(false);
        for (let key in settings.faceparts) {
            let facepartKeyFolder = facepartsFolder.addFolder(settings.faceparts[key].name);
            facepartKeyFolder.open(false);
            facepartKeyFolder.add(settings.faceparts[key], 'startAngle', 0, 360);
            facepartKeyFolder.add(settings.faceparts[key], 'endAngle', 0, 360);
            facepartKeyFolder.add(settings.faceparts[key], 'radius', 0, 300);
            facepartKeyFolder.add(settings.faceparts[key], 'pointAmount', 0, 100).step(1);
            const strokeFolder = facepartKeyFolder.addFolder('Stroke');
            strokeFolder.open(false);
            strokeFolder.addColor(settings.faceparts[key].stroke, 'color');
            strokeFolder.add(settings.faceparts[key].stroke, 'weight', 0, 20);
            const strokeRandomFolder = strokeFolder.addFolder('Random');
            strokeRandomFolder.open(false);
            strokeRandomFolder.add(settings.faceparts[key].stroke.random, 'randomize').listen().onChange((value: boolean) => { if (settings.faceparts[key].stroke.noise.useNoise) { settings.faceparts[key].stroke.noise.useNoise = !value } });;
            strokeRandomFolder.add(settings.faceparts[key].stroke.random, 'min', 0, 50);
            strokeRandomFolder.add(settings.faceparts[key].stroke.random, 'max', 0, 50);
            const strokeNoiseFolder = strokeFolder.addFolder('Noise');
            strokeNoiseFolder.open(false);
            strokeNoiseFolder.add(settings.faceparts[key].stroke.noise, 'useNoise').listen().onChange((value: boolean) => { if (settings.faceparts[key].stroke.random.randomize) { settings.faceparts[key].stroke.random.randomize = !value } });
            strokeNoiseFolder.add(settings.faceparts[key].stroke.noise, 'amount', 0, 100);
            strokeNoiseFolder.add(settings.faceparts[key].stroke.noise, 'speed', 0.00001, 0.1);
            strokeNoiseFolder.add(settings.faceparts[key].stroke.noise, 'offset', 0, 9999);
            const offsetGui = facepartKeyFolder.addFolder('Offset');
            offsetGui.open(false);
            offsetGui.add(settings.faceparts[key].offset.coordinates, 'x', -300, 300);
            offsetGui.add(settings.faceparts[key].offset.coordinates, 'y', -300, 300);
            const offsetRandomFolder = offsetGui.addFolder('Random');
            offsetRandomFolder.open(false);
            offsetRandomFolder.add(settings.faceparts[key].offset.random, 'randomize').listen().onChange((value: boolean) => { if (settings.faceparts[key].offset.noise.useNoise) { settings.faceparts[key].offset.noise.useNoise = !value } });;
            offsetRandomFolder.add(settings.faceparts[key].offset.random, 'min', 0, 50);
            offsetRandomFolder.add(settings.faceparts[key].offset.random, 'max', 0, 50);
            const offsetNoiseFolder = offsetGui.addFolder('Noise');
            offsetNoiseFolder.open(false);
            offsetNoiseFolder.add(settings.faceparts[key].offset.noise, 'useNoise').listen().onChange((value: boolean) => { if (settings.faceparts[key].offset.random.randomize) { settings.faceparts[key].offset.random.randomize = !value } });
            offsetNoiseFolder.add(settings.faceparts[key].offset.noise, 'amount', 0, 100);
            offsetNoiseFolder.add(settings.faceparts[key].offset.noise, 'speed', 0.00001, 0.1);
            offsetNoiseFolder.add(settings.faceparts[key].offset.noise, 'offset', 0, 9999);

        }
        customizeSketchGui.add(actions, 'savePreset').name('Save to clipboard');
        customizeSketchGui.add(actions, 'loadPreset').name('Load from clipboard');
        const randomFolder = customizeSketchGui.addFolder('Random');
        randomFolder.open(false);
        randomFolder.add(actions, 'randomizeSettings').name('Randomize all settings');
        randomFolder.add(actions, 'randomizeLeftIris').name('Randomize left iris');
        randomFolder.add(actions, 'randomizeRightIris').name('Randomize right iris');
        randomFolder.add(actions, 'randomizeLeftPupil').name('Randomize left pupil');
        randomFolder.add(actions, 'randomizeRightPupil').name('Randomize right pupil');
        randomFolder.add(actions, 'randomizeNoseWingLeft').name('Randomize nose wing left');
        randomFolder.add(actions, 'randomizeNoseWingRight').name('Randomize nose wing right');
        randomFolder.add(actions, 'randomizeNoseTip').name('Randomize nose tip');
        randomFolder.add(actions, 'randomizeMouth').name('Randomize mouth');
        customizeSketchGui.open(false);

        sketch.angleMode(sketch.DEGREES);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.background(settings.background.color);
    }

    sketch.draw = function () {
        if (settings.background.enabled) {
            let bgColor = hexToRgb(settings.background.randomize ? randomHexColor() : settings.background.color);
            sketch.background(bgColor.r, bgColor.g, bgColor.b, settings.background.transparency);
        }
        sketch.push();
        sketch.translate(sketch.width * 0.5, sketch.height * 0.5);
        for (let i = 0; i < settings.face.pointAmount; i++) {
            let sizeSpeed = 0.0001;
            let positionSpeed = 0.0001;
            let colorSpeed = 0.0001;
            let size = sketch.noise(i * 0.1 + sketch.millis() * sizeSpeed) * 300;
            let x = (sketch.noise(i + sketch.millis() * positionSpeed) - 0.5) * sketch.width * 0.8;
            let y = (sketch.noise(i * 10 + sketch.millis() * positionSpeed) - 0.5) * sketch.width * 0.8;
            let r = sketch.noise(i * 20 + sketch.millis() * colorSpeed) * 150;
            let g = sketch.noise(i * 30 + sketch.millis() * colorSpeed) * 0;
            let b = sketch.noise(i * 40 + sketch.millis() * colorSpeed) * 150;
            let a = sketch.noise(i * 50 + sketch.millis() * colorSpeed) * 50;
            sketch.fill(r, g, b, a);
            sketch.noStroke()
            sketch.ellipse(x, y, size, size);
        }
        sketch.pop();
        for (let key in settings.faceparts) {
            settings.faceparts[key].pointArray = calculatePointsOfEllipse(settings.faceparts[key].pointAmount, settings.faceparts[key].radius, settings.faceparts[key].startAngle, settings.faceparts[key].endAngle);
            sketch.push();


            sketch.translate(sketch.width * 0.5 + settings.faceparts[key].offset.coordinates.x, sketch.height * 0.5 + settings.faceparts[key].offset.coordinates.y);
            // Function to shuffle an array
            function shuffleArray(array: Coordinates[]) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
                }
            }



            // Main drawing code
            if (settings.useLines) {
                // Shuffle the points array to create random pairs
                let points = [...settings.faceparts[key].pointArray]; // Clone the array
                shuffleArray(points);

                // If the number of points is odd, remove the last point
                let lastPoint = null;
                if (points.length % 2 !== 0) {
                    lastPoint = points.pop();
                }

                // Draw lines between pairs of points
                for (let i = 0; i < points.length; i += 2) {
                    let point1 = points[i];
                    let point2 = points[i + 1];
                    // let strokeColor = hexToRgb(settings.faceparts[key].stroke.color);
                    setStrokeColor(point1.x, point1.y, settings.faceparts[key].stroke.transparency);
                    setStrokeWeight(
                        sketch,
                        settings.faceparts[key].stroke.weight,
                        settings.faceparts[key].stroke.random.randomize,
                        settings.faceparts[key].stroke.random.min,
                        settings.faceparts[key].stroke.random.max,
                        settings.faceparts[key].stroke.noise.useNoise,
                        settings.faceparts[key].stroke.noise.amount,
                        settings.faceparts[key].stroke.noise.speed,
                        settings.faceparts[key].stroke.noise.offset
                    );
                    setOffset(
                        sketch,
                        settings.faceparts[key].offset.coordinates,
                        settings.faceparts[key].offset.random.randomize,
                        settings.faceparts[key].offset.random.min,
                        settings.faceparts[key].offset.random.max,
                        settings.faceparts[key].offset.noise.useNoise,
                        settings.faceparts[key].offset.noise.amount,
                        settings.faceparts[key].offset.noise.speed,
                        settings.faceparts[key].offset.noise.offset,
                        point1.x,
                        point1.y
                    );
                    sketch.line(point1.x, point1.y, point2.x, point2.y);
                }

                // If there was an odd number of points, draw a point for the last one
                if (lastPoint) {
                    sketch.point(lastPoint.x, lastPoint.y);
                }
            } else {
                // Existing code to draw points
                for (let point of settings.faceparts[key].pointArray) {
                    // let strokeColor = hexToRgb(settings.faceparts[key].stroke.color);
                    setStrokeColor(point.x, point.y, settings.faceparts[key].stroke.transparency);
                    setStrokeWeight(
                        sketch,
                        settings.faceparts[key].stroke.weight,
                        settings.faceparts[key].stroke.random.randomize,
                        settings.faceparts[key].stroke.random.min,
                        settings.faceparts[key].stroke.random.max,
                        settings.faceparts[key].stroke.noise.useNoise,
                        settings.faceparts[key].stroke.noise.amount,
                        settings.faceparts[key].stroke.noise.speed,
                        settings.faceparts[key].stroke.noise.offset + (point.x * point.y)
                    );
                    sketch.push();
                    setOffset(
                        sketch,
                        settings.faceparts[key].offset.coordinates,
                        settings.faceparts[key].offset.random.randomize,
                        settings.faceparts[key].offset.random.min,
                        settings.faceparts[key].offset.random.max,
                        settings.faceparts[key].offset.noise.useNoise,
                        settings.faceparts[key].offset.noise.amount,
                        settings.faceparts[key].offset.noise.speed,
                        settings.faceparts[key].offset.noise.offset,
                        point.x,
                        point.y
                    );
                    sketch.point(point.x, point.y);
                    sketch.pop();
                }
            }
            sketch.pop();
        }
    }

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    function setStrokeWeight(sketch: p5, weight: number, randomize: boolean, min: number, max: number, useNoise: boolean, amount: number, speed: number, noiseOffset: number) {
        if (useNoise) {
            weight = sketch.noise((weight + sketch.millis() + noiseOffset) * speed) * amount;
        }
        else if (randomize) {
            weight = sketch.random(min, max);
        }
        sketch.strokeWeight(weight);
    }

    function setStrokeColor(x: number, y: number, transparency: number) {
        x += 2;
        y += 2;
        let strokeColor = {
            r: sketch.noise(x * 10, sketch.millis() * 0.0001) * 255,
            g: sketch.noise(y * 20, sketch.millis() * 0.0002) * 150,
            b: sketch.noise(x * y, sketch.millis() * 0.0003) * 255
        }
        sketch.stroke(strokeColor.r, strokeColor.g, strokeColor.b, transparency);
    }

    function setOffset(sketch: p5, offset: Coordinates, randomize: boolean, min: number, max: number, useNoise: boolean, amount: number, speed: number, noiseOffset: number, x: number, y: number) {
        x += 2;
        y += 2;
        let translateOffset = {
            x: 0,
            y: 0
        }
        if (useNoise) {
            translateOffset = {
                x: (sketch.noise((noiseOffset * 10 + sketch.millis() + (x * y * 0.5)) * speed) - 0.5) * amount,
                y: (sketch.noise((noiseOffset + sketch.millis() + (x * y * 0.5)) * speed) - 0.5) * amount
            }

        }
        else if (randomize) {
            translateOffset = {
                x: offset.x + sketch.random(min, max),
                y: offset.y + sketch.random(min, max)
            }
        }
        sketch.translate(translateOffset.x, translateOffset.y);
    }

    // Calculate points for an ellipse based on the amount of points and the radius
    function calculatePointsOfEllipse(amountOfPoints: number, ellipseRadius: number, startAngle: number, endAngle: number) {
        let points: Coordinates[] = [];
        let angleIncrement = (endAngle - startAngle) / (amountOfPoints - 1);
        for (let i = 0; i < amountOfPoints; i++) {
            let currentAngle = startAngle + i * angleIncrement;
            points.push({
                x: sketch.cos(currentAngle) * ellipseRadius,
                y: sketch.sin(currentAngle) * ellipseRadius
            });
        }
        return points;
    }
};



new p5(sketch);