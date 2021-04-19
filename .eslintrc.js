module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'import/no-duplicates': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx', '.js', '.ts', '.jsx'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          'module',
          '/^~/constants/',
          '/^~/routes/',
          '/^~/hooks/',
          '/^~/pages/',
          '/^~/components/',
          '/^~/styles/',
          '/^~/assets/',
          '/^~/utils/',
          '/^~/interfaces/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'desc',
          ignoreCase: true,
        },
      },
    ],
    'prettier/prettier': 'error',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-curly-newline': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
