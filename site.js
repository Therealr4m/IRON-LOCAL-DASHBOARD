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



// visibility, idk why its going here but ill see xX






/* ---------- Core Site Info Initial Visibility ---------- */

document.querySelectorAll(".core-row").forEach(row => {
  const span = row.querySelector("span");
  const input = row.querySelector("input");

  if (!span || !input) return;

  span.style.display = "inline";
  input.classList.add("hidden");
});




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



/* ---------- Site Context NEW HTML AND CSS xX ---------- */

site.context = site.context || {
  primaryLocation: "",
  secondaryAreas: "",
  tone: "",
  audience: "Homeowners",
  conversionGoal: "Phone calls"
};

const primaryLocationInput = document.getElementById("primary-location");
const secondaryAreasInput = document.getElementById("secondary-areas");
const audienceInput = document.getElementById("audience");
const conversionGoalInput = document.getElementById("conversion-goal");
const toneRadios = document.querySelectorAll('input[name="tone"]');

if (primaryLocationInput) {
  primaryLocationInput.value = site.context.primaryLocation;
  primaryLocationInput.addEventListener("input", () => {
    site.context.primaryLocation = primaryLocationInput.value;
    saveSites(sites);
  });
}

if (secondaryAreasInput) {
  secondaryAreasInput.value = site.context.secondaryAreas;
  secondaryAreasInput.addEventListener("input", () => {
    site.context.secondaryAreas = secondaryAreasInput.value;
    saveSites(sites);
  });
}

if (audienceInput) {
  audienceInput.value = site.context.audience;
  audienceInput.addEventListener("input", () => {
    site.context.audience = audienceInput.value;
    saveSites(sites);
  });
}

if (conversionGoalInput) {
  conversionGoalInput.value = site.context.conversionGoal;
  conversionGoalInput.addEventListener("input", () => {
    site.context.conversionGoal = conversionGoalInput.value;
    saveSites(sites);
  });
}

toneRadios.forEach(radio => {
  if (radio.value === site.context.tone) radio.checked = true;

  radio.addEventListener("change", () => {
    site.context.tone = radio.value;
    saveSites(sites);
  });
});




/* ----------HTML CSS  Code Vault ---------- */

site.codeVault = site.codeVault || {
  html: "",
  css: ""
};

const htmlInput = document.getElementById("site-html");
const cssInput = document.getElementById("site-css");

if (htmlInput) {
  htmlInput.value = site.codeVault.html;

  htmlInput.addEventListener("input", () => {
    site.codeVault.html = htmlInput.value;
    saveSites(sites);
  });
}

if (cssInput) {
  cssInput.value = site.codeVault.css;

  cssInput.addEventListener("input", () => {
    site.codeVault.css = cssInput.value;
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

/* ---------- Distribution ---------- */

site.distribution = site.distribution || {
  facebookGroups: ""
};

const fbGroupsInput = document.getElementById("facebook-groups");

if (fbGroupsInput) {
  fbGroupsInput.value = site.distribution.facebookGroups;

  fbGroupsInput.addEventListener("input", () => {
    site.distribution.facebookGroups = fbGroupsInput.value;
    saveSites(sites);
  });
}


/* ---------- Friction Log ---------- */

site.friction = site.friction || {
  notes: ""
};

const frictionInput = document.getElementById("friction-log");

if (frictionInput) {
  frictionInput.value = site.friction.notes;

  frictionInput.addEventListener("input", () => {
    site.friction.notes = frictionInput.value;
    saveSites(sites);
  });
}



/* ---------- Citations ---------- */

site.citations = site.citations || [];

const citationInput = document.getElementById("citation-input");
const addCitationBtn = document.getElementById("add-citation");
const citationsContainer = document.getElementById("citations");

function renderCitations() {
  citationsContainer.innerHTML = "";

  site.citations.forEach((citation, index) => {
    const card = document.createElement("div");
    card.className = "outreach-card";

    card.innerHTML = `
      <strong>${citation.name}</strong>

      <select data-index="${index}">
        <option value="Not Started" ${citation.status === "Not Started" ? "selected" : ""}>Not Started</option>
        <option value="Ongoing" ${citation.status === "Ongoing" ? "selected" : ""}>Ongoing</option>
        <option value="Done" ${citation.status === "Done" ? "selected" : ""}>Done</option>
      </select>

      <textarea
        placeholder="Notes"
        data-notes-index="${index}"
      >${citation.notes || ""}</textarea>

      <button type="button" data-delete-index="${index}">
        Remove
      </button>
    `;

    citationsContainer.appendChild(card);
  });

  bindCitationEvents();
}

function bindCitationEvents() {
  citationsContainer.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", e => {
      const index = e.target.dataset.index;
      site.citations[index].status = e.target.value;
      saveSites(sites);
    });
  });

  citationsContainer.querySelectorAll("textarea").forEach(textarea => {
    textarea.addEventListener("input", e => {
      const index = e.target.dataset.notesIndex;
      site.citations[index].notes = e.target.value;
      saveSites(sites);
    });
  });

  citationsContainer.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.deleteIndex;
      site.citations.splice(index, 1);
      saveSites(sites);
      renderCitations();
    });
  });
}

