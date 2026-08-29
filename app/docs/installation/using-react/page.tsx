import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/installation/using-react", ...{
  title: "Install Coordiation CSS with React",
  description: "Add Coordiation CSS to a React application with Vite, automatic source scanning, fast updates, and zero browser runtime.",
} });

export default function UsingReactPage() {
  return <FrameworkGuide
    title="Using React"
    platform="React + Vite"
    lead={<>Add Coordiation to a React application through the official Vite adapter, scan JSX and TSX source files, and load the generated stylesheet once from the application entry.</>}
    note={<>This guide uses Vite, the recommended setup for a client-side React application. Coordiation generates static CSS during development and production builds, so it adds no styling runtime to the browser.</>}
    steps={[
      { title: "Create a React project", body: <p>Start with Vite&apos;s React template, or skip this step when you already have a React application powered by Vite.</p>, samples: [{ title: "Terminal", code: `npm create vite@latest my-coordiation-app -- --template react
cd my-coordiation-app
npm install` }] },
      { title: "Install Coordiation", body: <p>Add the compiler and official Vite adapter as development dependencies. Your application continues to use its existing React packages.</p>, samples: [{ title: "Terminal", code: "npm install -D @coordiation/css @coordiation/vite" }] },
      { title: "Register the Vite plugin", body: <p>Keep the React plugin and add Coordiation to the same plugin array. The <code>src</code> directory becomes the explicit source-scanning boundary.</p>, samples: [{ title: "vite.config.js", code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import coordiation from "@coordiation/vite";

export default defineConfig({
  plugins: [
    react(),
    coordiation({
      content: ["src"],
      cssFile: "src/coordiation.css",
      sourceMap: true,
      toolchain: {
        minify: process.env.NODE_ENV === "production"
      }
    })
  ]
});` }] },
      { title: "Create the CSS entry", body: <p>The framework marker is replaced with the preflight, theme tokens, variants, and utilities found in your React source files.</p>, samples: [{ title: "src/coordiation.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
  --co-color-brand-600: oklch(54.6% 0.245 262.881);
}` }] },
      { title: "Import the generated stylesheet", body: <p>Load the virtual stylesheet exactly once from the client entry. You do not need to import the source CSS file separately.</p>, samples: [{ title: "src/main.jsx", code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "virtual:coordiation.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);` }] },
      { title: "Use utilities in React", body: <p>Use complete literal <code>co-*</code> class names in <code>className</code>. Vite updates the generated stylesheet when JSX, TSX, or the theme entry changes.</p>, samples: [{ title: "src/App.jsx", code: `export default function App() {
  return (
    <main className="co-grid co-min-h-screen co-place-items-center co-bg-black co-p-8 co-text-white">
      <section className="co-max-w-2xl co-text-center">
        <p className="co-text-sm co-uppercase co-tracking-widest">
          React + Coordiation
        </p>
        <h1 className="co-mt-4 co-text-6xl co-font-bold co-tracking-tight">
          Build useful interfaces.
        </h1>
      </section>
    </main>
  );
}` }, { title: "Terminal", code: "npm run dev\n\n# production\nnpm run build" }] },
    ]}
    checklist={[
      <>Use a supported Node.js version for the current Vite release.</>,
      <>Keep <code>content: [&quot;src&quot;]</code> aligned with every directory that contains JSX or TSX.</>,
      <>Import <code>virtual:coordiation.css</code> exactly once from <code>main.jsx</code> or <code>main.tsx</code>.</>,
      <>Map conditional styles to complete strings instead of concatenating partial <code>co-</code> class names.</>,
      <>Run <code>npm run build</code> before deployment to verify the production stylesheet.</>,
    ]}
    official={{ href: "https://vite.dev/guide/", label: "Vite React setup" }}
    previous={{ href: "/docs/installation/using-cli", label: "Using the CLI" }}
    next={{ href: "/docs/installation/using-nextjs", label: "Using Next.js" }}
  />;
}
