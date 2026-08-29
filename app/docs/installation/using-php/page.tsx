import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = {
  title: "Install Coordiation CSS with PHP",
  description: "Scan PHP templates with the Coordiation CLI and generate a static production stylesheet without a browser runtime.",
};

export default function UsingPhpPage() {
  return <FrameworkGuide
    title="Using PHP"
    platform="PHP"
    lead={<>Compile Coordiation beside your PHP application. The scanner understands <code>.php</code> templates and produces a static CSS asset your server can deliver normally.</>}
    note={<>Node.js is needed only on the development or CI machine. The deployed PHP application receives ordinary CSS and does not run Coordiation in the browser.</>}
    steps={[
      { title: "Install the compiler", body: <p>Run npm from the PHP project root and keep the package as a development-only dependency.</p>, samples: [{ title: "Terminal", code: "npm init -y\nnpm install -D @coordiation/css" }] },
      { title: "Create a framework entry", body: <p>Keep source directives outside the public output file.</p>, samples: [{ title: "assets/css/coordiation.input.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}` }] },
      { title: "Define development and production builds", body: <p>This example scans PHP templates in <code>public</code> and reusable templates in <code>views</code>.</p>, samples: [{ title: "package.json", code: `{
  "scripts": {
    "dev": "coordiation-css -i assets/css/coordiation.input.css -o public/assets/coordiation.css --content public --content views --watch",
    "build": "coordiation-css -i assets/css/coordiation.input.css -o public/assets/coordiation.css --content public --content views --minify"
  },
  "devDependencies": {
    "@coordiation/css": "0.1.0"
  }
}` }] },
      { title: "Link the generated asset", body: <p>Serve the output file from the public document root and use utilities directly in PHP templates.</p>, samples: [{ title: "views/layout.php", code: `<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="/assets/coordiation.css" />
  </head>
  <body class="co-bg-white co-text-black">
    <?= $content ?>
  </body>
</html>` }, { title: "views/home.php", code: `<main class="co-grid co-min-h-screen co-place-items-center">
  <h1 class="co-text-6xl co-font-bold">
    <?= htmlspecialchars($title, ENT_QUOTES, "UTF-8") ?>
  </h1>
</main>` }] },
      { title: "Build before deployment", body: <p>Development watch mode recompiles after PHP template changes. CI should run the minified build before packaging the public directory.</p>, samples: [{ title: "Terminal", code: "npm run dev\n\n# production\nnpm run build" }] },
    ]}
    checklist={[
      <>Include every PHP template directory with a repeatable <code>--content</code> option.</>,
      <>Deploy <code>public/assets/coordiation.css</code>; Node.js is not required on the PHP server.</>,
      <>Keep PHP conditions mapped to complete literal class strings.</>,
      <>Generate the stylesheet before an immutable or read-only deployment artifact is created.</>,
    ]}
    official={{ href: "https://www.php.net/manual/en/language.basic-syntax.phpmode.php", label: "PHP templates" }}
    previous={{ href: "/docs/installation/using-html-css", label: "Using HTML and CSS" }}
    next={{ href: "/docs/installation/using-wordpress", label: "Using WordPress" }}
  />;
}
