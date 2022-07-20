const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  // TODO: Explain Source Map
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use:  {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {esmodules: true}
              }],
              ["@babel/preset-react", {"runtime": "automatic"}]
            ]
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: 'native-addon-loader',
            options: {
              name: './addon/[name]-[hash].[ext]', // default: '[name].[ext]'
              from: '.' // default: '.'
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        loader: "file-loader",
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "build/js/addon", to: "../../addon" }
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'js'),
  },
};