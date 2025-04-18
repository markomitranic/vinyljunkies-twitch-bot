import js from "@eslint/js";
import * as tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      /**
       * We prefer `type` over `interface` for consistency.
       * In modern Node, there is basically no actual difference.
       */
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

      /**
       * If only a type is used, only a type import should be used.
       * Type imports are not separated from other imports.
       */
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      /**
       * Any unused variables without a `_` prefix should error.
       * Note: you must disable the base rule as it can report incorrect errors
       */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      /**
       * If a function is async, but has no awaits, it should error.
       * Note: you must disable the base rule as it can report incorrect errors
       */
      "require-await": "off",
      "@typescript-eslint/require-await": "error",

      /**
       * Forbids providing Promises without await, to places that don't expect them.
       * For example `if` statements. Only exception - JSX attributes.
       */
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: { attributes: false },
        },
      ],
    },
    /**
     * Some rules require to read type information.
     * @see https://typescript-eslint.io/getting-started/typed-linting
     */
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
