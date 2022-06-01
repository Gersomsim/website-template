
const path = require('path');
const pugPlugin = require('pug-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: './',
    filename: 'assets/js/[name].[contenthash].js'
  },
  resolve:{
    alias: {
      Images: path.join(__dirname, "./src/img/")
    }
  },
  entry: {
    // Only Pug files
    index: './src/views/index.pug',
  },
  plugins: [
    new pugPlugin({
      modules: [
        pugPlugin.extractCss({
          filename: '[name].[contenthash].css',
        })
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.pug$/,
        loader: pugPlugin.loader,
        options: {
          method: 'render',
        }
      },
      {
        test: /\.styl$/,
        use: [
          { 
            loader: "css-loader",
          },
          { 
            loader: "postcss-loader",
          },
          { 
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                include: [
                  path.join(__dirname, "src/stylus/components"),
                  path.join(__dirname, "src/stylus/bootstrap/bootstrap.min.css")
                ],
              }
            }
          }
        ]
      },
    ]
  },
};