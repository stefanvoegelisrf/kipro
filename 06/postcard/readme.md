# Create a face

This project is used to create a sketch with P5. In the sketch you can create a customizable face using the calculation of points of an ellipse.

## Developer instructions

This project is written in **Typescript** to make use of type safety. Packages are installed using **NPM** and to build and serve the project, **Vite** is used.

### Project structure

The project structure is very basic:

```
- root
  - src
    - customtypes.ts
      - Custom types for defining parts of the face
    - settings.json
      - Json file to store the parts of the face and other settings
    - sketch.ts
      - Contains the main code to create the P5 instance and the sketch
  - package.json
    - Lists dependencies and scripts
  - style.css
    - basic styling to remove borders around sketch
  - tsconfig.json
    - Typescript compiler settings
  - vite.config.ts
    - Vite settings for running server and bundling settings
```

### Run project

> Make sure, **NPM** is installed by installing it using Homebrew with the following recipe: ```brew install node```.
> Once installed, make sure that the packages are installed by running ```npm install```

With npm and all dependencies installed, run ```npm run dev``` to start a development server.

### Building the project for serving statically

As there is a build step involved, GitHub pages won't serve the project by default. Therefore, we need to create a built version so that it can correctly run on GitHub pages.

To do so, run: ```npm run build```. This will create a build in the ```dist``` folder which then can be referenced in the Markdown files.

### Libraries

To achieve the project, various libraries and tools are used:
- [lil-gui](https://lil-gui.georgealways.com/) is used for adding the gui.
- [P5.js](https://p5js.org) used for creating graphics in canvas.
  - P5 is used in [instance mode](https://p5js.org/reference/#/p5/p5).
  - Additionally, to use P5 with Typescript, the typings for P5 have been installed.
- [NPM](https://www.npmjs.com/) is used for managing dependencies.
- [Vite](https://vitejs.dev/) is used for bundling and serving the project.