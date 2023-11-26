import p5 from "p5";
import { hexToRgb } from "./utils";

export class LightTube {
    constructor(x: number, y: number, w: number, h: number, glowColor: string, cornerRadius: number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.glowColor = glowColor;
        this.cornerRadius = cornerRadius;
    }
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public glowColor: string;
    public cornerRadius: number;
    display(sketch: p5){
        sketch.push();
        sketch.noStroke();
        sketch.rectMode(sketch.CENTER);
        sketch.rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    
        let glowMaxRadius = 100; // Max radius of the glow
        let glowBorder = glowMaxRadius * 0.5; // Border of the glow
        let steps = glowMaxRadius * 0.5; // Number of steps for the glow effect
        let maxAlpha = 100; // Max alpha value of the glow
        sketch.noFill();
    
        for (let i = 0; i < steps; i++) {
            let alpha = sketch.map(i, 0, steps, maxAlpha, 0); // Decreasing alpha value
            let spread = sketch.map(i, 0, steps, 0, glowMaxRadius); // Increasing spread of the glow
            let glowColorRgb = hexToRgb(this.glowColor);
            sketch.stroke(glowColorRgb.r, glowColorRgb.g, glowColorRgb.b, alpha);
            sketch.rect(this.x, this.y, this.width + spread, this.height + spread, glowBorder);
        }
        sketch.pop();
    }
}