document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".btn-buy");
  const modal = document.getElementById("perfume-modal");
  const modalCloseBtn = document.getElementById("modal-close");
  const selectedProductSpan = document.getElementById("selected-product");
  const perfumeForm = document.getElementById("perfume-form");

  let selectedProduct = "";

  // فتح المودال
  buyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedProduct = btn.getAttribute("data-product");
      selectedProductSpan.textContent = selectedProduct;
      perfumeForm.reset();
      modal.classList.remove("hidden");
    });
  });

  // إغلاق
  modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // عند الإرسال
  perfumeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usageType = document.getElementById("usage-type").value;
    const seasonType = document.getElementById("season-type").value;
    const styleType = document.getElementById("style-type").value;
    const rating = document.getElementById("rating").value;

    if (!usageType || !seasonType || !styleType || !rating) {
      alert("يرجى إكمال جميع الحقول.");
      return;
    }

    alert(
      `✅ تم الاختيار:\nالعطر: ${selectedProduct}\nالاستخدام: ${usageType}\nالموسم: ${seasonType}\nالذوق: ${styleType}\nالتقييم: ${rating}/5`
    );

    modal.classList.add("hidden");
  });

  // تفعيل زر القائمة
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // تغيير النشط
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      navLinks.classList.remove("show");
    });
  });

  // إغلاق المودال عند الضغط بالخارج
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
