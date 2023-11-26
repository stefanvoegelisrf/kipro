import p5 from "p5";
import { LightTube } from "./lighttube";
import { ISettings } from "./settings";

export class LightingRig {
    private rectangleWidth = 400;
    private rectangleStart = -this.rectangleWidth * 0.5;

    drawBaseStructure(sketch: p5) {
        sketch.push();
        sketch.strokeWeight(10);
        sketch.stroke(105, 105, 105, 100);

        let horizontalAdditionalXOfStartPoint = [
            -(this.rectangleWidth * 0.1),
            (this.rectangleWidth * 0.1),
            -(this.rectangleWidth * 0.2),
            (this.rectangleWidth * 0.15),
            -(this.rectangleWidth * 0.1)
        ];
        let horizontalAdditionalXOfEndPoint = [
            (this.rectangleWidth * 0.1),
            (this.rectangleWidth * 0.15),
            -(this.rectangleWidth * 0.1),
            (this.rectangleWidth * 0.1),
            (this.rectangleWidth * 0.2)
        ];
        // draw horizontal lines
        for (let i = 0; i < 5; i++) {
            sketch.line(this.rectangleStart + horizontalAdditionalXOfStartPoint[i], this.rectangleStart + this.rectangleWidth / 4 * i, this.rectangleStart + this.rectangleWidth + horizontalAdditionalXOfEndPoint[i], this.rectangleStart + this.rectangleWidth / 4 * i);
        }
        let verticalAdditionalYOfStartPoint = [
            -(this.rectangleWidth * 0.1),
            -(this.rectangleWidth * 0.25),
            -(this.rectangleWidth * 0.05),
            -(this.rectangleWidth * 0.2),
            -(this.rectangleWidth * 0.1)
        ];
        let verticalAdditionalYOfEndPoint = [
            (this.rectangleWidth * 0.1),
            0,
            (this.rectangleWidth * 0.15),
            (this.rectangleWidth * 0.05),
            (this.rectangleWidth * 0.1)
        ];
        // draw vertical lines
        for (let i = 0; i < 5; i++) {
            sketch.line(this.rectangleStart + this.rectangleWidth / 4 * i, this.rectangleStart + verticalAdditionalYOfStartPoint[i], this.rectangleStart + this.rectangleWidth / 4 * i, this.rectangleStart + this.rectangleWidth + verticalAdditionalYOfEndPoint[i]);
        }
        sketch.pop();
    }
    drawLights(sketch: p5, currentDate: Date, settings: ISettings) {
        sketch.push();
        let tubeWidth = 10;
        let cornerRadius = 5;

        let halwidthBaseLine = this.rectangleWidth * 0.5;
        let amplitudeHalfWidth = (halwidthBaseLine - (halwidthBaseLine * 0.3)) / 2;
        let thirdWidthBaseline = this.rectangleWidth * 0.3;
        let amplitudeThirdWidth = (thirdWidthBaseline - (thirdWidthBaseline * 0.5)) / 2;
        let quarterWidthBaseline = this.rectangleWidth * 0.25;
        let amplitudeQuarterWidth = (quarterWidthBaseline - (quarterWidthBaseline * 0.5)) / 2;
        let amplitudeTwoThirdWidth = (thirdWidthBaseline * 2 - (thirdWidthBaseline * 0.25)) / 2;
        let oneTenthWidthBaseline = this.rectangleWidth * 0.1;
        let amplitudeOneTenthWidth = (oneTenthWidthBaseline - (oneTenthWidthBaseline * 0.5)) / 2;

        let milliseconds = currentDate.getMilliseconds();
        let seconds = currentDate.getSeconds();
        let secondsWithMilliseconds = currentDate.getSeconds() + milliseconds / 1000;
        let secondsAngle = sketch.map(secondsWithMilliseconds, 0, 59, 0, 360);
        let thirdWidthAlternatingBasedOnSeconds = thirdWidthBaseline - amplitudeThirdWidth * sketch.cos(secondsAngle);

        let minutes = currentDate.getMinutes();
        let minutesWithSeconds = minutes + sketch.map(secondsWithMilliseconds, 0, 59, 0, 100) / 100;
        let minutesAngle = sketch.map(minutesWithSeconds, 0, 59, 0, 360);
        let halfWidthAlternatingBasedOnMinutes = halwidthBaseLine - amplitudeHalfWidth * sketch.cos(minutesAngle);
        let quarterWidthAlternatingBasedOnMinutes = quarterWidthBaseline - amplitudeQuarterWidth * sketch.cos(minutesAngle);
        let oneTenthWidthAlternatingBasedOnMinutes = oneTenthWidthBaseline - amplitudeOneTenthWidth * sketch.cos(minutesAngle);

        let hours = currentDate.getHours();
        let hoursWithMinutes = hours + minutesWithSeconds / 60;
        let hoursAngle = sketch.map(hoursWithMinutes, 0, 24, 0, 360);
        let twoThirdWidthAlternatingBasedOnHours = thirdWidthBaseline * 1.6 - amplitudeTwoThirdWidth * sketch.cos(hoursAngle);
        let quarterWidthAlternatingBasedOnHours = quarterWidthBaseline - amplitudeQuarterWidth * sketch.cos(hoursAngle);
        let oneThirdWidthAlternatingBasedOnHours = thirdWidthBaseline - amplitudeThirdWidth * sketch.cos(hoursAngle);

        let tubeLightWithChangingSecondsValueGlowColor = settings.clock.time.seconds.glowColor;
        let tubeLightWithChangingMinutesValueGlowColor = settings.clock.time.minutes.glowColor;
        let tubeLightWithChangingHoursValueGlowColor = settings.clock.time.hours.glowColor;
        // draw vertical light tubes
        let verticalLightTubes = [
            // left side
            new LightTube(this.rectangleStart, this.rectangleStart, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingSecondsValueGlowColor, cornerRadius),
            new LightTube(this.rectangleStart, this.rectangleWidth * 0.25, tubeWidth, oneThirdWidthAlternatingBasedOnHours, tubeLightWithChangingHoursValueGlowColor, cornerRadius),
            // left middle
            new LightTube(-this.rectangleWidth * 0.25, -this.rectangleWidth * 0.125, tubeWidth, halfWidthAlternatingBasedOnMinutes, tubeLightWithChangingMinutesValueGlowColor, cornerRadius),
            new LightTube(-this.rectangleWidth * 0.25, -this.rectangleStart, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingSecondsValueGlowColor, cornerRadius),
            // middle
            new LightTube(0, this.rectangleStart, tubeWidth, this.rectangleWidth * 0.15, settings.glowColor, cornerRadius),
            new LightTube(0, 0, tubeWidth, this.rectangleWidth * 0.3, settings.glowColor, cornerRadius),
            new LightTube(0, -this.rectangleStart + 50, tubeWidth, oneTenthWidthAlternatingBasedOnMinutes, tubeLightWithChangingMinutesValueGlowColor, cornerRadius),
            // right middle
            new LightTube(this.rectangleWidth * 0.25, -this.rectangleStart * 0.6, tubeWidth, quarterWidthAlternatingBasedOnHours, tubeLightWithChangingHoursValueGlowColor, cornerRadius),
            new LightTube(this.rectangleWidth * 0.25, this.rectangleStart * 0.5, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingSecondsValueGlowColor, cornerRadius),
            new LightTube(this.rectangleWidth * 0.25, this.rectangleStart * 1.3, tubeWidth, oneTenthWidthAlternatingBasedOnMinutes, tubeLightWithChangingMinutesValueGlowColor, cornerRadius),
            // right side
            new LightTube(-this.rectangleStart, -this.rectangleStart * 0.3, tubeWidth, halfWidthAlternatingBasedOnMinutes, tubeLightWithChangingMinutesValueGlowColor, cornerRadius),

        ];
        verticalLightTubes.forEach((lightTube) => {
            if (seconds === 0) {
                lightTube.startFlashing();
            }
            lightTube.display(sketch);
        });
        // draw horizontal light tubes
        sketch.rotate(90)
        let horizontalLightTubes = [
            // top
            new LightTube(this.rectangleStart, this.rectangleStart * 0.8, tubeWidth, twoThirdWidthAlternatingBasedOnHours, tubeLightWithChangingHoursValueGlowColor, cornerRadius),
            new LightTube(this.rectangleStart, -this.rectangleStart * 0.5, tubeWidth, this.rectangleWidth * 0.2, settings.glowColor, cornerRadius),
            // top middle
            new LightTube(-this.rectangleWidth * 0.25, 0, tubeWidth, quarterWidthAlternatingBasedOnMinutes, tubeLightWithChangingMinutesValueGlowColor, cornerRadius),
            new LightTube(-this.rectangleWidth * 0.25, this.rectangleStart, tubeWidth, this.rectangleWidth * 0.35, settings.glowColor, cornerRadius),
            new LightTube(-this.rectangleWidth * 0.25, this.rectangleWidth * 0.5, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingSecondsValueGlowColor, cornerRadius),
            // middle
            new LightTube(0, this.rectangleStart * 0.5, tubeWidth, this.rectangleWidth * 0.35, settings.glowColor, cornerRadius),
            new LightTube(0, -this.rectangleStart * 1.1, tubeWidth, this.rectangleWidth * 0.35, settings.glowColor, cornerRadius),
            // bottom middle
            new LightTube(this.rectangleWidth * 0.25, -this.rectangleStart * 0.2, tubeWidth, this.rectangleWidth * 0.5, settings.glowColor, cornerRadius),
            // bottom
            new LightTube(-this.rectangleStart, this.rectangleStart, tubeWidth, thirdWidthAlternatingBasedOnSeconds, tubeLightWithChangingSecondsValueGlowColor, cornerRadius),
            new LightTube(-this.rectangleStart, 0, tubeWidth, quarterWidthAlternatingBasedOnMinutes, tubeLightWithChangingMinutesValueGlowColor, cornerRadius),
            new LightTube(-this.rectangleStart, -this.rectangleStart, tubeWidth, this.rectangleWidth * 0.25, settings.glowColor, cornerRadius),
        ];
        horizontalLightTubes.forEach((lightTube) => {
            if (seconds === 0) {
                lightTube.startFlashing();
            }
            lightTube.display(sketch);
        });
        sketch.pop();
    }
}