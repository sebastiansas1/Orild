module.exports = {
  
  mode: 'development',
  entry: './public/css/application.sass',
	output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js/,
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      }
    ]
  },
};