import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3001',  // Add your base URL here
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
