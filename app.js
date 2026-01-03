/* ======================================================
   IRON LOCAL — CONTRACTOR CALL LOG
   Edit + Delete | LocalStorage | Front-end only
====================================================== */

const STORAGE_KEY = "ironlocal_contractor_calls";

/* ---------- Load / Save ---------- */

function loadCalls() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCalls(calls) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(calls));
}

/* ---------- State ---------- */

let contractorCalls = loadCalls();
let editIndex = null;

/* ---------- Render ---------- */

function renderContractorCalls() {
  const tbody = document.getElementById("contractor-log");
  if (!tbody) return;

  tbody.innerHTML = "";

  contractorCalls.forEach((call, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${call.business}</td>
      <td>${call.contactName}</td>
      <td>${call.dateCalled}</td>
      <td>${call.outcome}</td>
      <td>${call.notes}</td>
      <td>
        <button class="operator-btn edit-btn" data-index="${index}">Edit</button>
        <button class="operator-btn delete-btn" data-index="${index}">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  bindRowActions();
}

/* ---------- Bind Edit / Delete ---------- */

function bindRowActions() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      loadForEdit(btn.dataset.index);
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteCall(btn.dataset.index);
    });
  });
}

/* ---------- Edit ---------- */

function loadForEdit(index) {
  const call = contractorCalls[index];
  if (!call) return;

  document.getElementById("business").value = call.business;
  document.getElementById("contactName").value = call.contactName;
  document.getElementById("dateCalled").value = call.dateCalled;
  document.getElementById("outcome").value = call.outcome;
  document.getElementById("notes").value = call.notes;

  editIndex = index;
}

/* ---------- Delete ---------- */

function deleteCall(index) {
  contractorCalls.splice(index, 1);
  saveCalls(contractorCalls);
  renderContractorCalls();
}

/* ---------- Form Handling ---------- */

const contractorForm = document.getElementById("contractor-form");

if (contractorForm) {
  contractorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const call = {
      business: document.getElementById("business").value.trim(),
      contactName: document.getElementById("contactName").value.trim(),
      dateCalled: document.getElementById("dateCalled").value,
      outcome: document.getElementById("outcome").value.trim(),
      notes: document.getElementById("notes").value.trim()
    };

    if (editIndex !== null) {
      // Update existing
      contractorCalls[editIndex] = call;
      editIndex = null;
    } else {
      // Add new
      contractorCalls.push(call);
    }

    saveCalls(contractorCalls);
    renderContractorCalls();
    contractorForm.reset();
  });
}

/* ---------- Initial Load ---------- */

renderContractorCalls();

/* ======================================================
   PARTNER DATABASE — LocalStorage
====================================================== */

const PARTNER_STORAGE_KEY = "ironlocal_partners";

let partners = loadPartners();
let partnerEditIndex = null;

/* ---------- Load / Save ---------- */

function loadPartners() {
  const data = localStorage.getItem(PARTNER_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function savePartners() {
  localStorage.setItem(PARTNER_STORAGE_KEY, JSON.stringify(partners));
}

/* ---------- Render ---------- */

function renderPartners() {
  const container = document.getElementById("partner-database");
  if (!container) return;

  container.innerHTML = "";

  partners.forEach((partner, index) => {
    const card = document.createElement("div");
    card.className = "partner-card";

    card.innerHTML = `
      <h4>${partner.business}</h4>
      <p><strong>Domain:</strong> ${partner.domain || "—"}</p>
      <p><strong>Phone:</strong> ${partner.phone || "—"}</p>
      <p><strong>Contact:</strong> ${partner.contact || "—"}</p>
      <p><strong>Status:</strong> ${partner.status}</p>
      <p><strong>Notes:</strong> ${partner.notes || "—"}</p>

      <div class="partner-actions">
        <button class="operator-btn edit-partner" data-index="${index}">Edit</button>
        <button class="operator-btn delete-partner" data-index="${index}">Delete</button>
      </div>
    `;

    container.appendChild(card);
  });

  bindPartnerActions();
}

/* ---------- Bind Edit / Delete ---------- */

function bindPartnerActions() {
  document.querySelectorAll(".edit-partner").forEach(btn => {
    btn.addEventListener("click", () => {
      loadPartnerForEdit(btn.dataset.index);
    });
  });

  document.querySelectorAll(".delete-partner").forEach(btn => {
    btn.addEventListener("click", () => {
      deletePartner(btn.dataset.index);
    });
  });
}

/* ---------- Edit ---------- */

function loadPartnerForEdit(index) {
  const partner = partners[index];
  if (!partner) return;

  document.getElementById("partner-business").value = partner.business;
  document.getElementById("partner-domain").value = partner.domain;
  document.getElementById("partner-phone").value = partner.phone;
  document.getElementById("partner-contact").value = partner.contact;
  document.getElementById("partner-status").value = partner.status;
  document.getElementById("partner-notes").value = partner.notes;

  partnerEditIndex = index;
}

/* ---------- Delete ---------- */

function deletePartner(index) {
  partners.splice(index, 1);
  savePartners();
  renderPartners();
}

/* ---------- Form Handling ---------- */

const partnerForm = document.getElementById("partner-form");

if (partnerForm) {
  partnerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const partner = {
      business: document.getElementById("partner-business").value.trim(),
      domain: document.getElementById("partner-domain").value.trim(),
      phone: document.getElementById("partner-phone").value.trim(),
      contact: document.getElementById("partner-contact").value.trim(),
      status: document.getElementById("partner-status").value,
      notes: document.getElementById("partner-notes").value.trim()
    };

    if (partnerEditIndex !== null) {
      partners[partnerEditIndex] = partner;
      partnerEditIndex = null;
    } else {
      partners.push(partner);
    }

    savePartners();
    renderPartners();
    partnerForm.reset();
  });
}

