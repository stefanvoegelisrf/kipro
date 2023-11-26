import p5 from "p5";
import { ISettings, blendModes } from "./settings";

export function hexToRgb(hex: string) {
    //convert hex to rgb
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b }
}
export function setBlendMode  (blendMode: blendModes, settings: ISettings)  {
    settings.blendMode = blendMode;
}
export const blendModeOptions: blendModes[] = [
    "BLEND",
    "ADD",
    "DARKEST",
    "LIGHTEST",
    "DIFFERENCE",
    "EXCLUSION",
    "MULTIPLY",
    "SCREEN",
    "REPLACE",
    "OVERLAY",
    "HARD_LIGHT",
    "SOFT_LIGHT",
    "DODGE",
    "BURN",
    "SUBTRACT"
];

export function applyBlendMode(sketch: p5, blendMode: blendModes) {
    switch (blendMode) {
        case "BLEND":
            sketch.blendMode(sketch.BLEND);
            break;
        case "ADD":
            sketch.blendMode(sketch.ADD);
            break;
        case "DARKEST":
            sketch.blendMode(sketch.DARKEST);
            break;
        case "LIGHTEST":
            sketch.blendMode(sketch.LIGHTEST);
            break;
        case "DIFFERENCE":
            sketch.blendMode(sketch.DIFFERENCE);
            break;
        case "EXCLUSION":
            sketch.blendMode(sketch.EXCLUSION);
            break;
        case "MULTIPLY":
            sketch.blendMode(sketch.MULTIPLY);
            break;
        case "SCREEN":
            sketch.blendMode(sketch.SCREEN);
            break;
        case "REPLACE":
            sketch.blendMode(sketch.REPLACE);
            break;
        case "OVERLAY":
            sketch.blendMode(sketch.OVERLAY);
            break;
        default:
            sketch.blendMode(sketch.BLEND);
            break;
    }
}