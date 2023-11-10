export type BackgroundSettings = {
    enabled: boolean,
    color: string,
    randomize: boolean
}

export type RandomSettings = {
    min: number,
    max: number
}

export type Coordinates = {
    x: number,
    y: number
}

export type StrokeSettings = {
    color: string,
    weight: number,
    randomize: boolean,
    random: RandomSettings
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
    loop: boolean
};