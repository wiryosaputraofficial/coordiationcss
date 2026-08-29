import { createSeoMetadata } from "@/app/seo";
import type { Metadata } from "next";
import FrameworkGuide from "../_components/FrameworkGuide";

export const metadata: Metadata = createSeoMetadata({ path: "/docs/installation/using-wordpress", ...{
  title: "Install Coordiation CSS with WordPress",
  description: "Compile Coordiation CSS inside a WordPress theme, scan PHP templates and block patterns, and enqueue the generated stylesheet correctly.",
} });

export default function UsingWordpressPage() {
  return <FrameworkGuide
    title="Using WordPress"
    platform="WordPress"
    lead={<>Build Coordiation inside a custom or child theme, scan PHP templates and patterns, then enqueue one generated stylesheet through the WordPress asset API.</>}
    note={<>Run the compiler from your theme directory. WordPress serves the generated CSS; Node.js is needed only during development or CI.</>}
    steps={[
      { title: "Install inside the theme", body: <p>Open the active custom or child theme directory, initialize npm if necessary, and add the compiler.</p>, samples: [{ title: "Terminal", code: "cd wp-content/themes/your-theme\nnpm init -y\nnpm install -D @coordiation/css" }] },
      { title: "Create the source stylesheet", body: <p>Separate the editable input from the generated asset that WordPress will enqueue.</p>, samples: [{ title: "assets/css/coordiation.input.css", code: `@coordiation;

@co-theme {
  --co-color-brand-500: oklch(62.3% 0.214 259.815);
}` }] },
      { title: "Add theme build scripts", body: <p>The theme root is scanned for PHP templates, template parts, and block patterns. Dependencies, caches, and generated output directories are ignored automatically.</p>, samples: [{ title: "package.json", code: `{
  "scripts": {
    "dev": "coordiation-css -i assets/css/coordiation.input.css -o assets/css/coordiation.css --content . --exclude \"vendor/**\" --watch",
    "build": "coordiation-css -i assets/css/coordiation.input.css -o assets/css/coordiation.css --content . --exclude \"vendor/**\" --minify"
  },
  "devDependencies": {
    "@coordiation/css": "0.1.0"
  }
}` }] },
      { title: "Enqueue the generated CSS", body: <p>Use WordPress&apos;s stylesheet queue and the file modification time for cache busting.</p>, samples: [{ title: "functions.php", code: `<?php
function coordiation_theme_assets() {
    $relative_path = "assets/css/coordiation.css";
    $absolute_path = get_theme_file_path($relative_path);

    wp_enqueue_style(
        "coordiation-theme",
        get_theme_file_uri($relative_path),
        array(),
        file_exists($absolute_path) ? filemtime($absolute_path) : null
    );
}

add_action("wp_enqueue_scripts", "coordiation_theme_assets");` }] },
      { title: "Use utilities in templates", body: <p>Literal classes in theme PHP files are included by the built-in scanner. Run watch mode while editing and build once before packaging the theme.</p>, samples: [{ title: "template-parts/hero.php", code: `<section class="co-grid co-min-h-screen co-place-items-center co-bg-black co-text-white">
  <h1 class="co-text-6xl co-font-bold">
    <?php echo esc_html(get_the_title()); ?>
  </h1>
</section>` }, { title: "Terminal", code: "npm run dev\n\n# before uploading the theme\nnpm run build" }] },
    ]}
    checklist={[
      <>Commit or package <code>assets/css/coordiation.css</code> with the production theme.</>,
      <>Use a child theme when modifying a third-party theme so vendor updates do not overwrite the integration.</>,
      <>Add external plugin-template directories as extra <code>--content</code> entries when those templates use Coordiation classes.</>,
      <>For editor-canvas parity, enqueue the generated stylesheet for block-editor assets according to the theme&apos;s editor strategy.</>,
    ]}
    official={{ href: "https://developer.wordpress.org/themes/core-concepts/including-assets/", label: "WordPress theme assets" }}
    previous={{ href: "/docs/installation/using-php", label: "Using PHP" }}
    next={{ href: "/docs/installation/using-npm", label: "Install from npm" }}
  />;
}
