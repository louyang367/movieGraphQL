const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'components/bookPages/svg'),
  webpack(config, options) {
    return config
  }
})

// const withPlugins = require('next-compose-plugins');
// const withImages = require('next-images')

// const svgrConfig = {
//     webpack(config) {
//       config.module.rules.push({
//         test: /\.svg$/,
//         issuer: {
//           test: /\.(js|ts)x?$/,
//         },
//         use: ['@svgr/webpack'],
//       });
  
//       return config;
//     },
//   };

// module.exports = withPlugins([
//     [withImages],
// ], svgrConfig);