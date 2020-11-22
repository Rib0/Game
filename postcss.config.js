module.exports = ({ webpack: { mode } }) => {
    const isDevMode = mode === 'development';

    return {
        plugins: [
            require('postcss-import'),
            require('postcss-preset-env')({
                stage: 2,
                autoprefixer: { grid: false },
                features: {
                    'custom-media-queries': true,
                },
                preserve: false,
                importFrom: './src/root.css'
            }),
            require('postcss-flexbugs-fixes'),
            isDevMode && require('cssnano')({
                preset: 'default',
            }),
            require('postcss-nested'),
        ].filter(Boolean),
    }
};
