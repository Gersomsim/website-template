
const path = require('path');
const pugPlugin = require('pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    static: {
      directory: "./dist",
      watch: {
        ignored: '/node_modules/',
        usePolling: true,
      },
    },
    hot: false,
    port: 3000,
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: './dist',
      serverSideRender: true,
      writeToDisk: true,
    },
  },
  target: 'web',
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
        test: /\.css$/,
        use: [
          { 
            loader: "css-loader",
          },
          { 
            loader: "postcss-loader",
          },
        ]
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
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
    }),
    new pugPlugin({
      modules: [
        pugPlugin.extractCss({
          filename: 'assets/css/[name].[contenthash].css',
        })
      ]
    }),
  ],
};