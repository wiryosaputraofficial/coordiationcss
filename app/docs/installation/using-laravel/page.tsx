import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/installation/using-laravel", ...{
  title: "Install Coordiation CSS with Laravel",
  description: "Add Coordiation CSS to Laravel's Vite pipeline and scan Blade, JavaScript, TypeScript, Vue, and React source files.",
} });

export default function UsingLaravelPage() {
  return <FrameworkGuide
    title="Using Laravel"
    platform="Laravel"
    lead={<>Extend Laravel&apos;s existing Vite configuration with Coordiation, scan the <code>resources</code> directory, and load the virtual stylesheet from the application entry.</>}
    note={<>The scanner recognizes <code>.php</code> files, so literal utilities written directly in Blade templates are included automatically.</>}
    steps={[
      { title: "Install the Vite adapter", body: <p>Keep Laravel&apos;s existing Vite packages and add the Coordiation compiler plus its adapter.</p>, samples: [{ title: "Terminal", code: "npm install -D @coordiation/css @coordiation/vite" }] },
      { title: "Extend Laravel Vite", body: <p>Preserve the Laravel plugin and add Coordiation to the same plugin array. The complete <code>resources</code> tree becomes the scan boundary.</p>, samples: [{ title: "vite.config.js", code: `import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import coordiation from "@coordiation/vite";

export default defineConfig({
  plugins: [
    coordiation({
      content: ["resources"],
      cssFile: "resources/css/coordiation.css"
    }),
    laravel({
      input: ["resources/js/app.js"],
      refresh: true
    })
  ]
});` }] },
      { title: "Create the CSS entry", body: <p>Add the framework marker and any project-specific theme tokens.</p>, samples: [{ title: "resources/css/coordiation.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}` }] },
      { title: "Import generated CSS", body: <p>Load the virtual module through Laravel&apos;s JavaScript entry, then keep the normal Blade <code>@vite</code> directive.</p>, samples: [{ title: "resources/js/app.js", code: `import "./bootstrap";
import "virtual:coordiation.css";` }, { title: "resources/views/layouts/app.blade.php", code: `<!doctype html>
<html lang="en">
  <head>
    @vite("resources/js/app.js")
  </head>
  <body>
    @yield("content")
  </body>
</html>` }] },
      { title: "Use utilities in Blade", body: <p>Blade templates, Livewire views, and frontend components are scanned when they live beneath <code>resources</code>.</p>, samples: [{ title: "resources/views/welcome.blade.php", code: `<main class="co-grid co-min-h-screen co-place-items-center co-bg-black co-text-white">
  <h1 class="co-text-6xl co-font-bold">Built with Coordiation</h1>
</main>` }, { title: "Terminal", code: "npm run dev\nnpm run build" }] },
    ]}
    checklist={[
      <>Keep Laravel&apos;s <code>@vite</code> directive pointed at the JavaScript entry that imports the virtual stylesheet.</>,
      <>Add package or module view directories to <code>content</code> when templates live outside <code>resources</code>.</>,
      <>Write complete candidates inside Blade conditionals instead of concatenating class fragments.</>,
      <>Run <code>npm run build</code> before deploying PHP files and the generated Vite manifest.</>,
    ]}
    official={{ href: "https://laravel.com/docs/vite", label: "Laravel Vite" }}
    previous={{ href: "/docs/installation/using-astro", label: "Using Astro" }}
    next={{ href: "/docs/installation/using-svelte", label: "Using SvelteKit" }}
  />;
}
