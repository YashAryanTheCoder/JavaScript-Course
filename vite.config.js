import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'JavaScript-Course'
  const isUserOrOrganizationSite = repositoryName.toLowerCase().endsWith('.github.io')

  return {
    base: command === 'serve' || isUserOrOrganizationSite ? '/' : `/${repositoryName}/`,
    build: {
      outDir: 'docs',
    },
    plugins: [react()],
  }
})
