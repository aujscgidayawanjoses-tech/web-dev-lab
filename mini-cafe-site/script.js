document.addEventListener("DOMContentLoaded", () => {
  // ===== MENU ITEMS =====
  const menuItems = [
    { name: "Espresso", description: "Strong and bold single-shot coffee.", price: 90 },
    { name: "Caramel Latte", description: "Smooth latte with sweet caramel syrup.", price: 140 },
    { name: "Matcha Frappe", description: "Icy blend of premium matcha and milk.", price: 160 },
    { name: "Tuna Melt Sandwich", description: "Toasted bread with melted cheese and tuna.", price: 130 },
    { name: "Chocolate Chip Cookies", description: "Freshly baked, soft and chewy cookies.", price: 60 }
  ];

  // Safe element getters
  const menuContainer = document.getElementById("menu-list");
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackList = document.getElementById("feedback-list");
  const feedbackSuccess = document.getElementById("feedbackSuccess");

  // ===== RENDER MENU =====
  if (menuContainer) {
    // Clear (in case)
    menuContainer.innerHTML = "";
    menuItems.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-3";

      // Format price to Philippine Peso (no cents)
      const priceText = item.price.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0
      });

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${escapeHtml(item.name)}</h5>
            <p class="card-text flex-grow-1">${escapeHtml(item.description)}</p>
            <p class="text-end fw-bold mb-0">${priceText}</p>
          </div>
        </div>
      `;
      menuContainer.appendChild(col);
    });
  }

  // ===== FEEDBACK: helper functions =====
  function isValidEmail(email) {
    // basic, reasonable email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showSuccess(message = "Feedback submitted successfully!") {
    if (!feedbackSuccess) return;
    feedbackSuccess.textContent = "✅ " + message;
    feedbackSuccess.classList.remove("d-none");
    // auto-hide after 3 seconds
    setTimeout(() => {
      feedbackSuccess.classList.add("d-none");
    }, 3000);
  }

  function saveFeedbackToStorage(feedbackArray) {
    try {
      localStorage.setItem("cozy_feedback", JSON.stringify(feedbackArray));
    } catch (e) {
      // storage may be full or disabled — ignore silently
      console.warn("Could not save feedback to localStorage:", e);
    }
  }

  function loadFeedbackFromStorage() {
    try {
      const raw = localStorage.getItem("cozy_feedback");
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Could not read feedback from storage:", e);
      return [];
    }
  }

  function renderFeedbackList(items) {
    if (!feedbackList) return;
    feedbackList.innerHTML = "";
    items.forEach(fb => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      const date = new Date(fb.date).toLocaleString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
      li.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">${escapeHtml(fb.name)}</h6>
          <small class="text-muted">${date}</small>
        </div>
        <p class="mb-1">"${escapeHtml(fb.message)}"</p>
        <small class="text-muted">${escapeHtml(fb.email)}</small>
      `;
      feedbackList.appendChild(li);
    });
  }

  // Initialize stored feedbacks (if feedback UI exists)
  if (feedbackList) {
    const stored = loadFeedbackFromStorage();
    renderFeedbackList(stored);
  }

  // ===== FEEDBACK FORM SUBMIT HANDLER =====
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("fb-name");
      const emailInput = document.getElementById("fb-email");
      const messageInput = document.getElementById("fb-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";

      // Basic validation
      const errors = [];
      if (!name) errors.push("Name cannot be empty.");
      if (!email || !isValidEmail(email)) errors.push("Please provide a valid email address.");
      if (!message || message.length <= 5) errors.push("Message must be longer than 5 characters.");

      if (errors.length > 0) {
        // Show combined alert (simple)
        alert("❌ " + errors.join(" "));
        return;
      }

      // Build feedback object
      const feedbackObj = {
        name,
        email,
        message,
        date: new Date().toISOString()
      };

      // Append to UI
      const current = loadFeedbackFromStorage();
      current.unshift(feedbackObj); // newest first
      saveFeedbackToStorage(current);
      renderFeedbackList(current);

      // Success feedback
      showSuccess();

      // Reset form
      feedbackForm.reset();

      // Optional: focus name for faster new input
      if (nameInput) nameInput.focus();
    });
  }

}); // end DOMContentLoaded