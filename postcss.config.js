module.exports = {
  plugins: [
    require('stylelint'),
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-normalize'),
    require('postcss-flexbugs-fixes'),
    require('postcss-css-variables'),
    require('postcss-preset-env')({
      stage: 0,
      autoprefixer: { grid: false },
      importFrom: './src/base.css',
    }),
  ],
};
