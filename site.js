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


/* ---------- Timeline ---------- */

site.timeline = site.timeline || {
  liveDate: "",
  impressions500Date: ""
};

const siteLiveInput = document.getElementById("site-live-date");
const impressionsInput = document.getElementById("impressions-500-date");

if (siteLiveInput) {
  siteLiveInput.value = site.timeline.liveDate;

  siteLiveInput.addEventListener("input", () => {
    site.timeline.liveDate = siteLiveInput.value;
    saveSites(sites);
  });
}

if (impressionsInput) {
  impressionsInput.value = site.timeline.impressions500Date;

  impressionsInput.addEventListener("input", () => {
    site.timeline.impressions500Date = impressionsInput.value;
    saveSites(sites);
  });
}






/* ---------- Monetisation ---------- */

site.monetisation = site.monetisation || {
  rentedTo: "",
  partnerDomain: "",
  rentedDate: "",
  rentedStatus: "No"
};

const rentedToInput = document.getElementById("rented-to");
const partnerDomainInput = document.getElementById("partner-domain");
const rentedDateInput = document.getElementById("rented-date");
const rentedStatusSelect = document.getElementById("rented-status");

if (rentedToInput) {
  rentedToInput.value = site.monetisation.rentedTo;
  rentedToInput.addEventListener("input", () => {
    site.monetisation.rentedTo = rentedToInput.value;
    saveSites(sites);
  });
}

if (partnerDomainInput) {
  partnerDomainInput.value = site.monetisation.partnerDomain;
  partnerDomainInput.addEventListener("input", () => {
    site.monetisation.partnerDomain = partnerDomainInput.value;
    saveSites(sites);
  });
}

if (rentedDateInput) {
  rentedDateInput.value = site.monetisation.rentedDate;
  rentedDateInput.addEventListener("input", () => {
    site.monetisation.rentedDate = rentedDateInput.value;
    saveSites(sites);
  });
}

if (rentedStatusSelect) {
  rentedStatusSelect.value = site.monetisation.rentedStatus;
  rentedStatusSelect.addEventListener("change", () => {
    site.monetisation.rentedStatus = rentedStatusSelect.value;
    saveSites(sites);
  });
}



















// important bracket lol
}




/* ---------- Init ---------- */

renderMySitesSidebar();
initSitePage();