module.exports = (api) => {
	api.cache(false);

	return {
		presets: [
			"@babel/preset-env",
			["@babel/preset-react", {
				runtime: 'automatic',
				development: process.env.NODE_ENV === 'development',
				importSource: '@welldone-software/why-did-you-render',
			}],
			[
				"@babel/preset-typescript",
				{
					isTSX: true,
					allExtensions: true
				}
			],
		],
		plugins: [
			[
				"@babel/plugin-proposal-class-properties",
				{
					loose: true
				}
			],
			[
				"transform-react-remove-prop-types",
				{
					mode: "wrap",
					ignoreFilenames: [
						"node_modules"
					]
				}
			],
			"@babel/plugin-transform-react-constant-elements",
			"react-hot-loader/babel"
		]
	}
};