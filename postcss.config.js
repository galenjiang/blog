/* eslint-disable */
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const tailwindcss = require('tailwindcss')
/* eslint-enable */

module.exports = {
  plugins: [
    cssnano({
      preset: [
        'default',
        {
          // TODO: not clear the mechanism
          // autoprefixer: true
        },
      ],
    }),
    postcssPresetEnv({
      stage: 4,
      features: {
        'nesting-rules': true,
        'media-query-ranges': true,
      },
      // autoprefixer: {} // auto run
    }),

    tailwindcss('./tailwind.js'),
  ],
}
