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

export type StrokeSettings = {
    color: string,
    weight: number,
    random: RandomSettings,
    noise: NoiseSettings
}

export type FacePart = {
    name: string,
    startAngle: number,
    endAngle: number,
    radius: number,
    pointAmount: number,
    pointArray: Coordinates[],
    stroke: StrokeSettings
    offset: Coordinates
}

export type FaceSettings = {
    faceparts: FacePart[];
    background: BackgroundSettings,
    useLines: boolean,
    loop: boolean,
    frameRate: number
};