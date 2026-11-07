const data = [
  {
    title: "Belajar JavaScript untuk Pemula",
    url: "https://www.w3schools.com/js/",
    description:
      "Pelajari dasar JavaScript, variabel, fungsi, event, dan cara membangun interaksi website modern.",
  },
  {
    title: "Panduan HTML dan CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    description:
      "Dokumentasi resmi tentang struktur halaman, layout, dan styling dengan HTML dan CSS.",
  },
  {
    title: "AI untuk Web Developer",
    url: "https://openai.com/",
    description:
      "Teknologi AI modern membantu para developer dalam otomatisasi, coding, dan analisis data.",
  },
  {
    title: "Tutorial React dari Dasar",
    url: "https://react.dev/",
    description:
      "Temukan cara membuat aplikasi frontend dengan komponen, state, dan rendering dinamis.",
  },
  {
    title: "Cara membuat desain Google-like",
    url: "https://dribbble.com/",
    description:
      "Inspirasi layout dan antarmuka mirip mesin pencari dengan fokus pada kesederhanaan.",
  },
  {
    title: "API untuk Search Engine",
    url: "https://www.google.com/search",
    description:
      "Panduan menyusun mesin pencarian dengan query, ranking, dan pengalaman pengguna yang cepat.",
  },
  {
    title: "Belajar CSS Grid dan Flexbox",
    url: "https://css-tricks.com/",
    description:
      "Pelajari layout modern dengan Grid dan Flexbox agar tampilan website lebih rapi dan responsif.",
  },
  {
    title: "Tips optimasi SEO website",
    url: "https://developers.google.com/search/docs",
    description:
      "Teknik dasar optimasi SEO agar website lebih mudah ditemukan pengguna dan mesin pencari.",
  },
  {
    title: "Platform coding online",
    url: "https://github.com/",
    description:
      "Tempat kolaborasi proyek, repository, dan pengembangan aplikasi berbasis code bersama tim.",
  },
  {
    title: "Framework backend terbaik",
    url: "https://nodejs.org/",
    description:
      "Node.js membantu membangun API cepat dan efisien untuk aplikasi yang scalable.",
  },
];

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const resultsContainer = document.getElementById("results");
const suggestionsBox = document.getElementById("suggestions");
const luckyBtn = document.getElementById("luckyBtn");
const clearBtn = document.querySelector(".clear-btn");

const suggestions = [
  "javascript",
  "html css",
  "react",
  "ai website",
  "belajar web",
  "seo",
  "node js",
];

function renderResults(query) {
  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        Ketik sesuatu untuk mulai pencarian.
      </div>
    `;
    return;
  }

  const filtered = data.filter((item) => {
    const text = `${item.title} ${item.url} ${item.description}`.toLowerCase();
    return text.includes(keyword);
  });

  if (!filtered.length) {
    resultsContainer.innerHTML = `
      <div class="empty-state">
        Tidak ada hasil untuk "${query}".
      </div>
    `;
    return;
  }

  resultsContainer.innerHTML = filtered
    .map(
      (item) => `
        <article class="result">
          <div class="url">${item.url}</div>
          <a class="title" href="${item.url}" target="_blank" rel="noreferrer">${item.title}</a>
          <div class="snippet">${item.description}</div>
        </article>
      `
    )
    .join("");
}

function renderSuggestions(value) {
  const keyword = value.trim().toLowerCase();

  if (!keyword) {
    suggestionsBox.classList.remove("show");
    suggestionsBox.innerHTML = "";
    return;
  }

  const related = suggestions.filter((item) => item.includes(keyword)).slice(0, 5);

  if (!related.length) {
    suggestionsBox.classList.remove("show");
    suggestionsBox.innerHTML = "";
    return;
  }

  suggestionsBox.innerHTML = related
    .map(
      (item) => `
        <div class="suggestion-item" data-value="${item}">${item}</div>
      `
    )
    .join("");

  suggestionsBox.classList.add("show");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  renderResults(query);
  suggestionsBox.classList.remove("show");
});

searchInput.addEventListener("input", (event) => {
  const value = event.target.value;
  renderSuggestions(value);
});

suggestionsBox.addEventListener("click", (event) => {
  const target = event.target.closest(".suggestion-item");
  if (!target) return;

  const value = target.dataset.value;
  searchInput.value = value;
  suggestionsBox.classList.remove("show");
  renderResults(value);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  suggestionsBox.classList.remove("show");
  resultsContainer.innerHTML = "";
});

luckyBtn.addEventListener("click", () => {
  const current = searchInput.value.trim();
  if (!current) {
    window.location.href = "https://www.google.com";
    return;
  }

  const firstMatch = data.find((item) =>
    `${item.title} ${item.url} ${item.description}`.toLowerCase().includes(current.toLowerCase())
  );

  if (firstMatch) {
    window.open(firstMatch.url, "_blank");
  } else {
    alert("Tidak ada hasil yang cocok, coba kata kunci lain.");
  }
});

renderResults("javascript");
