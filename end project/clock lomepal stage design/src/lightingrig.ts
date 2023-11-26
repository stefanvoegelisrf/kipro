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

        let halfwidthBaseLine = this.rectangleWidth * 0.5;
        let amplitudeHalfWidth = (halfwidthBaseLine - (halfwidthBaseLine * 0.3)) / 2;
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
        let oneThirdWidthAlternatingBasedOnSeconds = thirdWidthBaseline - amplitudeThirdWidth * sketch.cos(secondsAngle);
        let halfWidthAlternatingBasedOnSeconds = halfwidthBaseLine - amplitudeHalfWidth * sketch.cos(secondsAngle);

        let minutes = currentDate.getMinutes();
        let minutesWithSeconds = minutes + sketch.map(secondsWithMilliseconds, 0, 59, 0, 100) / 100;
        let minutesAngle = sketch.map(minutesWithSeconds, 0, 59, 0, 360);
        let halfWidthAlternatingBasedOnMinutes = halfwidthBaseLine - amplitudeHalfWidth * sketch.cos(minutesAngle);
        let quarterWidthAlternatingBasedOnMinutes = quarterWidthBaseline - amplitudeQuarterWidth * sketch.cos(minutesAngle);
        let oneTenthWidthAlternatingBasedOnMinutes = oneTenthWidthBaseline - amplitudeOneTenthWidth * sketch.cos(minutesAngle);
        let twoTenthsWidthAlternatingBasedOnMinutes = oneTenthWidthBaseline * 2 - amplitudeOneTenthWidth * sketch.cos(minutesAngle);
        let oneThirdWidthAlternatingBasedOnMinutes = thirdWidthBaseline - amplitudeThirdWidth * sketch.cos(minutesAngle);

        let hours = currentDate.getHours();
        let hoursWithMinutes = hours + minutesWithSeconds / 60;
        let hoursAngle = sketch.map(hoursWithMinutes, 0, 24, 0, 360);
        let twoThirdWidthAlternatingBasedOnHours = thirdWidthBaseline * 1.6 - amplitudeTwoThirdWidth * sketch.cos(hoursAngle);
        let quarterWidthAlternatingBasedOnHours = quarterWidthBaseline - amplitudeQuarterWidth * sketch.cos(hoursAngle);
        let oneThirdWidthAlternatingBasedOnHours = thirdWidthBaseline - amplitudeThirdWidth * 2 * sketch.cos(hoursAngle);

        // draw vertical light tubes
        let verticalLightTubes = [
            // left side
            new LightTube(this.rectangleStart, this.rectangleStart, tubeWidth, oneThirdWidthAlternatingBasedOnSeconds, settings.clock.time.seconds.glowColor, cornerRadius),
            new LightTube(this.rectangleStart, this.rectangleWidth * 0.25, tubeWidth, oneThirdWidthAlternatingBasedOnHours, settings.clock.time.hours.glowColor, cornerRadius),
            // left middle
            new LightTube(-this.rectangleWidth * 0.25, -this.rectangleWidth * 0.125, tubeWidth, halfWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),
            new LightTube(-this.rectangleWidth * 0.25, -this.rectangleStart, tubeWidth, oneThirdWidthAlternatingBasedOnSeconds, settings.clock.time.seconds.glowColor, cornerRadius),
            // middle
            new LightTube(0, this.rectangleStart, tubeWidth, twoTenthsWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),
            new LightTube(0, 0, tubeWidth, oneThirdWidthAlternatingBasedOnSeconds, settings.clock.time.seconds.glowColor, cornerRadius),
            new LightTube(0, -this.rectangleStart + 50, tubeWidth, oneTenthWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),
            // right middle
            new LightTube(this.rectangleWidth * 0.25, -this.rectangleStart * 0.6, tubeWidth, quarterWidthAlternatingBasedOnHours, settings.clock.time.hours.glowColor, cornerRadius),
            new LightTube(this.rectangleWidth * 0.25, this.rectangleStart * 0.5, tubeWidth, oneThirdWidthAlternatingBasedOnSeconds, settings.clock.time.seconds.glowColor, cornerRadius),
            new LightTube(this.rectangleWidth * 0.25, this.rectangleStart * 1.3, tubeWidth, oneTenthWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),
            // right side
            new LightTube(-this.rectangleStart, -this.rectangleStart * 0.3, tubeWidth, halfWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),

        ];
        verticalLightTubes.forEach((lightTube) => {
            if (seconds % settings.flashInterval === 0) {
                lightTube.startFlashing();
            }
            lightTube.display(sketch);
        });
        // draw horizontal light tubes
        sketch.rotate(90)
        let horizontalLightTubes = [
            // top
            new LightTube(this.rectangleStart, this.rectangleStart * 0.8, tubeWidth, twoThirdWidthAlternatingBasedOnHours, settings.clock.time.hours.glowColor, cornerRadius),
            new LightTube(this.rectangleStart, -this.rectangleStart * 0.5, tubeWidth, oneThirdWidthAlternatingBasedOnHours, settings.clock.time.hours.glowColor, cornerRadius),
            // top middle
            new LightTube(-this.rectangleWidth * 0.25, 0, tubeWidth, quarterWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),
            new LightTube(-this.rectangleWidth * 0.25, this.rectangleStart, tubeWidth, oneThirdWidthAlternatingBasedOnHours, settings.clock.time.hours.glowColor, cornerRadius),
            new LightTube(-this.rectangleWidth * 0.25, this.rectangleWidth * 0.5, tubeWidth, oneThirdWidthAlternatingBasedOnSeconds, settings.clock.time.seconds.glowColor, cornerRadius),
            // middle
            new LightTube(0, this.rectangleStart * 0.5, tubeWidth, oneThirdWidthAlternatingBasedOnHours, settings.clock.time.hours.glowColor, cornerRadius),
            new LightTube(0, -this.rectangleStart * 1.1, tubeWidth, oneThirdWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),
            // bottom middle
            new LightTube(this.rectangleWidth * 0.25, -this.rectangleStart * 0.25, tubeWidth, halfWidthAlternatingBasedOnSeconds, settings.clock.time.seconds.glowColor, cornerRadius),
            // bottom
            new LightTube(-this.rectangleStart, this.rectangleStart, tubeWidth, oneThirdWidthAlternatingBasedOnSeconds, settings.clock.time.seconds.glowColor, cornerRadius),
            new LightTube(-this.rectangleStart, 0, tubeWidth, quarterWidthAlternatingBasedOnMinutes, settings.clock.time.minutes.glowColor, cornerRadius),
            new LightTube(-this.rectangleStart, -this.rectangleStart, tubeWidth, oneThirdWidthAlternatingBasedOnHours, settings.clock.time.hours.glowColor, cornerRadius),
        ];
        horizontalLightTubes.forEach((lightTube) => {
            if (seconds % settings.flashInterval === 0) {
                lightTube.startFlashing();
            }
            lightTube.display(sketch);
        });
        sketch.pop();
    }
}