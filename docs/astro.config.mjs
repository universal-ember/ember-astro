// @ts-check
import { defineConfig } from "astro/config";
import ember from "ember-astro";

// https://astro.build/config
export default defineConfig({
  integrations: [ember(),
  /**
    * This inline plugin allows me to make changes to the actual ember-astro plugin
    * without needing to close and re-start the server
  */
  {
    name: 'ember-astro:local-dev',
    hooks: {
      'astro:config:setup': async (options) => {
        options.updateConfig({
          vite: {
            optimizeDeps: {
              exclude: ['ember-astro']
            }
          }
        })
      }
    }
  }],
});
