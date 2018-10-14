const precss = require('precss')
const autoprefixer = require('autoprefixer')
// const cssnext = require("postcss-cssnext")

module.exports = {
  plugins: [
    // precss(),
    // autoprefixer({ }),  // no need, because has included in css-next
    // cssnext({
    //   features: {
    //     // customProperties: false
    //   }
    // })
  ],
};
