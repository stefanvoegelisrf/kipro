export type BackgroundSettings = {
    enabled: boolean,
    color: string,
    transparency: number,
    randomize: boolean
}

export type RandomSettings = {
    randomize: boolean,
    min: number,
    max: number
}

export type NoiseSettings = {
    useNoise: boolean;
    amount: number;
    speed: number;
    offset: number;
}

export type Coordinates = {
    x: number,
    y: number
}

export interface OffsetSettings extends IAmRandomizable {
    coordinates: Coordinates;
}


export interface IAmRandomizable {
    random: RandomSettings;
    noise: NoiseSettings;
}

export interface StrokeSettings extends IAmRandomizable {
    color: string;
    transparency: number;
    weight: number;
}

export type FacePart = {
    name: string,
    startAngle: number,
    endAngle: number,
    radius: number,
    pointAmount: number,
    pointArray: Coordinates[],
    stroke: StrokeSettings
    offset: OffsetSettings
}

export type FaceSettings = {
    face: {
        pointAmount: number
    }
    faceparts: FacePart[];
    background: BackgroundSettings,
    useLines: boolean,
    loop: boolean,
    frameRate: number
};