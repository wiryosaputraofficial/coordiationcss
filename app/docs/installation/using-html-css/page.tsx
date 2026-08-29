import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = {
  title: "Install Coordiation CSS with plain HTML and CSS",
  description: "Compile Coordiation CSS for a framework-free HTML site with the official CLI in build or watch mode.",
};

export default function UsingHtmlCssPage() {
  return <FrameworkGuide
    title="Using HTML + CSS"
    platform="HTML and CSS"
    lead={<>Use the framework compiler directly—no JavaScript framework or bundler required. The CLI scans your HTML and writes a normal static CSS file.</>}
    note={<>The generated file has no browser runtime. Upload it beside your HTML just like any other stylesheet.</>}
    steps={[
      { title: "Create a small npm project", body: <p>Initialize package metadata and install the Coordiation compiler as a development dependency.</p>, samples: [{ title: "Terminal", code: "npm init -y\nnpm install -D @coordiation/css" }] },
      { title: "Create the source stylesheet", body: <p>The input file owns the framework marker, custom theme tokens, utilities, variants, and ordinary project CSS.</p>, samples: [{ title: "src/coordiation.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}` }] },
      { title: "Add build scripts", body: <p>Watch while developing and minify for production. Scanning the project root is safe because dependency and output directories are ignored.</p>, samples: [{ title: "package.json", code: `{
  "scripts": {
    "dev": "coordiation-css -i src/coordiation.css -o dist/coordiation.css --content . --watch",
    "build": "coordiation-css -i src/coordiation.css -o dist/coordiation.css --content . --minify"
  },
  "devDependencies": {
    "@coordiation/css": "0.1.0"
  }
}` }] },
      { title: "Load the generated file", body: <p>Reference the output CSS from your HTML. Keep <code>dist/coordiation.css</code> generated rather than editing it manually.</p>, samples: [{ title: "index.html", code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="./dist/coordiation.css" />
  </head>
  <body class="co-bg-white co-text-black">
    <main class="co-grid co-min-h-screen co-place-items-center">
      <h1 class="co-text-6xl co-font-bold">Built with Coordiation</h1>
    </main>
  </body>
</html>` }] },
      { title: "Build or watch", body: <p>Leave watch mode running during development. Run the production command before uploading the site.</p>, samples: [{ title: "Terminal", code: "npm run dev\n\n# production\nnpm run build" }] },
    ]}
    checklist={[
      <>Upload both the HTML files and the generated <code>dist/coordiation.css</code>.</>,
      <>Do not author changes directly inside the generated CSS output.</>,
      <>Use complete class names in HTML, JavaScript templates, and Markdown content.</>,
      <>Run the minified production build after adding or removing utilities.</>,
    ]}
    official={{ href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started", label: "MDN CSS" }}
    previous={{ href: "/docs/installation/using-svelte", label: "Using SvelteKit" }}
    next={{ href: "/docs/installation/using-php", label: "Using PHP" }}
  />;
}
