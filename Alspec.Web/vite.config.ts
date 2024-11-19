import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from 'vite-plugin-dynamic-import'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log('apiurl', env);
  console.log('mode', mode)
  return {
    plugins: [react({
      babel: {
        plugins: [
          'babel-plugin-macros'
        ]
      }
    }),
    dynamicImport()],
    assetsInclude: ['**/*.md'],
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'build'
    }
  }
});
