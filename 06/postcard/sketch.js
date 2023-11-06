import { GUI } from './lil-gui.esm.min.js';
export default function sketch(p5) {
    let initialEyeRadius = 80;
    let initialWingRadius = 40;
    let initialTipRadius = 60;
    let settings = {
        eyes: {
            radius: initialEyeRadius,
            points: 50,
            color: '#000000',
            strokeWeight: 5,
            offset: initialEyeRadius * 1.5
        },
        nose: {
            wing: {
                radius: initialWingRadius,
                points: 10,
                color: '#000000',
                strokeWeight: 5,
                offset: initialWingRadius * 2
            },
            tip: {
                radius: initialTipRadius,
                points: 10,
                color: '#000000',
                strokeWeight: 5,
                offset: initialTipRadius * 0.5
            }
        },
        mouth: {
            radius: 200,
            points: 40,
            color: '#000000',
            strokeWeight: 5,
            offset: 0
        }
    }
    let pointsForEye = [];
    let pointsForLeftNoseWing = [];
    let pointsForRightNoseWing = [];
    let pointsForNoseTip = [];
    let pointsForMouth = [];
    p5.setup = function () {
        let customizeSketchGui = new GUI();
        const eyeFolder = customizeSketchGui.addFolder('Eyes');
        eyeFolder.add(settings.eyes, 'radius', 0, 200);
        eyeFolder.add(settings.eyes, 'points', 0, 100).step(1);
        eyeFolder.add(settings.eyes, 'strokeWeight', 0, 50);
        eyeFolder.add(settings.eyes, 'offset', 0, 300);
        eyeFolder.addColor(settings.eyes, 'color');
        const noseFolder = customizeSketchGui.addFolder('Nose');
        const wingFolder = noseFolder.addFolder('Wing');
        wingFolder.add(settings.nose.wing, 'radius', 0, 100);
        wingFolder.add(settings.nose.wing, 'points', 0, 100).step(1);
        wingFolder.add(settings.nose.wing, 'strokeWeight', 0, 50);
        wingFolder.add(settings.nose.wing, 'offset', -100, 300);
        wingFolder.addColor(settings.nose.wing, 'color');
        const tipFolder = noseFolder.addFolder('Tip');
        tipFolder.add(settings.nose.tip, 'radius', 0, 100);
        tipFolder.add(settings.nose.tip, 'points', 0, 100).step(1);
        tipFolder.add(settings.nose.tip, 'strokeWeight', 0, 50);
        tipFolder.add(settings.nose.tip, 'offset', -100, 200);
        tipFolder.addColor(settings.nose.tip, 'color');
        const mouthFolder = customizeSketchGui.addFolder('Mouth');
        mouthFolder.add(settings.mouth, 'radius', 0, 300);
        mouthFolder.add(settings.mouth, 'points', 0, 100).step(1);
        mouthFolder.add(settings.mouth, 'strokeWeight', 0, 50);
        mouthFolder.add(settings.mouth, 'offset', -200, 300);
        mouthFolder.addColor(settings.mouth, 'color');
        customizeSketchGui.open(false);
        p5.angleMode(p5.DEGREES);
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(220);
    }

    p5.draw = function () {
        pointsForEye = calculatePointsOfEllipse(settings.eyes.points, settings.eyes.radius, 0, 360);
        pointsForRightNoseWing = calculatePointsOfEllipse(settings.nose.wing.points, settings.nose.wing.radius, 0, 150)
        pointsForLeftNoseWing = calculatePointsOfEllipse(settings.nose.wing.points, settings.nose.wing.radius, 30, 180)
        pointsForNoseTip = calculatePointsOfEllipse(settings.nose.tip.points, settings.nose.tip.radius, 0, 180)
        pointsForMouth = calculatePointsOfEllipse(settings.mouth.points, settings.mouth.radius, 0, 180)
        p5.background(255)
        // Left eye
        p5.push();
        p5.stroke(settings.eyes.color);
        p5.strokeWeight(settings.eyes.strokeWeight);
        p5.translate(p5.width * 0.5 - settings.eyes.offset, p5.height * 0.25);
        for (let eyePoint of pointsForEye) {
            p5.point(eyePoint.x, eyePoint.y);
        }
        p5.pop();

        // Right eye
        p5.push();
        p5.stroke(settings.eyes.color);
        p5.strokeWeight(settings.eyes.strokeWeight);
        p5.translate(p5.width * 0.5 + settings.eyes.offset, p5.height * 0.25);
        for (let eyePoint of pointsForEye) {
            p5.point(eyePoint.x, eyePoint.y);
        }
        p5.pop();

        // Left nose wing
        p5.push();
        p5.stroke(settings.nose.wing.color)
        p5.strokeWeight(settings.nose.wing.strokeWeight);
        p5.translate(p5.width * 0.5 - settings.nose.wing.offset, p5.height * 0.5);
        for (let leftNoseWingPoint of pointsForLeftNoseWing) {
            p5.point(leftNoseWingPoint.x, leftNoseWingPoint.y);
        }
        p5.pop();

        // Right nose wing
        p5.push();
        p5.stroke(settings.nose.wing.color);
        p5.strokeWeight(settings.nose.wing.strokeWeight);
        p5.translate(p5.width * 0.5 + settings.nose.wing.offset, p5.height * 0.5);
        for (let rightNoseWingPoint of pointsForRightNoseWing) {
            p5.point(rightNoseWingPoint.x, rightNoseWingPoint.y);
        }
        p5.pop();

        // Nose tip
        p5.push();
        p5.stroke(settings.nose.tip.color)
        p5.strokeWeight(settings.nose.tip.strokeWeight);
        p5.translate(p5.width * 0.5, p5.height * 0.5 + settings.nose.tip.offset);
        for (let noseTipPoint of pointsForNoseTip) {
            p5.point(noseTipPoint.x, noseTipPoint.y);
        }
        p5.pop();

        // Mouth
        p5.push();
        p5.stroke(settings.mouth.color);
        p5.strokeWeight(settings.mouth.strokeWeight);
        p5.translate(p5.width * 0.5, p5.height * 0.6 + settings.mouth.offset);
        for (let mouthPoint of pointsForMouth) {
            p5.point(mouthPoint.x, mouthPoint.y);
        }
        p5.pop();
    }

    p5.windowResized = function () {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }

    // Calculate points for an ellipse based on the amount of points and the radius
    function calculatePointsOfEllipse(amountOfPoints, ellipseRadius, startAngle, endAngle) {
        let points = [];
        let angleIncrement = (endAngle - startAngle) / amountOfPoints;


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

