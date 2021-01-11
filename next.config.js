const withReactSvg = require("next-react-svg");
const path = require("path");

module.exports = withReactSvg({
	include: path.resolve(__dirname, "components/bookPages/svg"),
	webpack(config, options) {
		return config;
	},
});

// module.exports = {
//   env: {
//     TMDB_API_KEY: process.env.TMDB_API_KEY,
//   },
// };

// module.exports = {
// 	webpack(config) {
// 		config.resolve.alias["apollo"] = path.join(__dirname, "apollo");
// 		return config;
// 	},
// };

module.exports = {
	webpack(config) {
		config.resolve.modules.push(__dirname);
		return config;
	},
};
