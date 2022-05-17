const mix = require('laravel-mix');
const path = require('path');

const { hmrOptions, devServer } = require('./webpack.fix');

mix.extract();

mix
  .js('resources/js/app.js', 'public/js')
  .react()
  .postCss('resources/css/app.css', 'public/css/app.css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer')
  ])
  .options({
    hmrOptions: hmrOptions
  })
  .webpackConfig({
    output: { chunkFilename: 'js/[name].js?id=[chunkhash]' },
    resolve: {
      alias: {
        '@': path.resolve('resources/js')
      }
    },
    devServer: devServer
  })
  .version()
  .sourceMaps();
