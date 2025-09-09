// ===== script.js (منظم) =====
document.addEventListener("DOMContentLoaded", () => {
  /* العناصر الأساسية */
  const buyButtonsSelector = ".btn-buy";
  const modal = document.getElementById("perfume-modal");
  const modalCloseBtn = document.getElementById("modal-close");
  const selectedProductSpan = document.getElementById("selected-product");
  const perfumeForm = document.getElementById("perfume-form");

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navLinkEls = document.querySelectorAll(".nav-link");

  const cart = [];
  const cartItemsDiv = document.getElementById("cart-items");
  const clearCartBtn = document.getElementById("clear-cart");
  const checkoutPayBtn = document.getElementById("checkout-pay");
  const paymentModal = document.getElementById("payment-modal");
  const paymentForm = document.getElementById("payment-form");
  const thankYou = document.getElementById("thank-you");

  let selectedProduct = "";

  /* --- فتح المودال عند الضغط على "اختر هذا العطر" --- */
  function attachBuyButtons() {
    document.querySelectorAll(buyButtonsSelector).forEach(btn => {
      btn.addEventListener("click", (e) => {
        // دعم حالة الضغط على أي عنصر داخل الزر
        const button = e.currentTarget;
        selectedProduct = button.getAttribute("data-product") || "منتج";
        selectedProductSpan.textContent = selectedProduct;
        // إعادة ضبط النموذج ثم إظهار المودال
        if (perfumeForm) perfumeForm.reset();
        modal.classList.remove("hidden");
      });
    });
  }
  attachBuyButtons();

  /* --- إغلاق مودال المنتج --- */
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
    if (e.target === paymentModal) paymentModal.style.display = "none";
  });

  /* --- عند إرسال نموذج تفاصيل المنتج -> يضاف للسلة --> ينتقل للسلة --- */
  if (perfumeForm) {
    perfumeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const usage = document.getElementById("usage-type").value;
      const season = document.getElementById("season-type").value;
      const style = document.getElementById("style-type").value;
      const rating = document.getElementById("rating").value;

      if (!usage || !season || !style || !rating) {
        alert("يرجى إكمال جميع الحقول.");
        return;
      }

      const order = {
        product: selectedProduct,
        usage, season, style, rating
      };

      cart.push(order);
      renderCart();
      modal.classList.add("hidden");

      // انتقال سلس للسلة
      const cartSection = document.querySelector("#cart");
      if (cartSection) cartSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* --- renderCart: يعرض محتويات السلة --- */
  function renderCart() {
    if (!cartItemsDiv) return;
    cartItemsDiv.innerHTML = "";
    if (cart.length === 0) {
      cartItemsDiv.innerHTML = "<p>🛍️ السلة فارغة حالياً</p>";
      return;
    }
    cart.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div>
          <strong>${escapeHtml(item.product)}</strong>
          <div style="font-size:13px;color:#666;">${escapeHtml(item.usage)} • ${escapeHtml(item.season)} • ${escapeHtml(item.style)} • ⭐${escapeHtml(item.rating)}</div>
        </div>
        <div>
          <button class="remove-item" data-index="${idx}" style="background:transparent;border:none;cursor:pointer;font-size:18px;">❌</button>
        </div>
      `;
      cartItemsDiv.appendChild(div);
    });

    // أزرار حذف العناصر
    cartItemsDiv.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const i = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        cart.splice(i, 1);
        renderCart();
      });
    });
  }

  /* --- إفراغ السلة --- */
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (!confirm("هل أنت متأكد من إفراغ السلة؟")) return;
      cart.length = 0;
      renderCart();
    });
  }

  /* --- فتح نافذة الدفع --- */
  if (checkoutPayBtn) {
    checkoutPayBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("⚠️ السلة فارغة! أضف منتجات أولاً.");
        return;
      }
      paymentModal.style.display = "flex";
    });
  }

  /* --- تأكيد الدفع --- */
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      paymentModal.style.display = "none";
      cart.length = 0;
      renderCart();
      // عرض رسالة شكر
      thankYou.style.display = "block";
      thankYou.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* --- Checkout form (القسم العام للـ checkout إذا استخدمته) --- */
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutResult = document.getElementById("checkout-result");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(checkoutForm);
      const time = fd.get("time") || "";
      const style = fd.get("style") || "";
      const rating = fd.get("rating") || "";
      if (checkoutResult) {
        checkoutResult.style.display = "block";
        checkoutResult.innerHTML = `
          <p>🌟 اخترت: <strong>${escapeHtml(time)}</strong></p>
          <p>🎨 ذوقك: <strong>${escapeHtml(style)}</strong></p>
          <p>⭐ تقييم: <strong>${escapeHtml(rating)}/10</strong></p>
          <p>يمكن الآن الضغط على المنتجات لإضافتها للسلة أو متابعة الدفع.</p>
        `;
      }
    });
  }

  /* --- Smooth scroll للروابط وتحديث النشط --- */
  navLinkEls.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href");
      if (!target) return;
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });

      navLinkEls.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      navLinks.classList.remove("show");
    });
  });

  /* --- Toggle menu (mobile) --- */
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  /* --- Scroll reveal (simple) --- */
  const revealEls = document.querySelectorAll(".fade-in, .slide-up");
  function revealOnScroll() {
    const wh = window.innerHeight;
    revealEls.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < wh - 120) el.classList.add("active");
      else el.classList.remove("active");
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* ---- safety escape helper ---- */
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* --- تأكد من تفعيل أزرار .btn-buy الحالية بعد تغيير محتوى DOM --- */
  // تم بالفعل ربطها أولياً عند التحميل عبر attachBuyButtons()
}); // DOMContentLoaded end
