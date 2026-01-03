/* ======================================================
   SITE SEED — RUNS ONLY IF EMPTY
====================================================== */

const STORAGE_KEY = "ironlocal-sites";

if (!localStorage.getItem(STORAGE_KEY)) {
  const initialSites = {
    "concrete-shed-base-enfield": {
      name: "Concrete Shed Base Enfield",
      niche: "Concrete Bases",
      location: "Enfield",
      liveUrl: "https://concreteshedbaseenfield.co.uk",
      mainKeyword: "Concrete Shed Base Enfield",
      trackingNumber: "Personal",
      gscVerified: true
    }
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSites));
}