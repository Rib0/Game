module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: ['airbnb-typescript', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parserOptions: {
        project: './tsconfig.eslint.json',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        tsconfigRootDir: __dirname,
    },
    env: {
        node: true,
        browser: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx'],
            },
            webpack: {
                config: 'webpack.config.js',
            },
            typescript: {},
        },
    },
    plugins: ['react', '@stylistic/js', '@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/naming-convention': 'warn',
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'prettier/prettier': 'error',
        'object-curly-spacing': ['error', 'always'],
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
    },
    ignorePatterns: ['node_modules', '.vscode', 'index.html', 'build', 'webpack.config.js'],
};
