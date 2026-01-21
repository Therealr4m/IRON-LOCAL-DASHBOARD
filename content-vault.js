document.addEventListener("DOMContentLoaded", () => {
  const vaultEditBtn = document.querySelector(".vault-edit-btn");
  if (!vaultEditBtn) return;

  const vaultLists = document.querySelectorAll(".vault-list");
  const blogPromptInput = document.getElementById("blog-prompt-input");

  // Load data
  const vaultData = JSON.parse(localStorage.getItem("contentVault")) || {
    concreteTopics: [],
    loftTopics: [],
    blogPrompt: ""
  };

  blogPromptInput.value = vaultData.blogPrompt || "";

  // Render topics
  vaultLists.forEach(list => {
    const key = list.dataset.key;
    list.innerHTML = "";

    (vaultData[key] || []).forEach(text => {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.textContent = text;

      const input = document.createElement("input");
      input.value = text;
      input.style.display = "none";

      const del = document.createElement("button");
      del.textContent = "✕";
      del.className = "vault-delete";
      del.addEventListener("click", () => li.remove());

      li.append(span, input, del);
      list.appendChild(li);
    });
  });

  function saveVault() {
    localStorage.setItem("contentVault", JSON.stringify(vaultData));
  }

  // Edit toggle
  vaultEditBtn.addEventListener("click", () => {
    const locked = vaultEditBtn.classList.contains("locked");

    // Toggle textarea
    if (locked) {
      blogPromptInput.removeAttribute("readonly");
      blogPromptInput.classList.add("editing");
    } else {
      blogPromptInput.setAttribute("readonly", true);
      blogPromptInput.classList.remove("editing");
    }

    // Toggle topics
    vaultLists.forEach(list => {
      [...list.children].forEach(li => {
        const span = li.querySelector("span");
        const input = li.querySelector("input");

        if (locked) {
          input.style.display = "block";
          span.style.display = "none";
        } else {
          span.textContent = input.value;
          input.style.display = "none";
          span.style.display = "block";
        }
      });
    });

    // Save
    if (!locked) {
      vaultLists.forEach(list => {
        const key = list.dataset.key;
        vaultData[key] = [...list.children].map(li =>
          li.querySelector("input").value
        );
      });

      vaultData.blogPrompt = blogPromptInput.value;
      saveVault();
    }

    vaultEditBtn.classList.toggle("locked");
    vaultEditBtn.textContent = locked ? "✓ Save" : "✎ Edit";
  });

  // Add topic
  document.querySelectorAll(".add-topic-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const list = btn.previousElementSibling;

      const li = document.createElement("li");
      const span = document.createElement("span");
      const input = document.createElement("input");

      span.textContent = "New Topic";
      input.value = "New Topic";
      input.style.display = "block";
      span.style.display = "none";

      const del = document.createElement("button");
      del.textContent = "✕";
      del.className = "vault-delete";
      del.addEventListener("click", () => li.remove());

      li.append(span, input, del);
      list.appendChild(li);
    });
  });

// ORANGE LOGIC BELO

const integrationScript = document.getElementById("page-integration-script");
const integrationLockBtn = document.querySelector(".integration-lock-btn");

if (integrationScript && integrationLockBtn) {

  const saved = JSON.parse(localStorage.getItem("pageIntegrationScript"));

  if (saved) integrationScript.value = saved;

  integrationLockBtn.addEventListener("click", () => {
    const locked = integrationLockBtn.classList.contains("locked");

    if (locked) {
      integrationScript.removeAttribute("readonly");
    } else {
      integrationScript.setAttribute("readonly", true);
      localStorage.setItem("pageIntegrationScript", JSON.stringify(integrationScript.value));
    }

    integrationLockBtn.classList.toggle("locked");
    integrationLockBtn.textContent = locked ? "✓ Save" : "✎ Edit";
  });
}

// Actions
const pageIntegrationInput = document.getElementById("page-integration-input");
const undoIntegrationBtn = document.getElementById("undo-page-integration");
const copyIntegrationBtn = document.getElementById("copy-page-integration");

let integrationHistory = [];

if (pageIntegrationInput) {
  pageIntegrationInput.addEventListener("input", () => {
    integrationHistory.push(pageIntegrationInput.value);
  });
}

if (undoIntegrationBtn) {
  undoIntegrationBtn.addEventListener("click", () => {
    if (integrationHistory.length > 1) {
      integrationHistory.pop();
      pageIntegrationInput.value = integrationHistory[integrationHistory.length - 1];
    }
  });
}

if (copyIntegrationBtn) {
  copyIntegrationBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(pageIntegrationInput.value);
    alert("Integration prompt copied");
  });
}

// ORANG LOGIC ABOVE
/* ================= FINAL PROMPT WORKBENCH ================= */

const finalPromptBox = document.getElementById("final-blog-prompt");
const undoFinalBtn = document.getElementById("undo-final-prompt");
const copyFinalPromptBtn = document.getElementById("copy-final-blog-prompt");

let lastFinalValue = "";

if (finalPromptBox) {
  // load
  const vaultState = JSON.parse(localStorage.getItem("contentVault")) || {};
  finalPromptBox.value = vaultState.finalPrompt || "";

  // snapshot before edit
  finalPromptBox.addEventListener("focus", () => {
    lastFinalValue = finalPromptBox.value;
  });

  // save
  finalPromptBox.addEventListener("input", () => {
    const vault = JSON.parse(localStorage.getItem("contentVault")) || {};
    vault.finalPrompt = finalPromptBox.value;
    localStorage.setItem("contentVault", JSON.stringify(vault));
  });
}

undoFinalBtn?.addEventListener("click", () => {
  if (!lastFinalValue) return;
  const current = finalPromptBox.value;
  finalPromptBox.value = lastFinalValue;
  lastFinalValue = current;
});

copyFinalPromptBtn?.addEventListener("click", () => {
  navigator.clipboard.writeText(finalPromptBox.value);
  alert("Final blog prompt copied");
});

  // Copy prompt
  document.getElementById("copy-blog-prompt").addEventListener("click", () => {
    navigator.clipboard.writeText(blogPromptInput.value);
    alert("Blog prompt copied");

  });
});


