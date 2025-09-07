// script.js

document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".btn-buy");
  const modal = document.getElementById("perfume-modal");
  const modalCloseBtn = document.getElementById("modal-close");
  const selectedProductSpan = document.getElementById("selected-product");
  const perfumeForm = document.getElementById("perfume-form");

  let selectedProduct = "";

  // فتح المودال عند اختيار العطر
  buyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedProduct = btn.getAttribute("data-product");
      selectedProductSpan.textContent = selectedProduct;
      perfumeForm.reset();
      modal.classList.remove("hidden");
    });
  });

  // إغلاق المودال
  modalCloseBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // عند إرسال نموذج تفاصيل الاستخدام
  perfumeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usageType = document.getElementById("usage-type").value;
    const seasonType = document.getElementById("season-type").value;

    if (!usageType || !seasonType) {
      alert("يرجى اختيار نوع الاستخدام والموسم لإتمام الشراء.");
      return;
    }

    // هنا يمكن إضافة عملية الشراء الفعلية أو الانتقال لصفحة الدفع
    alert(
      `تم اختيار:\nالعطر: ${selectedProduct}\nنوع الاستخدام: ${usageType}\nالموسم: ${seasonType}\nشكراً لشراءك من عبير الخلود!`
    );

    modal.classList.add("hidden");
  });

  // إضافة نشاط للروابط في الشريط التنقل
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      navLinks.forEach((lnk) => lnk.classList.remove("active"));
      e.target.classList.add("active");
    });
  });

  // إغلاق المودال عند الضغط خارج المحتوى
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});
