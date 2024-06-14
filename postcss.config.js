export default {
  plugins: {
    tailwindcss: {},
    "cnjm-postcss-px-to-viewport": {
      viewportWidth: 375, 
      unitPrecision: 4,
      viewportUnit: "vmin", 
      fontViewportUnit: "vmin", 
      unitToConvert: "px" 
    },
    autoprefixer: {
      overrideBrowserslist: ["Android >= 4.0", "iOS >= 7"]
    }
  }
};
