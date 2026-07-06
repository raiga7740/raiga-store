// node tools/generate-product-pages.js // 
// Untuk otomatis generate produk jalankan di terminal //

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const scriptPath = path.join(rootDir, "script.js");
const detailPath = path.join(rootDir, "detail.html");
const indexPath = path.join(rootDir, "index.html");
const sitemapPath = path.join(rootDir, "sitemap.xml");
const productDir = path.join(rootDir, "product");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function extractProducts(scriptContent) {
  const start = scriptContent.indexOf("const products = [");

  if (start === -1) {
    throw new Error("Tidak menemukan `const products = [` di script.js");
  }

  const arrayStart = scriptContent.indexOf("[", start);
  let depth = 0;

  for (let index = arrayStart; index < scriptContent.length; index += 1) {
    const char = scriptContent[index];

    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;

    if (depth === 0) {
      const productsSource = scriptContent.slice(start, index + 2);
      return new Function(`${productsSource}; return products;`)();
    }
  }

  throw new Error("Array products di script.js tidak tertutup dengan benar");
}

function buildProductTemplate(detailHtml) {
  return detailHtml
    .replaceAll('href="index.html"', 'href="../../index.html"')
    .replaceAll('href="logo/LogoStore.png"', 'href="../../logo/LogoStore.png"')
    .replaceAll('src="logo/LogoStore.png"', 'src="../../logo/LogoStore.png"')
    .replaceAll('href="style.css"', 'href="../../style.css"')
    .replaceAll('src="script.js"', 'src="../../script.js"');
}

function buildNoscriptProducts(products) {
  const links = products
    .map((product) => `          <a href="product/${product.slug}">${product.name}</a>`)
    .join("\n");

  return `      <noscript>
        <div class="noscript-products">
${links}
        </div>
      </noscript>`;
}

function updateIndexNoscript(indexHtml, products) {
  const noscriptPattern = /      <noscript>\r?\n        <div class="noscript-products">[\s\S]*?        <\/div>\r?\n      <\/noscript>/;

  if (!noscriptPattern.test(indexHtml)) {
    throw new Error("Tidak menemukan blok noscript products di index.html");
  }

  return indexHtml.replace(noscriptPattern, buildNoscriptProducts(products));
}

function buildSitemap(products) {
  const today = new Date().toISOString().slice(0, 10);
  const homeUrl = `  <url>
    <loc>https://www.raiga.my.id/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

  const productUrls = products
    .map((product, index) => {
      const priority = index < 5 ? "0.9" : "0.8";

      return `  <url>
    <loc>https://www.raiga.my.id/product/${product.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${homeUrl}
${productUrls}
</urlset>
`;
}

const products = extractProducts(read(scriptPath));
const productTemplate = buildProductTemplate(read(detailPath));

products.forEach((product) => {
  write(path.join(productDir, product.slug, "index.html"), productTemplate);
});

write(indexPath, updateIndexNoscript(read(indexPath), products));
write(sitemapPath, buildSitemap(products));

console.log(`Generated ${products.length} product pages, index noscript links, and sitemap.xml.`);
