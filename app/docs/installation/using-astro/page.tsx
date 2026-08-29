import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = {
  title: "Install Coordiation CSS with Astro",
  description: "Use the official Coordiation Vite adapter inside Astro and scan Astro components, layouts, scripts, and content.",
};

export default function UsingAstroPage() {
  return <FrameworkGuide
    title="Using Astro"
    platform="Astro"
    lead={<>Add Coordiation as a Vite plugin inside Astro, scan the complete <code>src</code> tree, and import the generated virtual stylesheet from your shared layout.</>}
    note={<>Astro exposes a <code>vite</code> configuration object, so the official <code>@coordiation/vite</code> adapter provides fast updates without a separate watcher.</>}
    steps={[
      { title: "Install the Vite adapter", body: <p>Astro already runs on Vite. Add only the Coordiation compiler and its official Vite adapter.</p>, samples: [{ title: "Terminal", code: "npm install -D @coordiation/css @coordiation/vite" }] },
      { title: "Register the plugin", body: <p>Point the scanner at <code>src</code> so it covers <code>.astro</code>, framework components, Markdown, MDX, and scripts.</p>, samples: [{ title: "astro.config.mjs", code: `import { defineConfig } from "astro/config";
import coordiation from "@coordiation/vite";

export default defineConfig({
  vite: {
    plugins: [
      coordiation({
        content: ["src"],
        cssFile: "src/styles/coordiation.css"
      })
    ]
  }
});` }] },
      { title: "Create your theme entry", body: <p>Keep framework directives and project-owned CSS together in a source file that Astro and Vite can watch.</p>, samples: [{ title: "src/styles/coordiation.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}` }] },
      { title: "Import the virtual stylesheet", body: <p>Import once from the shared layout used by every page. The virtual module contains the compiled CSS.</p>, samples: [{ title: "src/layouts/Layout.astro", code: `---
import "virtual:coordiation.css";
---

<!doctype html>
<html lang="en">
  <body>
    <slot />
  </body>
</html>` }] },
      { title: "Style Astro markup", body: <p>Utilities inside <code>.astro</code> templates are part of the default scanner contract.</p>, samples: [{ title: "src/pages/index.astro", code: `---
import Layout from "../layouts/Layout.astro";
---

<Layout>
  <main class="co-grid co-min-h-screen co-place-items-center co-bg-black co-text-white">
    <h1 class="co-text-6xl co-font-bold">Built with Coordiation</h1>
  </main>
</Layout>` }, { title: "Terminal", code: "npm run dev\nnpm run build" }] },
    ]}
    checklist={[
      <>Keep <code>virtual:coordiation.css</code> imported by a layout shared across every route.</>,
      <>Include additional source roots in <code>content</code> when components live outside <code>src</code>.</>,
      <>Use literal class names in Astro expressions and UI-framework islands.</>,
      <>Run the production build in CI so missing scanner paths fail before deployment.</>,
    ]}
    official={{ href: "https://docs.astro.build/en/reference/configuration-reference/#vite", label: "Astro Vite configuration" }}
    previous={{ href: "/docs/installation/using-nextjs", label: "Using Next.js" }}
    next={{ href: "/docs/installation/using-laravel", label: "Using Laravel" }}
  />;
}
