import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', '.next', 'coverage'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.base.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@manoxen/backend', '@manoxen/backend/*'],
              message: 'Frontend cannot import from Backend. Use @manoxen/shared-types instead.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['apps/backend/**/*', 'packages/**/*', 'libs/**/*', 'domains/**/*'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
];
