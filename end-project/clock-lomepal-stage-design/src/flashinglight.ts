import p5 from "p5";

export class FlashingLight {
    public x: number;
    public y: number;
    public size: number;
    public brightness: number;
    constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.brightness = 200;
    }

    // Method to update the light
    update() {
        this.brightness -= 255 / 100;
        if (this.brightness < 0) {
            this.brightness = 0;
        }
    }

    // Method to display the light
    display(sketch: p5) {
        sketch.push();
        sketch.noStroke();
        sketch.fill(255, 255, 255, this.brightness);
        sketch.circle(this.x, this.y, this.size);
        sketch.pop()
    }
}