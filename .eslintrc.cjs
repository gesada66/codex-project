module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  settings: { 'import/resolver': { typescript: true } },
  rules: {
    'no-console': 'off',
    'import/order': [
      'error',
      { 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } },
    ],
  },
  ignorePatterns: ['dist', 'node_modules'],
};

