import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import unusedImports from 'eslint-plugin-unused-imports'; // ⬅️ tambahkan ini
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'unused-imports': unusedImports, // ⬅️ daftar plugin
    },
    rules: {
      'unused-imports/no-unused-imports': 'error', // ⬅️ aturan wajib
      '@typescript-eslint/ban-ts-comment': 'off',
    },
    extends: [js.configs.recommended, tseslint.configs.recommended, reactHooks.configs['recommended-latest'], reactRefresh.configs.vite],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
