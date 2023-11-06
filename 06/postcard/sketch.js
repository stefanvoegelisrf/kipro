import { GUI } from './lil-gui.esm.min.js';
export default function sketch(p5) {
    let initialEyeRadius = 80;
    let initialPupilRadius = 10;
    let initialWingRadius = 40;
    let initialTipRadius = 60;
    let settings = {
        righteye: {
            startAngle: 0,
            endAngle: 360,
            radius: initialEyeRadius,
            points: 50,
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
            points: 50,
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
            points: 10,
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
            points: 10,
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
            points: 10,
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
            points: 10,
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
            points: 10,
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
            points: 40,
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
            }
        }
        for (let key in settings) {
            let keyGui = customizeSketchGui.addFolder(key);
            keyGui.open(false);
            keyGui.add(settings[key], 'startAngle', 0, 360);
            keyGui.add(settings[key], 'endAngle', 0, 360);
            keyGui.add(settings[key], 'radius', 0, 300);
            keyGui.add(settings[key], 'points', 0, 100).step(1);
            const strokeGui = keyGui.addFolder('Stroke');
            strokeGui.open(false);
            strokeGui.addColor(settings[key].stroke, 'color');
            strokeGui.add(settings[key].stroke, 'weight', 0, 20);
            const randomGui = strokeGui.addFolder('Random');
            randomGui.open(false);
            randomGui.add(settings[key].stroke, 'randomize');
            randomGui.add(settings[key].stroke.random, 'min', 0, 50);
            randomGui.add(settings[key].stroke.random, 'max', 0, 50);
            const offsetGui = keyGui.addFolder('Offset');
            offsetGui.open(false);
            offsetGui.add(settings[key].offset, 'x', -300, 300);
            offsetGui.add(settings[key].offset, 'y', -300, 300);
        }
        customizeSketchGui.add(actions, 'savePreset').name('Save to clipboard');
        customizeSketchGui.add(actions, 'loadPreset').name('Load from clipboard');
        customizeSketchGui.open(false);
        p5.angleMode(p5.DEGREES);
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(220);
    }

    p5.draw = function () {
        p5.background(255)
        for (let key in settings) {
            settings[key].pointArray = calculatePointsOfEllipse(settings[key].points, settings[key].radius, settings[key].startAngle, settings[key].endAngle);
            p5.push();
            p5.stroke(settings[key].stroke.color);
            p5.translate(p5.width * 0.5 + settings[key].offset.x, p5.height * 0.5 + settings[key].offset.y);
            for (let point of settings[key].pointArray) {
                p5.strokeWeight(settings[key].stroke.randomize ? p5.random(settings[key].stroke.random.min, settings[key].stroke.random.max) : settings[key].stroke.weight);
                p5.point(point.x, point.y);
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

