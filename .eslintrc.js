module.exports = {
    env: {
        browser: true,
        amd: true,
        node: true,
        jest: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/quotes': ['warn', 'single'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
};
