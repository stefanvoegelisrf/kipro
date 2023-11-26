import { BLEND_MODE } from "p5"

export interface ISettings {
    lightingRigs: {
        left: ILightingRigSettings,
        middle: ILightingRigSettings,
        right: ILightingRigSettings
    },
    clock: IClockSettings,
    glowColor: string,
    sinOffsetEnabled: boolean,
    rotationEnabled: boolean,
    blendMode: blendModes
}

export type blendModes = "BLEND" | "ADD" | "DARKEST" | "LIGHTEST" | "DIFFERENCE" | "EXCLUSION" | "MULTIPLY" | "SCREEN" | "REPLACE" | "OVERLAY" | "HARD_LIGHT" | "SOFT_LIGHT" | "DODGE" | "BURN" | "SUBTRACT";

export interface ILightingRigSettings {
    scale: number,
    x: number,
    y: number,
    rotation: number
}

export interface IClockSettings {
    fake: boolean,
    speedUp: boolean,
    timeFactor: number,
    time: {
        hours: number,
        minutes: number,
        seconds: number,
        milliseconds: number
    },
    displayInBackground: boolean
}