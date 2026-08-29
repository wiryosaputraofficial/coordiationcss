import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/installation/using-svelte", ...{
  title: "Install Coordiation CSS with SvelteKit",
  description: "Configure Coordiation CSS through SvelteKit's Vite pipeline and import the generated stylesheet from the root layout.",
} });

export default function UsingSveltePage() {
  return <FrameworkGuide
    title="Using SvelteKit"
    platform="SvelteKit"
    lead={<>Register the Coordiation Vite adapter beside SvelteKit, scan the <code>src</code> tree, and load the generated stylesheet from the root layout.</>}
    note={<>The default scanner reads <code>.svelte</code>, JavaScript, TypeScript, HTML, Markdown, and MDX files without an additional extractor.</>}
    steps={[
      { title: "Install Coordiation", body: <p>SvelteKit already includes Vite. Add the compiler and the official Vite adapter.</p>, samples: [{ title: "Terminal", code: "npm install -D @coordiation/css @coordiation/vite" }] },
      { title: "Register both Vite plugins", body: <p>Keep <code>sveltekit()</code> and add Coordiation as a pre-transform plugin.</p>, samples: [{ title: "vite.config.ts", code: `import { sveltekit } from "@sveltejs/kit/vite";
import coordiation from "@coordiation/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    coordiation({
      content: ["src"],
      cssFile: "src/coordiation.css"
    }),
    sveltekit()
  ]
});` }] },
      { title: "Create the CSS entry", body: <p>Use one watched stylesheet for framework generation and theme ownership.</p>, samples: [{ title: "src/coordiation.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}` }] },
      { title: "Load it from the root layout", body: <p>A root layout keeps the generated stylesheet active across every SvelteKit route.</p>, samples: [{ title: "src/routes/+layout.svelte", code: `<script>
  import "virtual:coordiation.css";
  let { children } = $props();
</script>

{@render children()}` }] },
      { title: "Use utilities in components", body: <p>Keep conditional variants as complete class strings so the compiler can discover them.</p>, samples: [{ title: "src/routes/+page.svelte", code: `<main class="co-grid co-min-h-screen co-place-items-center co-bg-black co-text-white">
  <h1 class="co-text-6xl co-font-bold">Built with Coordiation</h1>
</main>` }, { title: "Terminal", code: "npm run dev\nnpm run build" }] },
    ]}
    checklist={[
      <>Import <code>virtual:coordiation.css</code> only once from the highest shared layout.</>,
      <>Keep component libraries inside the configured <code>content</code> boundary.</>,
      <>Map Svelte conditional classes to complete strings or add the finite set to a safelist.</>,
      <>Validate the adapter with the same <code>npm run build</code> command used by your deployment target.</>,
    ]}
    official={{ href: "https://svelte.dev/docs/kit", label: "SvelteKit" }}
    previous={{ href: "/docs/installation/using-laravel", label: "Using Laravel" }}
    next={{ href: "/docs/installation/using-html-css", label: "Using HTML and CSS" }}
  />;
}
