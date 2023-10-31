let pointsForEye = [];
let eyeRadius = 80;
let eyePoints = 20;
let eyeEllipseSizeMin = 10;
let eyeEllipseSizeMax = 100;
function setup() {
    angleMode(DEGREES);
    pointsForEye = calculatePointsOfEllipse(eyePoints, eyeRadius);
    createCanvas(windowWidth, windowHeight);
    background(220);
    strokeWeight(2);
}

function draw() {
    background(255)
    push();
    translate(width * 0.5 - eyeRadius * 2, height * 0.25);
    for (let eyePoint of pointsForEye) {
        point(eyePoint.x, eyePoint.y);
    }
    pop();
    push();
    translate(width * 0.5 + eyeRadius * 2, height * 0.25);
    for (let eyePoint of pointsForEye) {
        point(eyePoint.x, eyePoint.y);
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Calculate points for an ellipse based on the amount of points and the radius
function calculatePointsOfEllipse(amountOfPoints, ellipseRadius) {
    let points = [];
    let diameter = ellipseRadius * 2;
    let circumference = diameter * PI;
    let circumferenceLengthPerPoint = circumference / amountOfPoints;
    for (let i = 0; i < amountOfPoints; i++) {
        let currentArc = circumferenceLengthPerPoint * (i + 1);
        let currentAngle = map(currentArc, 0, circumference, 0, 360);
        points.push({ x: sin(currentAngle) * ellipseRadius, y: cos(currentAngle) * ellipseRadius });
    }
    return points;
}