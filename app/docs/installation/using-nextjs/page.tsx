import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = {
  title: "Install Coordiation CSS with Next.js",
  description: "Configure Coordiation CSS in a Next.js App Router or Pages Router project through the official PostCSS adapter.",
};

export default function UsingNextjsPage() {
  return <FrameworkGuide
    title="Using Next.js"
    platform="Next.js"
    lead={<>Connect Coordiation to the PostCSS pipeline already used by Next.js, scan your application source, and import one global stylesheet from the root layout.</>}
    note={<>Use <code>@coordiation/postcss</code> rather than the Vite adapter. The same setup works with Turbopack and production builds because Next.js owns the PostCSS runner.</>}
    steps={[
      { title: "Install the compiler and adapter", body: <p>Install the core compiler, PostCSS 8, and the official Coordiation PostCSS adapter.</p>, samples: [{ title: "Terminal", code: "npm install -D postcss @coordiation/css @coordiation/postcss" }] },
      { title: "Configure PostCSS", body: <p>Scan the directories that contain literal <code>co-*</code> classes. If your project uses a <code>src</code> directory, replace the content list with <code>[&quot;src&quot;]</code>.</p>, samples: [{ title: "postcss.config.mjs", code: `export default {
  plugins: {
    "@coordiation/postcss": {
      content: ["app", "components"],
      cwd: process.cwd(),
      toolchain: {
        minify: process.env.NODE_ENV === "production"
      }
    }
  }
};` }] },
      { title: "Create the CSS entry", body: <p>The top-level marker is replaced with the generated preflight, tokens, variants, and utilities found in your source files.</p>, samples: [{ title: "app/globals.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}` }] },
      { title: "Import it once", body: <p>Load the global stylesheet from the root layout. Pages Router projects should import it from <code>pages/_app.tsx</code> instead.</p>, samples: [{ title: "app/layout.tsx", code: `import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}` }] },
      { title: "Use literal utilities", body: <p>Keep every candidate complete so server rendering, client components, the scanner, and AI tooling all observe the same class contract.</p>, samples: [{ title: "app/page.tsx", code: `export default function Page() {
  return (
    <main className="co-grid co-min-h-screen co-place-items-center co-bg-black co-text-white">
      <h1 className="co-text-6xl co-font-bold">Built with Coordiation</h1>
    </main>
  );
}` }, { title: "Terminal", code: "npm run dev\nnpm run build" }] },
    ]}
    checklist={[
      <>Use <code>content: [&quot;src&quot;]</code> when both <code>app</code> and <code>components</code> live under <code>src</code>.</>,
      <>Import the global CSS only once from the root layout or <code>pages/_app</code>.</>,
      <>Do not add a second nesting, prefixing, or minification plugin unless that Coordiation toolchain stage is disabled.</>,
      <>Map conditional styles to complete literal class strings; do not concatenate <code>co-</code> candidates.</>,
    ]}
    official={{ href: "https://nextjs.org/docs/app/getting-started/css", label: "Next.js CSS" }}
    previous={{ href: "/docs/installation/using-cli", label: "Using the CLI" }}
    next={{ href: "/docs/installation/using-astro", label: "Using Astro" }}
  />;
}