if (addCitationBtn) {
  addCitationBtn.addEventListener("click", () => {
    const name = citationInput.value.trim();
    if (!name) return;

    site.citations.push({
      name,
      status: "Not Started",
      notes: ""
    });

    citationInput.value = "";
    saveSites(sites);
    renderCitations();
  });
}

renderCitations();

/* ---------- Delete Site section ---------- */

const deleteBtn = document.getElementById("delete-site-btn");

if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    const confirmDelete = confirm(
      "This will permanently delete this site and all its data. Are you sure?"
    );

    if (!confirmDelete) return;

    delete sites[siteId];
    saveSites(sites);

    window.location.href = "index.html";
  });
}








// new xX
/* ---------- Core Site Info Edit Toggle ---------- */

const editBtn = document.querySelector(".core-edit-btn");
if (editBtn) {
  const rows = document.querySelectorAll(".core-row");

  editBtn.addEventListener("click", () => {
    const locked = editBtn.classList.contains("locked");

    rows.forEach(row => {
      const span = row.querySelector("span");
      const input = row.querySelector("input");

      if (locked) {
        input.value = span.textContent;
        span.style.display = "none";
        input.classList.remove("hidden");
      } else {
        span.textContent = input.value;
        span.style.display = "inline";
        input.classList.add("hidden");
      }
    });

    editBtn.classList.toggle("locked");
    editBtn.textContent = locked ? "✓ Save" : "✎ Edit";
  });
}



// NEW xX
/* ---------- Core Site Info Saving ---------- */

const coreMap = [
  { input: "site-url-input", key: "liveUrl", span: "site-url" },
  { input: "site-keyword-input", key: "mainKeyword", span: "site-keyword" },
  { input: "site-phone-input", key: "trackingNumber", span: "site-phone" },
  { input: "site-gsc-input", key: "gscVerified", span: "site-gsc" }
];

coreMap.forEach(item => {
  const input = document.getElementById(item.input);
  const span = document.getElementById(item.span);

  if (!input || !span) return;

  input.value = site[item.key] || "";
  span.textContent = site[item.key] || "";

  input.addEventListener("input", () => {
    site[item.key] = input.value;
    span.textContent = input.value;
    saveSites(sites);
  });
});



// important bracket lol
}

/* ---------- Init ---------- */

renderMySitesSidebar();
initSitePage();

































const addSiteLink = document.getElementById("add-site-link");

if (addSiteLink) {
  addSiteLink.addEventListener("click", e => {
    e.preventDefault();

    const name = prompt("Site name:");
    if (!name) return;

    const niche = prompt("Niche:");
    const location = prompt("Location:");
    const liveUrl = prompt("Live URL:");
    const keyword = prompt("Main keyword:");

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const sites = loadSites();

    sites[id] = {
      name,
      niche,
      location,
      liveUrl,
      mainKeyword: keyword,
      trackingNumber: "",
      gscVerified: false
    };


    saveSites(sites);
    location.href = `site.html?siteId=${id}`;
  });
}





document.addEventListener("DOMContentLoaded", () => {
  const lockBtn = document.querySelector(".vault-lock-btn");
  if (!lockBtn) return;

  const ids = lockBtn.dataset.target.split(",");
  const fields = ids.map(id => document.getElementById(id)).filter(Boolean);

  // start LOCKED
  fields.forEach(field => {
    field.setAttribute("readonly", "true");
  });

  lockBtn.addEventListener("click", () => {
    const isLocked = lockBtn.classList.contains("locked");

    fields.forEach(field => {
      if (isLocked) {
        field.removeAttribute("readonly");
      } else {
        field.setAttribute("readonly", "true");
      }
    });

    lockBtn.classList.toggle("locked");
    lockBtn.classList.toggle("unlocked");
    lockBtn.textContent = isLocked ? "🔓 Unlocked" : "🔒 Locked";
  });
});
