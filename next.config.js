const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'components/bookPages/svg'),
  webpack(config, options) {
    return config
  }
})

// module.exports = {
//   env: {
//     TMDB_API_KEY: process.env.TMDB_API_KEY,
//   },
// };

module.exports = {
  env: {
    ROOT: __dirname,
  }
}