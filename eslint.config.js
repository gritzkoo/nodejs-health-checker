import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: "./tsconfig.eslint.json"
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'double'],
      'semi': ['error', 'always'],
      'max-len': ['error', { 'code': 180 }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
    },
  },
];
