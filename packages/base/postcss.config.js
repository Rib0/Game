module.exports = ({ mode }) => {
    const isProd = mode === 'production';

    return {
        plugins: [
            require('postcss-easy-import'),
            require('postcss-preset-env')({
                stage: 3,
                autoprefixer: { grid: false },
                features: {
                    'custom-media-queries': true,
                },
                preserve: false,
                importFrom: './src/root.css',
            }),
            require('postcss-flexbugs-fixes'),
            isProd &&
            require('cssnano')({
                preset: 'default',
            }),
            require('postcss-nested'),
        ].filter(Boolean),
    };
};
