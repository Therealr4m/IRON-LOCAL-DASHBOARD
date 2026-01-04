/* ======================================================
   SITE BUILD ENGINE
   LocalStorage only — isolated
====================================================== */

const BUILD_STORAGE_KEY = "ironlocal-site-build";

/* ---------- Load / Save ---------- */

function loadBuild() {
  return JSON.parse(localStorage.getItem(BUILD_STORAGE_KEY)) || {};
}

function saveBuild(build) {
  localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(build));
}

/* ---------- Init ---------- */

function initSiteBuildPage() {
  const build = loadBuild();







/* ---------- Finalise Prompt ---------- */

build.finalisePrompt = build.finalisePrompt || "";

const finaliseTextarea = document.getElementById("finalise-prompt");

if (finaliseTextarea) {
  /* LOAD */
  finaliseTextarea.value = build.finalisePrompt;

  /* SAVE */
  finaliseTextarea.addEventListener("input", () => {
    build.finalisePrompt = finaliseTextarea.value;
    saveBuild(build);
  });
}



  /* ensure root container */
  build.prompts = build.prompts || [];

  const promptSets = document.querySelectorAll(".prompt-set");

  promptSets.forEach((set, systemIndex) => {
    /* ensure system bucket */
    build.prompts[systemIndex] =
      build.prompts[systemIndex] || ["", "", ""];

    const textareas = set.querySelectorAll("textarea");

    textareas.forEach((textarea, promptIndex) => {
      /* LOAD */
      textarea.value =
        build.prompts[systemIndex][promptIndex];

      /* SAVE — identical philosophy to site.js */
      textarea.addEventListener("input", () => {
        build.prompts[systemIndex][promptIndex] = textarea.value;
        saveBuild(build);
      });
    });
  });
}






/* ---------- Run ---------- */

document.addEventListener("DOMContentLoaded", initSiteBuildPage);






