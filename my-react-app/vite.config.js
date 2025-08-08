import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      eslint: {
        // Отключаем проверку prop-types
        rules: {
          'react/prop-types': 'off',
        }
      }
    })
  ],
	base: '/FuncQuiz/',
})
