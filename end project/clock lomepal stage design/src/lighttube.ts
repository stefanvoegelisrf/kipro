import p5 from "p5";
import { hexToRgb } from "./utils";

export class LightTube {
    constructor(x: number, y: number, w: number, h: number, glowColor: string, cornerRadius: number, glowMaxRadius: number = 100, maxAlpha: number = 100) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.glowColor = glowColor;
        this.cornerRadius = cornerRadius;
        this.glowMaxRadius = glowMaxRadius;
        this.maxAlpha = maxAlpha;
    }
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public glowColor: string;
    public cornerRadius: number;
    public glowMaxRadius: number;
    public maxAlpha: number;

    isFlashing = false;
    flashDuration = 1000; // Duration of the flash in milliseconds
    flashStartTime = 0;
    flashCount = 5; // Number of times to flash in one second

    // Method to start flashing
    startFlashing() {
        this.isFlashing = true;
        this.flashStartTime = performance.now();
    }
    display(sketch: p5) {
        sketch.push();
        sketch.noStroke();
        sketch.rectMode(sketch.CENTER);

        let scaleFactor = 1;
        let glowSpreadFactor = 1;
        let glowAlphaFactor = 1;
        if (this.isFlashing) {
            let currentTime = performance.now();
            let elapsedTime = currentTime - this.flashStartTime;
            if (elapsedTime > this.flashDuration) {
                this.isFlashing = false;
            } else {
                // Randomize scale factor for a flickering effect
                scaleFactor = 1 + (Math.random() * 0.1); // Scale increases by up to 10%
                glowSpreadFactor = 1 + (Math.random() * 0.2); // Glow spread varies
                glowAlphaFactor = 1 + (Math.random() * 0.5); // Glow alpha varies
            }
        }

        sketch.rect(this.x, this.y, this.width * scaleFactor, this.height * scaleFactor, this.cornerRadius);

        // Adjusting the glow effect
        let glowBorder = this.glowMaxRadius * 0.5 * glowSpreadFactor; // Adjusted border of the glow
        let steps = this.glowMaxRadius * 0.5 * glowSpreadFactor; // Adjusted number of steps
        sketch.noFill();

        for (let i = 0; i < steps; i++) {
            let alpha = sketch.map(i, 0, steps, this.maxAlpha * glowAlphaFactor, 0); // Adjusted alpha
            let spread = sketch.map(i, 0, steps, 0, this.glowMaxRadius * glowSpreadFactor); // Adjusted spread
            let glowColorRgb = hexToRgb(this.glowColor);
            sketch.stroke(glowColorRgb.r, glowColorRgb.g, glowColorRgb.b, alpha);
            sketch.rect(this.x, this.y, (this.width + spread) * scaleFactor, (this.height + spread) * scaleFactor, glowBorder);
        }

        sketch.pop();
    }
}