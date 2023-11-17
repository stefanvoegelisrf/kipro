import GUI from 'lil-gui';
import p5 from 'p5';
const platforms_behig_resource_id = "5940d7e5-7456-4f02-bb24-f25506036b48";
const platforms_resource_id = '28ef7f3d-e793-49c7-a5fe-d22ff63e952b';
const limit = 5;
const apiKey = 'eyJvcmciOiI2NDA2NTFhNTIyZmEwNTAwMDEyOWJiZTEiLCJpZCI6ImY1NzU2MGIzYjczODRjZWM4N2MxNDY2MjZmMDRmYTZlIiwiaCI6Im11cm11cjEyOCJ9'; // Replace this with your actual API key

fetch(`/api/datastore_search?resource_id=${platforms_resource_id}&limit=${limit}`, {
    method: 'GET',
    headers: {
        'Authorization': apiKey
    },
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });


const sketch = (sketch: p5) => {
    sketch.setup = function () {
        let customizeSketchGui = new GUI();
        sketch.angleMode(sketch.DEGREES);
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        sketch.background(255);
    }

    sketch.draw = function () {

    }

    sketch.windowResized = function () {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }
};



new p5(sketch);