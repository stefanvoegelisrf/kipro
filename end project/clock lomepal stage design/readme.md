# Abstract clock lighting rig

- [Abstract clock lighting rig](#abstract-clock-lighting-rig)
  - [Brief description](#brief-description)
  - [Presets](#presets)
  - [Settings](#settings)
  - [Development setup](#development-setup)
    - [Guide](#guide)


## Brief description

This project is a p5 sketch which displays the current time. It is inspired by a lighting rig setup used at concert of the french rapper Lomepal during his "Mauvais Ordre" tour.

The clocks base is a lighting rig rig with a square layout of 5x5 poles. Attached to each pole are a set of light tubes. Each light tube is configured to change it's length based on either hours, minutes or seconds. The length is alternating to ensure that the lights always have a certain length. The color of the light tubes is also referencing the values of the current time.

Three of these lighting rigs are then placed on the sketch. They are intended to be placed next to each other or have them on top of each other. To further use time as a way to control the sketch, the left and right rig rotate based on the seconds of the time and the middle rig is controlled by the hour.

## Presets

The sketch can be configured to a certain amount, but I have designed a set of presets.

The presets can be accessed by opening the "Settings & Presets" menu.

## Settings

To configure the sketch, the settings can be accessed by opening the "Settings & Presets" menu.

## Development setup

This project uses **NPM** for package management, **Vite** for bundling and local development server. Code is written with **TypeScript**. **P5.js** is used to display the graphics. **lil-gui** is used for the "Settings & Presets" GUI component.

The main code for the sketch can be found here: [/src/sketch.ts](src/sketch.ts)

### Guide

1. Open the project folder where the `package.json` is located. Then run `npm install` or short `npm i`.
2. The required dependencies will be downloaded, after this is finished the project can be started up. To do so, run `npm run dev`. This will start a development server and you should see the url on which you can view the sketch.