/* ---------- Initial Load ---------- */

renderPartners();



/* ======================================================
   OUTREACH LOG — LocalStorage
====================================================== */

const OUTREACH_STORAGE_KEY = "ironlocal_outreach";

let outreachLogs = loadOutreach();
let outreachEditIndex = null;

/* ---------- Load / Save ---------- */

function loadOutreach() {
  const data = localStorage.getItem(OUTREACH_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveOutreach() {
  localStorage.setItem(OUTREACH_STORAGE_KEY, JSON.stringify(outreachLogs));
}

/* ---------- Render ---------- */

function renderOutreach() {
  const list = document.getElementById("outreach-log");
  if (!list) return;

  list.innerHTML = "";

  outreachLogs.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = "outreach-item";

    item.innerHTML = `
      <div class="outreach-card">
        <p><strong>Business:</strong> ${entry.business || "—"}</p>
        <p><strong>Date:</strong> ${entry.date || "—"}</p>
        <p><strong>Notes:</strong> ${entry.notes || "—"}</p>

        <div class="outreach-actions">
          <button class="operator-btn edit-outreach" data-index="${index}">Edit</button>
          <button class="operator-btn delete-outreach" data-index="${index}">Delete</button>
        </div>
      </div>
    `;

    list.appendChild(item);
  });

  bindOutreachActions();
}

/* ---------- Bind Edit / Delete ---------- */

function bindOutreachActions() {
  document.querySelectorAll(".edit-outreach").forEach(btn => {
    btn.addEventListener("click", () => {
      loadOutreachForEdit(btn.dataset.index);
    });
  });

  document.querySelectorAll(".delete-outreach").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteOutreach(btn.dataset.index);
    });
  });
}

/* ---------- Edit ---------- */

function loadOutreachForEdit(index) {
  const entry = outreachLogs[index];
  if (!entry) return;

  document.getElementById("outreach-business").value = entry.business;
  document.getElementById("outreach-date").value = entry.date;
  document.getElementById("outreach-notes").value = entry.notes;

  outreachEditIndex = index;
}

/* ---------- Delete ---------- */

function deleteOutreach(index) {
  outreachLogs.splice(index, 1);
  saveOutreach();
  renderOutreach();
}

/* ---------- Form Handling ---------- */

const outreachForm = document.getElementById("outreach-form");

if (outreachForm) {
  outreachForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const entry = {
      business: document.getElementById("outreach-business").value.trim(),
      date: document.getElementById("outreach-date").value,
      notes: document.getElementById("outreach-notes").value.trim()
    };

    if (outreachEditIndex !== null) {
      outreachLogs[outreachEditIndex] = entry;
      outreachEditIndex = null;
    } else {
      outreachLogs.push(entry);
    }

    saveOutreach();
    renderOutreach();
    outreachForm.reset();
  });
}

/* ---------- Initial Load ---------- */

renderOutreach();










