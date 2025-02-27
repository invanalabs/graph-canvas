module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    // extends: [
    //     'eslint:recommended',
    //     'plugin:@typescript-eslint/recommended'
    // ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        // "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
        // 'block-spacing': ['error', 'always'],
    }
}
