module.exports = {
  "presets": [
    "@vue/app",
    "@babel/env"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  env: { test: { plugins: [ '@babel/plugin-transform-modules-commonjs', '@babel/plugin-transform-runtime' ] } }
}
