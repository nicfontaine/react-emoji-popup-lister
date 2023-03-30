const path = require("path");

module.exports = {
	target: "web",
	entry: {
		index: "./src/lib/index.ts",
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "index.js",
		library: "ReactEmojiPopupLister",
		libraryTarget: "umd",
		globalObject: "this",
		umdNamedDefine: true,
	},
	resolve: {
		extensions: [".ts", ".js", ".tsx"],
		extensionAlias: {
			".js": [".js", ".ts"],
			".cjs": [".cjs", ".cts"],
			".mjs": [".mjs", ".mts"],
		},
		alias: {
			react: path.resolve("./node_modules/react"),
		},
	},
	module: {
		rules: [
			// all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
			{
				test: /\.css$/,
				use: [
					"css-modules-typescript-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
						},
					},
				],
			},
		],
	},
};

