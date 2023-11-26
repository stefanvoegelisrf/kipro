import { BLEND_MODE } from "p5"

export interface ISettings {
    lightingRigs: {
        left: ILightingRigSettings,
        middle: ILightingRigSettings,
        right: ILightingRigSettings
    },
    clock: IClockSettings,
    sinOffsetEnabled: boolean,
    sinOffsetMultiplier: number,
    rotationEnabled: boolean,
    blendMode: blendModes,
    backgroundSettings: {
        enabled: boolean,
        color: string,
        alpha: number
    },
}

export type blendModes = "BLEND" | "ADD" | "DARKEST" | "LIGHTEST" | "DIFFERENCE" | "EXCLUSION" | "MULTIPLY" | "SCREEN" | "REPLACE" | "OVERLAY" | "HARD_LIGHT" | "SOFT_LIGHT" | "DODGE" | "BURN" | "SUBTRACT";

export interface ILightingRigSettings {
    scale: number,
    x: number,
    y: number,
    rotation: number
}
export interface ITimePartSettings {
    value: number,
    glowColor: string,
}

export interface IClockSettings {
    fake: boolean,
    speedUp: boolean,
    timeFactor: number,
    time: {
        hours: ITimePartSettings,
        minutes: ITimePartSettings,
        seconds: ITimePartSettings,
        milliseconds: number
    },
    displayInBackground: boolean
}