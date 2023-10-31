let pointsForEye = [];
let eyeRadius = 50;
let eyePoints = 20;
let eyeEllipseSizeMin = 10;
let eyeEllipseSizeMax = 100;
function setup() {
    pointsForEye = calculatePointsOfEllipse(eyePoints, eyeRadius);
    createCanvas(windowWidth, windowHeight);
    background(220);
    angleMode(DEGREES);
    strokeWeight(2);
}

function draw() {
    background(255, 5)
    push();
    translate(width * 0.5 - eyeRadius * 2, height * 0.25);
    for (let eyePoint of pointsForEye) {
        stroke(noise((millis() + 9999) * eyePoint.x * eyePoint.y * 0.0000005) * 255, 30)
        strokeWeight(noise((millis() + 9999) * eyePoint.x * eyePoint.y * 0.0000005) * 100)
        let randomOffsetX = (noise((millis() + 9999) * eyePoint.x * eyePoint.y * 0.0000001) - 0.5) * 70;
        let randomOffsetY = (noise((millis() + 9999) * eyePoint.x * eyePoint.y * 0.0000001) - 0.5) * 70;
        point(eyePoint.x + randomOffsetX, eyePoint.y + randomOffsetY);
    }
    pop();
    push();
    translate(width * 0.5 + eyeRadius * 2, height * 0.25);
    for (let eyePoint of pointsForEye) {
        stroke(noise((millis() + 999999) * eyePoint.x * eyePoint.y * 0.0000005) * 255, 30)
        strokeWeight(noise((millis() + 999999) * eyePoint.x * eyePoint.y * 0.0000005) * 100)
        let randomOffsetX = (noise((millis() + 999999) * eyePoint.x * eyePoint.y * 0.0000001) - 0.5) * 70;
        let randomOffsetY = (noise((millis() + 999999) * eyePoint.x * eyePoint.y * 0.0000001) - 0.5) * 70;
        point(eyePoint.x + randomOffsetX, eyePoint.y + randomOffsetY);
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