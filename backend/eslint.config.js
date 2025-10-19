// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import eslintPluginImport from "eslint-plugin-import";

export default [
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: globals.node,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            import: eslintPluginImport,
        },
        ignores: ["node_modules", "dist", "coverage"],
        rules: {
            ...js.configs.recommended.rules,
            // === Code Quality ===
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "off",

            // === Imports ===
            "import/extensions": [
                "error",
                "ignorePackages",
                { js: "always" },
            ],
            "import/order": [
                "warn",
                {
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                    "newlines-between": "always",
                },
            ],

            // === Style consistency ===
            quotes: ["error", "double"],
            semi: ["error", "always"],
            indent: ["error", 4, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1 }],
            "comma-dangle": ["error", "always-multiline"],
            "object-curly-spacing": ["error", "always"],
            "arrow-parens": ["error", "always"],
        },
    },
];
