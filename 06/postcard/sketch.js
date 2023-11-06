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
let noseTipRadius = 30;
let mouthPoints = 40;
let mouthRadius = 200;
let eyeEllipseSizeMin = 10;
let eyeEllipseSizeMax = 100;
function setup() {
    angleMode(DEGREES);
    pointsForEye = calculatePointsOfEllipse(eyePoints, eyeRadius, 0, 360);
    pointsForLeftNoseWing = calculatePointsOfEllipse(noseWingPoints, noseWingRadius, 190, 370)
    pointsForRightNoseWing = calculatePointsOfEllipse(noseWingPoints, noseWingRadius, -20, 160)
    pointsForNoseTip = calculatePointsOfEllipse(noseTipPoints, noseTipRadius, -100, 80)
    pointsForMouth = calculatePointsOfEllipse(mouthPoints, mouthRadius, -90, 90)
    console.log(pointsForLeftNoseWing)
    createCanvas(windowWidth, windowHeight);
    background(220);
    strokeWeight(5);
}

function draw() {
    background(255)
    // Left eye
    push();
    translate(width * 0.5 - eyeRadius * 1.5, height * 0.25);
    for (let eyePoint of pointsForEye) {
        point(eyePoint.x, eyePoint.y);
    }
    pop();

    // Right eye
    push();
    translate(width * 0.5 + eyeRadius * 1.5, height * 0.25);
    for (let eyePoint of pointsForEye) {
        point(eyePoint.x, eyePoint.y);
    }
    pop();

    // Left nose wing
    push();
    translate(width * 0.5 - noseWingRadius, height * 0.5);
    for (let leftNoseWingPoint of pointsForLeftNoseWing) {
        point(leftNoseWingPoint.x, leftNoseWingPoint.y);
    }
    pop();

    // Right nose wing
    push();
    translate(width * 0.5 + noseWingRadius, height * 0.5);
    for (let rightNoseWingPoint of pointsForRightNoseWing) {
        point(rightNoseWingPoint.x, rightNoseWingPoint.y);
    }
    pop();

    // Nose tip
    push();
    translate(width * 0.5, height * 0.5 + noseTipRadius);
    for (let noseTipPoint of pointsForNoseTip) {
        point(noseTipPoint.x, noseTipPoint.y);
    }
    pop();

    // Mouth
    push();
    translate(width * 0.5, height * 0.6);
    for (let mouthPoint of pointsForMouth) {
        point(mouthPoint.x, mouthPoint.y);
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Calculate points for an ellipse based on the amount of points and the radius
function calculatePointsOfEllipse(amountOfPoints, ellipseRadius, startAngle, endAngle) {
    let points = [];
    let diameter = ellipseRadius * 2;
    let circumference = diameter * PI;
    let circumferenceLengthPerPoint = circumference / amountOfPoints;
    for (let i = 0; i < amountOfPoints; i++) {
        let currentArc = circumferenceLengthPerPoint * (i + 1);
        let currentAngle = map(currentArc, 0, circumference, startAngle, endAngle);
        points.push({ x: sin(currentAngle) * ellipseRadius, y: cos(currentAngle) * ellipseRadius });
    }
    return points;
}