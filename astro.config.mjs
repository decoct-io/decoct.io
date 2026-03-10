import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://decoct.io",
  output: "static",
  adapter: cloudflare(),
  integrations: [
    starlight({
      title: "decoct",
      description:
        "Compress infrastructure configuration for LLM context windows",
      logo: {
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: false,
      },
      social: {
        github: "https://github.com/decoct-io/decoct",
      },
      head: [
        {
          tag: "script",
          content: `if (!localStorage.getItem('starlight-theme')) { localStorage.setItem('starlight-theme', 'dark'); }`,
        },
      ],
      customCss: ["./src/styles/starlight-overrides.css"],
      sidebar: [],
    }),
  ],
});
