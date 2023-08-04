module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['prettier', 'import', '@typescript-eslint'],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "prettier",
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    rules: {
        'no-debugger': 0,
        'no-console': 0,
        'class-methods-use-this': 0,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/explicit-member-accessibility': [
        2,
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 0,
                    methods: 'explicit',
                    properties: 'explicit',
                    parameterProperties: 'explicit',
                },
            },
        ],
        "prettier/prettier" : "error",
        'max-lines-per-function': [2, 40],
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/no-unnecessary-type-assertion': 2,
        '@typescript-eslint/no-non-null-assertion': 2,
    },
    root: true,
};