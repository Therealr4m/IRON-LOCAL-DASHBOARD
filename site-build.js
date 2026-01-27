document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // HISTORY STACK (REAL UNDO)
  // ==============================
  const historyMap = new WeakMap();

  document.querySelectorAll("textarea").forEach(area => {
    historyMap.set(area, [area.value]);

    area.addEventListener("input", () => {
      const stack = historyMap.get(area);
      stack.push(area.value);

      if (stack.length > 50) stack.shift();
    });
  });


  // ==============================
  // LOCK SYSTEM
  // ==============================
  document.querySelectorAll(".integration-lock-btn").forEach(btn => {

    btn.addEventListener("click", () => {
      const card = btn.closest(".vault-group, .master-prompt-card, .template-card");
      const textareas = card.querySelectorAll("textarea");

      const locked = btn.classList.toggle("locked");

      textareas.forEach(area => {
        area.readOnly = locked;
        area.classList.toggle("locked-field", locked);
      });

      btn.textContent = locked ? "🔓 Unlock" : "🔒 Lock";
      card.classList.toggle("locked-card", locked);
    });

  });


  // ==============================
  // UNDO BUTTONS
  // ==============================
  document.querySelectorAll(".vault-actions button:first-child").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".vault-group, .master-prompt-card, .template-card");

      card.querySelectorAll("textarea").forEach(area => {
        if (area.readOnly) return;

        const stack = historyMap.get(area);

        if (stack && stack.length > 1) {
          stack.pop();
          area.value = stack[stack.length - 1];
        }
      });
    });
  });


  // ==============================
  // COPY BUTTONS
  // ==============================
  document.querySelectorAll(".vault-actions button:last-child").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".vault-group, .master-prompt-card, .template-card");
      let combined = "";

      card.querySelectorAll("textarea").forEach(area => {
        combined += area.value + "\n\n";
      });

      navigator.clipboard.writeText(combined.trim());

      btn.textContent = "✓ Copied";
      setTimeout(() => btn.textContent = "Copy", 1200);
    });
  });

});