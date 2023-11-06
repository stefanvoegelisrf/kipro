import { GUI } from './lil-gui.esm.min.js';
export default function sketch(p5) {
    let initialEyeRadius = 80;
    let initialPupilRadius = 10;
    let initialWingRadius = 40;
    let initialTipRadius = 60;
    let settings = {
        faceparts: {
            righteye: {
                startAngle: 0,
                endAngle: 360,
                radius: initialEyeRadius,
                pointAmount: 50,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 5,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: initialEyeRadius * 1.5,
                    y: -100
                }
            },
            lefteye: {
                startAngle: 0,
                endAngle: 360,
                radius: initialEyeRadius,
                pointAmount: 50,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 5,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: -initialEyeRadius * 1.5,
                    y: -100
                }
            },
            rightpupil: {
                startAngle: 0,
                endAngle: 360,
                radius: initialPupilRadius,
                pointAmount: 10,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 15,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: initialEyeRadius * 1.5,
                    y: -100
                }
            },
            leftpupil: {
                startAngle: 0,
                endAngle: 360,
                radius: initialPupilRadius,
                pointAmount: 10,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 15,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: -initialEyeRadius * 1.5,
                    y: -100
                }
            },
            nosewingleft: {
                startAngle: 0,
                endAngle: 150,
                radius: initialWingRadius,
                pointAmount: 10,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 5,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: initialWingRadius * 2,
                    y: 0
                }
            },
            nosewingright: {
                startAngle: 30,
                endAngle: 180,
                radius: initialWingRadius,
                pointAmount: 10,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 5,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: -initialWingRadius * 2,
                    y: 0
                }
            },
            nosetip: {
                startAngle: 0,
                endAngle: 180,
                radius: initialTipRadius,
                pointAmount: 10,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 5,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: 0,
                    y: initialTipRadius * 0.5
                }
            },
            mouth: {
                startAngle: 45,
                endAngle: 135,
                radius: 300,
                pointAmount: 40,
                pointArray: [],
                stroke: {
                    color: '#000000',
                    weight: 5,
                    randomize: false,
                    random: {
                        min: 0,
                        max: 50
                    }
                },
                offset: {
                    x: 0,
                    y: -100
                }
            },
        },
        background: {
            color: '#FFFFFF',
            randomize: false,
        },
        useLines: false,
        loop: true,
    }

    const randomHexColor = () => {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }

    const randomizeSubsetting = (subsetting) => {
        for (let settingsKey in subsetting) {
            if (typeof subsetting[settingsKey] === 'object') {
                randomizeSubsetting(subsetting[settingsKey]);
            }
            else if (typeof subsetting[settingsKey] === 'number') {
                let lowercaseSettingsKey = settingsKey.toLowerCase();
                // Check if settingsKey ends with amount
                if (lowercaseSettingsKey.endsWith('amount')) {
                    subsetting[settingsKey] = p5.random(0, 100);
                    continue;
                }
                // Check if settingsKey ends with radius
                if (lowercaseSettingsKey.endsWith('radius')) {
                    subsetting[settingsKey] = p5.random(0, 300);
                    continue;
                }
                // Check if settingsKey ends with weight
                if (lowercaseSettingsKey.endsWith('weight')) {
                    subsetting[settingsKey] = p5.random(0, 20);
                    continue;
                }
                // Check if settingsKey ends with angle
                if (lowercaseSettingsKey.endsWith('angle')) {
                    subsetting[settingsKey] = p5.random(0, 360);
                    continue;
                }
                // Check if settingsKey ends with x
                if (lowercaseSettingsKey.endsWith('x')) {
                    subsetting[settingsKey] = p5.random(-300, 300);
                    continue;
                }
                // Check if settingsKey ends with y
                if (lowercaseSettingsKey.endsWith('y')) {
                    subsetting[settingsKey] = p5.random(-300, 300);
                    continue;
                }
            }
            else if (typeof subsetting[settingsKey] === 'string') {
                subsetting[settingsKey] = randomHexColor();
            }
            else if (typeof subsetting[settingsKey] === 'boolean') {
                subsetting[settingsKey] = p5.random(0, 1) > 0.5;
            }
        }
    }

    p5.setup = function () {
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
                    randomizeSubsetting(settings.faceparts[key]);
                }
            },
            randomizeLeftEye() {
                randomizeSubsetting(settings.faceparts.lefteye);
            },
            randomizeRightEye() {
                randomizeSubsetting(settings.faceparts.righteye);
            },
            randomizeLeftPupil() {
                randomizeSubsetting(settings.faceparts.leftpupil);
            },
            randomizeRightPupil() {
                randomizeSubsetting(settings.faceparts.rightpupil);
            },
            randomizeNoseWingLeft() {
                randomizeSubsetting(settings.faceparts.nosewingleft);
            },
            randomizeNoseWingRight() {
                randomizeSubsetting(settings.faceparts.nosewingright);
            },
            randomizeNoseTip() {
                randomizeSubsetting(settings.faceparts.nosetip);
            },
            randomizeMouth() {
                randomizeSubsetting(settings.faceparts.mouth);
            },
        };
        customizeSketchGui.add(settings, 'useLines').name('Use lines to connect points');
        customizeSketchGui.add(settings, 'loop').name('Loop sketch').onChange(function (value) {
            if (value) {
                p5.loop();
            } else {
                p5.noLoop();
            }
        });
        const backgroundGui = customizeSketchGui.addFolder('Background');
        backgroundGui.open(false);
        backgroundGui.addColor(settings.background, 'color');
        const backgroundRandomFolder = backgroundGui.addFolder('Random');
        backgroundRandomFolder.open(false);
        backgroundRandomFolder.add(settings.background, 'randomize');

        const facepartsFolder = customizeSketchGui.addFolder('Face parts');
        facepartsFolder.open(false);
        for (let key in settings.faceparts) {
            let facepartKeyFolder = facepartsFolder.addFolder(key);
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
            strokeRandomFolder.add(settings.faceparts[key].stroke, 'randomize');
            strokeRandomFolder.add(settings.faceparts[key].stroke.random, 'min', 0, 50);
            strokeRandomFolder.add(settings.faceparts[key].stroke.random, 'max', 0, 50);
            const offsetGui = facepartKeyFolder.addFolder('Offset');
            offsetGui.open(false);
            offsetGui.add(settings.faceparts[key].offset, 'x', -300, 300);
            offsetGui.add(settings.faceparts[key].offset, 'y', -300, 300);
        }
        customizeSketchGui.add(actions, 'savePreset').name('Save to clipboard');
        customizeSketchGui.add(actions, 'loadPreset').name('Load from clipboard');
        const randomFolder = customizeSketchGui.addFolder('Random');
        randomFolder.open(false);
        randomFolder.add(actions, 'randomizeSettings').name('Randomize all settings');
        randomFolder.add(actions, 'randomizeLeftEye').name('Randomize left eye');
        randomFolder.add(actions, 'randomizeRightEye').name('Randomize right eye');
        randomFolder.add(actions, 'randomizeLeftPupil').name('Randomize left pupil');
        randomFolder.add(actions, 'randomizeRightPupil').name('Randomize right pupil');
        randomFolder.add(actions, 'randomizeNoseWingLeft').name('Randomize nose wing left');
        randomFolder.add(actions, 'randomizeNoseWingRight').name('Randomize nose wing right');
        randomFolder.add(actions, 'randomizeNoseTip').name('Randomize nose tip');
        randomFolder.add(actions, 'randomizeMouth').name('Randomize mouth');
        customizeSketchGui.open(false);

        p5.angleMode(p5.DEGREES);
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(220);
    }

    p5.draw = function () {
        p5.background(settings.background.randomize ? randomHexColor() : settings.background.color)
        for (let key in settings.faceparts) {
            settings.faceparts[key].pointArray = calculatePointsOfEllipse(settings.faceparts[key].pointAmount, settings.faceparts[key].radius, settings.faceparts[key].startAngle, settings.faceparts[key].endAngle);
            p5.push();
            p5.stroke(settings.faceparts[key].stroke.color);
            p5.translate(p5.width * 0.5 + settings.faceparts[key].offset.x, p5.height * 0.5 + settings.faceparts[key].offset.y);
            // Function to shuffle an array
            function shuffleArray(array) {
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

                // If the number of points is odd, remove the last point and store it
                let lastPoint = null;
                if (points.length % 2 !== 0) {
                    lastPoint = points.pop();
                }

                // Draw lines between pairs of points
                for (let i = 0; i < points.length; i += 2) {
                    let point1 = points[i];
                    let point2 = points[i + 1];
                    p5.strokeWeight(settings.faceparts[key].stroke.randomize ? p5.random(settings.faceparts[key].stroke.random.min, settings.faceparts[key].stroke.random.max) : settings.faceparts[key].stroke.weight);
                    p5.line(point1.x, point1.y, point2.x, point2.y);
                }

                // If there was an odd number of points, draw a point for the last one
                if (lastPoint) {
                    p5.point(lastPoint.x, lastPoint.y);
                }
            } else {
                // Existing code to draw points
                for (let point of settings.faceparts[key].pointArray) {
                    p5.strokeWeight(settings.faceparts[key].stroke.randomize ? p5.random(settings.faceparts[key].stroke.random.min, settings.faceparts[key].stroke.random.max) : settings.faceparts[key].stroke.weight);
                    p5.point(point.x, point.y);
                }
            }
            p5.pop();
        }
    }

    p5.windowResized = function () {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    // Calculate points for an ellipse based on the amount of points and the radius
    function calculatePointsOfEllipse(amountOfPoints, ellipseRadius, startAngle, endAngle) {
        let points = [];
        let angleIncrement = (endAngle - startAngle) / (amountOfPoints - 1);
        for (let i = 0; i < amountOfPoints; i++) {
            let currentAngle = startAngle + i * angleIncrement;
            points.push({
                x: p5.cos(currentAngle) * ellipseRadius,
                y: p5.sin(currentAngle) * ellipseRadius
            });
        }
        return points;
    }
};

