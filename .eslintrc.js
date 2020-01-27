module.exports = {
    env: {
        es6: true,
        browser: true,
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    plugins: ['babel'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-filename-extension': 'off',
        'no-undef': 'off',
        'import/prefer-default-export': 'off',
        'linebreak-style': 'off', // Неправильно работает в Windows.
        'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
        'jsx-a11y/label-has-for': [
            2,
            {
                required: {
                    every: ['id'],
                },
            },
        ], // для ошибки вложенных свойств htmlFor элементов label
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.js',
            },
        },
    },
};
