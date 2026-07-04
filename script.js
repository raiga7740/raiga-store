const whatsappNumber = "6281234567890";
const discordOrderUrl = "https://discord.gg/xw4CvTeayV";
const siteUrl = "https://domain.com";

const products = [
  {
    id: "netflix",
    slug: "netflix",
    category: "streaming",
    name: "Netflix",
    image: "assets/netflix.jpg",
    desc: "Akun premium untuk menonton film, series, dan drama favorit dengan kualitas HD.",
    prices: [
      { paket: "1 Bulan", harga: "25K" },
      { paket: "3 Bulan", harga: "60K" }
    ]
  },
  {
    id: "capcut",
    slug: "capcut-pro",
    category: "editing",
    name: "CapCut Pro",
    image: "assets/capcut.jpg",
    desc: "Nikmati fitur editing premium, template pro, dan export video tanpa batas.",
    prices: [
      { paket: "1 Bulan", harga: "20K" },
      { paket: "3 Bulan", harga: "50K" }
    ]
  },
  {
    id: "spotify",
    slug: "spotify-premium",
    category: "music",
    name: "Spotify Premium",
    image: "assets/spotify.jpg",
    desc: "Dengarkan musik tanpa iklan, bisa download lagu, dan kualitas audio lebih baik.",
    prices: [
      { paket: "1 Bulan", harga: "18K" },
      { paket: "3 Bulan", harga: "45K" }
    ]
  },
  {
    id: "discord",
    slug: "discord-nitro",
    category: "community",
    name: "Discord Nitro",
    image: "assets/discord.jpg",
    desc: "Upgrade Discord kamu dengan boost server, emoji custom, dan fitur premium lainnya.",
    prices: [
      { paket: "1 Bulan", harga: "35K" },
      { paket: "3 Bulan", harga: "90K" }
    ]
  },
  {
    id: "viu",
    slug: "viu-premium",
    category: "streaming",
    name: "Viu Premium",
    image: "assets/viu.png",
    desc: "Nonton drama Korea, anime, dan series Asia tanpa gangguan iklan.",
    prices: [
      { paket: "1 Bulan", harga: "15K" },
      { paket: "3 Bulan", harga: "40K" }
    ]
  },
  {
    id: "youtube",
    slug: "youtube-premium",
    category: "streaming",
    name: "YouTube Premium",
    image: "assets/youtube.jpg",
    desc: "Nonton YouTube tanpa iklan, background play, dan akses YouTube Music.",
    prices: [
      { paket: "1 Bulan", harga: "20K" },
      { paket: "3 Bulan", harga: "55K" }
    ]
  },
  {
    id: "iqiyi",
    slug: "iqiyi",
    category: "streaming",
    name: "iQIYI",
    image: "assets/iqiyi.jpg",
    desc: "Streaming drama, anime, dan film Asia dengan akses VIP.",
    prices: [
      { paket: "1 Bulan", harga: "15K" },
      { paket: "3 Bulan", harga: "38K" }
    ]
  },
  {
    id: "bstation",
    slug: "bstation-premium",
    category: "streaming",
    name: "Bstation Premium",
    image: "assets/bstation.jpg",
    desc: "Nonton anime dan konten eksklusif Bstation dengan fitur premium.",
    prices: [
      { paket: "1 Bulan", harga: "15K" },
      { paket: "3 Bulan", harga: "35K" }
    ]
  },
  {
    id: "disney",
    slug: "disney-hotstar",
    category: "streaming",
    name: "Disney+ Hotstar",
    image: "assets/disney.jpg",
    desc: "Nonton film Disney, Marvel, Pixar, Star Wars, dan series populer lainnya.",
    prices: [
      { paket: "1 Bulan", harga: "25K" },
      { paket: "3 Bulan", harga: "65K" }
    ]
  },
  {
    id: "apple",
    slug: "apple-music",
    category: "music",
    name: "Apple Music",
    image: "assets/apple.jpg",
    desc: "Streaming jutaan lagu premium dengan kualitas audio yang jernih.",
    prices: [
      { paket: "1 Bulan", harga: "18K" },
      { paket: "3 Bulan", harga: "48K" }
    ]
  },
  {
    id: "alight",
    slug: "alight-motion",
    category: "editing",
    name: "Alight Motion Premium",
    image: "assets/alightmotion.png",
    desc: "Nikmati fitur editing premium, template pro, dan export video tanpa batas.",
    prices: [
      { paket: "1 Tahun", harga: "6K" }
    ]
  }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");

function formatHarga(harga) {
  return `Rp ${harga.replace("K", ".000")}`;
}

function hargaToNumber(harga) {
  return parseInt(harga.replace("K", "000"), 10);
}

function getProductUrl(product) {
  return `product/${product.slug}`;
}

function getAbsoluteProductUrl(product) {
  return `${siteUrl}/product/${product.slug}`;
}

function getRelatedProductUrl(product) {
  if (window.location.pathname.includes("/product/")) {
    return `../${product.slug}`;
  }

  return getProductUrl(product);
}

function getAssetUrl(path) {
  const prefix = window.location.pathname.includes("/product/") ? "../../" : "";
  return `${prefix}${path}`;
}

function getProductFromCurrentUrl() {
  const params = new URLSearchParams(window.location.search);
  const legacyId = params.get("id");
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const productIndex = pathParts.indexOf("product");
  const pathSlug = productIndex >= 0 ? pathParts[productIndex + 1] : null;
  const currentSlug = pathSlug || legacyId;

  return products.find(item =>
    item.id === currentSlug ||
    item.slug === currentSlug
  );
}

function setMetaContent(selector, attrs, value) {
  let meta = document.querySelector(selector);

  if (!meta) {
    meta = document.createElement("meta");
    document.head.appendChild(meta);
  }

  Object.entries(attrs).forEach(([key, attrValue]) => {
    meta.setAttribute(key, attrValue);
  });

  meta.setAttribute("content", value);
  return meta;
}

function setCanonical(url) {
  let link = document.getElementById("canonicalLink") || document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

function getMinPrice(prices) {
  return prices.reduce((min, item) => {
    const value = parseInt(item.harga, 10);
    const minValue = parseInt(min.harga, 10);
    return value < minValue ? item : min;
  }, prices[0]);
}

function renderProducts(data) {
  if (!productGrid) return;

  productGrid.innerHTML = "";

  data.forEach((product) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = getProductUrl(product);
    card.setAttribute("aria-label", `Lihat paket ${product.name}`);

    const cheapest = getMinPrice(product.prices);

    card.innerHTML = `
      <img src="${getAssetUrl(product.image)}" class="product-image" alt="${product.name} Premium Account RaigaStore" width="64" height="64" loading="lazy" decoding="async">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="card-divider"></div>
      <div class="card-footer">
        <div>
          <span class="from-label">Mulai dari</span>
          <span class="from-price">${formatHarga(cheapest.harga)}</span>
        </div>
        <span class="go-arrow" aria-hidden="true">&rarr;</span>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );

    renderProducts(filteredProducts);
  });
}

renderProducts(products);

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href*="product/"]');

  if (!link || window.location.protocol !== "file:") return;

  const slug = link.getAttribute("href").split("/").filter(Boolean).pop();
  const product = products.find(item => item.slug === slug);

  if (!product) return;

  event.preventDefault();
  window.location.href = `detail.html?id=${product.id}`;
});

const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");
const detailPriceList = document.getElementById("detailPriceList");
const checkoutName = document.getElementById("checkoutName");
const checkoutPrice = document.getElementById("checkoutPrice");
const checkoutBtn = document.getElementById("checkoutBtn");
const discordCheckoutBtn = document.getElementById("discordCheckoutBtn");
const accountInput = document.getElementById("accountInput");
const detailMetaDesc = document.getElementById("detailMetaDesc");
const detailOgTitle = document.getElementById("detailOgTitle");
const detailOgDesc = document.getElementById("detailOgDesc");
const detailOgImage = document.getElementById("detailOgImage");
const detailTwitterTitle = document.getElementById("detailTwitterTitle");
const detailTwitterDesc = document.getElementById("detailTwitterDesc");
const detailTwitterImage = document.getElementById("detailTwitterImage");
const relatedProducts = document.getElementById("relatedProducts");

function addProductSchema(product) {
  const prices = product.prices.map(item => hargaToNumber(item.harga));
  const lowPrice = Math.min(...prices);
  const highPrice = Math.max(...prices);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.name} Premium`,
    "sku": `RAIGA-${product.id.toUpperCase()}`,
    "url": getAbsoluteProductUrl(product),
    "image": `${siteUrl}/${product.image}`,
    "description": product.desc,
    "brand": {
      "@type": "Brand",
      "name": product.name
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "IDR",
      "lowPrice": lowPrice,
      "highPrice": highPrice,
      "offerCount": product.prices.length,
      "availability": "https://schema.org/InStock"
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function addBreadcrumbSchema(product) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${siteUrl}/#produk`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": getAbsoluteProductUrl(product)
      }
    ]
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function renderRelatedProducts(currentProduct) {
  if (!relatedProducts) return;

  const sameCategory = products.filter(product =>
    product.id !== currentProduct.id &&
    product.category === currentProduct.category
  );
  const fallback = products.filter(product => product.id !== currentProduct.id);
  const related = (sameCategory.length >= 3 ? sameCategory : fallback).slice(0, 3);

  renderProductCards(relatedProducts, related);
}

function renderProductCards(container, data) {
  container.innerHTML = "";

  data.forEach((product) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = getRelatedProductUrl(product);
    card.setAttribute("aria-label", `Lihat paket ${product.name}`);

    const cheapest = getMinPrice(product.prices);

    card.innerHTML = `
      <img src="${getAssetUrl(product.image)}" class="product-image" alt="${product.name} Premium Account RaigaStore" width="64" height="64" loading="lazy" decoding="async">
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="card-divider"></div>
      <div class="card-footer">
        <div>
          <span class="from-label">Mulai dari</span>
          <span class="from-price">${formatHarga(cheapest.harga)}</span>
        </div>
        <span class="go-arrow" aria-hidden="true">&rarr;</span>
      </div>
    `;

    container.appendChild(card);
  });
}

if (detailTitle) {
  const product = getProductFromCurrentUrl();

  if (product) {
    detailImage.src = getAssetUrl(product.image);
    detailImage.alt = `${product.name} Premium Account RaigaStore`;
    detailTitle.textContent = product.name;
    detailDesc.textContent = product.desc;

    const pageTitle = `${product.name} Premium Murah - RaigaStore`;
    const pageDesc = `Beli ${product.name} premium di RaigaStore. Pilih paket langganan, isi akun atau email, lalu order cepat via WhatsApp atau Discord.`;
    const canonicalUrl = getAbsoluteProductUrl(product);

    document.title = pageTitle;
    setCanonical(canonicalUrl);

    if (window.location.protocol !== "file:" && !window.location.pathname.includes("/product/")) {
      window.history.replaceState({}, pageTitle, getProductUrl(product));
    }

    if (detailMetaDesc) detailMetaDesc.setAttribute("content", pageDesc);
    if (detailOgTitle) detailOgTitle.setAttribute("content", pageTitle);
    if (detailOgDesc) detailOgDesc.setAttribute("content", pageDesc);
    if (detailOgImage) detailOgImage.setAttribute("content", `${siteUrl}/${product.image}`);
    if (detailTwitterTitle) detailTwitterTitle.setAttribute("content", pageTitle);
    if (detailTwitterDesc) detailTwitterDesc.setAttribute("content", pageDesc);
    if (detailTwitterImage) detailTwitterImage.setAttribute("content", `${siteUrl}/${product.image}`);

    addProductSchema(product);
    addBreadcrumbSchema(product);
    renderRelatedProducts(product);

    let selectedPackage = product.prices[0];

    function updateCheckout(item) {
      selectedPackage = item;
      checkoutName.textContent = item.paket;
      checkoutPrice.textContent = `Rp ${item.harga.replace("K", ".000")}`;

      const message = `Halo kak, saya mau order ${product.name} paket ${item.paket} harga ${item.harga}`;
      checkoutBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      if (discordCheckoutBtn) discordCheckoutBtn.href = discordOrderUrl;
    }

    detailPriceList.innerHTML = "";

    product.prices.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = `package-card ${index === 0 ? "active" : ""}`;

      card.innerHTML = `
        <small>${product.name.toUpperCase()}</small>
        <h3>${item.paket}</h3>
        <p>Rp ${item.harga.replace("K", ".000")}</p>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".package-card").forEach(el => {
          el.classList.remove("active");
        });

        card.classList.add("active");
        updateCheckout(item);
      });

      detailPriceList.appendChild(card);
    });

    updateCheckout(selectedPackage);

    checkoutBtn.addEventListener("click", () => {
      const akun = accountInput.value.trim();
      const message = `Halo kak, saya mau order ${product.name}
Paket: ${selectedPackage.paket}
Harga: ${selectedPackage.harga}
Akun/Email: ${akun || "-"}`;

      checkoutBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    });

    if (discordCheckoutBtn) {
      discordCheckoutBtn.addEventListener("click", () => {
        discordCheckoutBtn.href = discordOrderUrl;
      });
    }
  } else {
    document.title = "Produk Tidak Ditemukan - RaigaStore";
    detailTitle.textContent = "Produk Tidak Ditemukan";
    detailDesc.textContent = "Produk yang kamu cari belum tersedia atau link yang dibuka tidak valid.";
    detailImage.style.display = "none";
    detailPriceList.innerHTML = "";
    checkoutName.textContent = "Tidak tersedia";
    checkoutPrice.textContent = "Rp 0";
    checkoutBtn.removeAttribute("href");
    checkoutBtn.setAttribute("aria-disabled", "true");
    if (discordCheckoutBtn) {
      discordCheckoutBtn.removeAttribute("href");
      discordCheckoutBtn.setAttribute("aria-disabled", "true");
    }
    setMetaContent('meta[name="robots"]', { name: "robots" }, "noindex, follow");
  }
}
