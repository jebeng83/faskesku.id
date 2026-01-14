import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "node_modules/**",
      "public/**",
      "vendor/**",
      "storage/**",
      "resources/js/actions/**",
      "resources/js/routes/farmasi/**",
      "**/*.d.ts",
    ],
  },
  js.configs.recommended,
  {
    files: ["resources/js/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: false, // Disable project-based type checking for performance
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly",
        console: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        URL: "readonly",
        Request: "readonly",
        Headers: "readonly",
        URLSearchParams: "readonly",
        alert: "readonly",
        confirm: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        AbortController: "readonly",
        btoa: "readonly",
        atob: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        IntersectionObserver: "readonly",
        BroadcastChannel: "readonly",
        FileReader: "readonly",
        File: "readonly",
        Image: "readonly",
        history: "readonly",
        Blob: "readonly",
        Audio: "readonly",
        // Node globals
        process: "readonly",
        // Custom globals
        route: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...js.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": "warn",
      "no-useless-escape": "off",
      "no-empty": "off",
      "no-constant-binary-expression": "warn",
      "no-useless-catch": "warn",
      "no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      "no-var": "warn",
      
    },
  },
];
