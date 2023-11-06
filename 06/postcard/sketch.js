import { GUI } from './lil-gui.esm.min.js';
export default function sketch(p5) {
    let settings = {
        eyeRadius: 80,
        eyePoints: 50,
        noseWingRadius: 40,
        noseWingPoints: 10,
        noseTipPoints: 10,
        noseTipRadius: 60,
        mouthPoints: 40,
        mouthRadius: 200
    }
    let pointsForEye = [];
    let pointsForLeftNoseWing = [];
    let pointsForRightNoseWing = [];
    let pointsForNoseTip = [];
    let pointsForMouth = [];
    let eyeRadius = 80;
    let eyePoints = 50;
    let noseWingRadius = 40
    let noseWingPoints = 10
    let noseTipPoints = 10;
    let noseTipRadius = 60;
    let mouthPoints = 40;
    let mouthRadius = 200;
    p5.setup = function () {
        let customizeSketchGui = new GUI();
        customizeSketchGui.add(settings, 'eyeRadius', 0, 200);
        p5.angleMode(p5.DEGREES);
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(220);
        p5.strokeWeight(5);
    }

    p5.draw = function () {
        pointsForEye = calculatePointsOfEllipse(settings.eyePoints, settings.eyeRadius, 0, 360);
        pointsForLeftNoseWing = calculatePointsOfEllipse(settings.noseWingPoints, settings.noseWingRadius, 190, 370)
        pointsForRightNoseWing = calculatePointsOfEllipse(settings.oseWingPoints, settings.noseWingRadius, -20, 160)
        pointsForNoseTip = calculatePointsOfEllipse(settings.noseTipPoints, settings.noseTipRadius, -100, 80)
        pointsForMouth = calculatePointsOfEllipse(settings.mouthPoints, settings.mouthRadius, -90, 90)
        p5.background(255)
        // Left eye
        p5.push();
        p5.translate(p5.width * 0.5 - settings.eyeRadius * 1.5, p5.height * 0.25);
        for (let eyePoint of pointsForEye) {
            p5.point(eyePoint.x, eyePoint.y);
        }
        p5.pop();

        // Right eye
        p5.push();
        p5.translate(p5.width * 0.5 + settings.eyeRadius * 1.5, p5.height * 0.25);
        for (let eyePoint of pointsForEye) {
            p5.point(eyePoint.x, eyePoint.y);
        }
        p5.pop();

        // Left nose wing
        p5.push();
        p5.translate(p5.width * 0.5 - settings.noseWingRadius * 2, p5.height * 0.5);
        for (let leftNoseWingPoint of pointsForLeftNoseWing) {
            p5.point(leftNoseWingPoint.x, leftNoseWingPoint.y);
        }
        p5.pop();

        // Right nose wing
        p5.push();
        p5.translate(p5.width * 0.5 + settings.noseWingRadius * 2, p5.height * 0.5);
        for (let rightNoseWingPoint of pointsForRightNoseWing) {
            p5.point(rightNoseWingPoint.x, rightNoseWingPoint.y);
        }
        p5.pop();

        // Nose tip
        p5.push();
        p5.translate(p5.width * 0.5, p5.height * 0.5 + settings.noseTipRadius * 0.5);
        for (let noseTipPoint of pointsForNoseTip) {
            p5.point(noseTipPoint.x, noseTipPoint.y);
        }
        p5.pop();

        // Mouth
        p5.push();
        p5.translate(p5.width * 0.5, p5.height * 0.6);
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
        let diameter = ellipseRadius * 2;
        let circumference = diameter * p5.PI;
        let circumferenceLengthPerPoint = circumference / amountOfPoints;
        for (let i = 0; i < amountOfPoints; i++) {
            let currentArc = circumferenceLengthPerPoint * (i + 1);
            let currentAngle = p5.map(currentArc, 0, circumference, startAngle, endAngle);
            points.push({ x: p5.sin(currentAngle) * ellipseRadius, y: p5.cos(currentAngle) * ellipseRadius });
        }
        return points;
    }
};

