module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-preset-env')({
            stage: 0,
            autoprefixer: { grid: false },
            features: {
                'custom-media-queries': true,
            },
            preserve: false,
        }),
        require('postcss-flexbugs-fixes'),
        require('cssnano')({
            preset: 'default',
        }),
        require('postcss-nested'),
    ],
};
