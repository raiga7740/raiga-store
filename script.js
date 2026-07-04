const whatsappNumber = "6281234567890";

const products = [
  {
    id: "netflix",
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
    name: "Apple Music",
    image: "assets/apple.jpg",
    desc: "Streaming jutaan lagu premium dengan kualitas audio yang jernih.",
    prices: [
      { paket: "1 Bulan", harga: "18K" },
      { paket: "3 Bulan", harga: "48K" }
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
    card.href = `detail.html?id=${product.id}`;
    card.setAttribute("aria-label", `Lihat paket ${product.name}`);

    const cheapest = getMinPrice(product.prices);

    card.innerHTML = `
      <img src="${product.image}" class="product-image" alt="${product.name} premium">
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

const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");
const detailPriceList = document.getElementById("detailPriceList");
const checkoutName = document.getElementById("checkoutName");
const checkoutPrice = document.getElementById("checkoutPrice");
const checkoutBtn = document.getElementById("checkoutBtn");
const accountInput = document.getElementById("accountInput");
const detailMetaDesc = document.getElementById("detailMetaDesc");
const detailOgTitle = document.getElementById("detailOgTitle");
const detailOgDesc = document.getElementById("detailOgDesc");

function setOrCreateMeta(selector, attribute, value) {
  let meta = document.querySelector(selector);

  if (!meta) {
    meta = document.createElement("meta");
    document.head.appendChild(meta);
  }

  Object.entries(attribute).forEach(([key, attrValue]) => {
    meta.setAttribute(key, attrValue);
  });

  meta.setAttribute("content", value);
}

function addProductSchema(product) {
  const cheapest = getMinPrice(product.prices);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.name} Premium`,
    "image": product.image,
    "description": product.desc,
    "brand": {
      "@type": "Brand",
      "name": product.name
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "IDR",
      "lowPrice": hargaToNumber(cheapest.harga),
      "offerCount": product.prices.length,
      "availability": "https://schema.org/InStock"
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

if (detailTitle) {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const product = products.find(item => item.id === productId);

  if (product) {
    detailImage.src = product.image;
    detailImage.alt = `${product.name} premium di RaigaStore`;
    detailTitle.textContent = product.name;
    detailDesc.textContent = product.desc;

    const pageTitle = `${product.name} Premium Murah - RaigaStore`;
    const pageDesc = `Beli ${product.name} premium di RaigaStore. Pilih paket langganan, isi akun atau email, lalu order cepat via WhatsApp.`;

    document.title = pageTitle;

    if (detailMetaDesc) detailMetaDesc.setAttribute("content", pageDesc);
    if (detailOgTitle) detailOgTitle.setAttribute("content", pageTitle);
    if (detailOgDesc) detailOgDesc.setAttribute("content", pageDesc);

    setOrCreateMeta('meta[property="og:image"]', { property: "og:image" }, product.image);
    setOrCreateMeta('meta[name="keywords"]', { name: "keywords" }, `${product.name} premium, ${product.name} murah, jual ${product.name}, aplikasi premium murah`);
    addProductSchema(product);

    let selectedPackage = product.prices[0];

    function updateCheckout(item) {
      selectedPackage = item;
      checkoutName.textContent = item.paket;
      checkoutPrice.textContent = `Rp ${item.harga.replace("K", ".000")}`;

      const message = `Halo kak, saya mau order ${product.name} paket ${item.paket} harga ${item.harga}`;
      checkoutBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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
    setOrCreateMeta('meta[name="robots"]', { name: "robots" }, "noindex, follow");
  }
}
