/* ======================================================
   SITE ENGINE + MY SITES SIDEBAR
   LocalStorage only — isolated
====================================================== */

const SITE_STORAGE_KEY = "ironlocal-sites";

/* ---------- Load / Save ---------- */

function loadSites() {
  return JSON.parse(localStorage.getItem(SITE_STORAGE_KEY)) || {};
}

function saveSites(sites) {
  localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(sites));
}

/* ---------- Sidebar ---------- */

function renderMySitesSidebar() {
  const list = document.getElementById("my-sites-list");
  if (!list) return;

  const sites = loadSites();
  list.innerHTML = "";

  Object.entries(sites).forEach(([id, site]) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="site.html?siteId=${id}">${site.name}</a>`;
    list.appendChild(li);
  });
}

/* ---------- Individual Site ---------- */

function getSiteId() {
  return new URLSearchParams(window.location.search).get("siteId");
}

function initSitePage() {
  const siteId = getSiteId();
  if (!siteId) return;

  const sites = loadSites();
  const site = sites[siteId];
  if (!site) return;

  document.getElementById("site-name").textContent = site.name;
  document.getElementById("site-meta").textContent =
    `${site.niche} — ${site.location}`;

  document.getElementById("site-url").textContent = site.liveUrl;
  document.getElementById("site-keyword").textContent = site.mainKeyword;
  document.getElementById("site-phone").textContent = site.trackingNumber;
  document.getElementById("site-gsc").textContent = site.gscVerified ? "Yes" : "No";


  /* ---------- Ensure SEO object ---------- */
  site.seo = site.seo || {
    backlinks: "",
    blogs: ""
  };

  const backlinksInput = document.getElementById("backlinks");
  const blogsInput = document.getElementById("blogs");

  if (backlinksInput) {
    backlinksInput.value = site.seo.backlinks;

    backlinksInput.addEventListener("input", () => {
      site.seo.backlinks = backlinksInput.value;
      saveSites(sites);
    });
  }

  if (blogsInput) {
    blogsInput.value = site.seo.blogs;

    blogsInput.addEventListener("input", () => {
      site.seo.blogs = blogsInput.value;
      saveSites(sites);
    });
  }


}

/* ---------- Init ---------- */

renderMySitesSidebar();
initSitePage();