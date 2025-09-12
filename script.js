// ================================
// cart.js — كود السلة والمشتريات
// ================================

// استرجاع السلة أو تهيئتها
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عداد السلة في الناف بار
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}

// إضافة منتج للسلة
function addToCart(productName, price = 100) {
  const product = { name: productName, price };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`✅ تمت إضافة "${productName}" إلى السلة`);
}

// عرض المنتجات في صفحة السلة
function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>🛒 السلة فارغة</p>";
    if (totalPriceEl) totalPriceEl.textContent = "0 ج.م";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} ج.م</span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });

  if (totalPriceEl) totalPriceEl.textContent = total + " ج.م";
}

// حذف منتج من السلة
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

// عرض السلة في صفحة الدفع (Checkout)
function displayCheckout() {
  const checkoutList = document.getElementById("checkout-list");
  const checkoutTotal = document.getElementById("checkout-total");

  if (!checkoutList) return;

  checkoutList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    checkoutList.innerHTML = "<p>السلة فارغة</p>";
    if (checkoutTotal) checkoutTotal.textContent = "0 ج.م";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price} ج.م`;
    checkoutList.appendChild(li);
    total += item.price;
  });

  if (checkoutTotal) checkoutTotal.textContent = total + " ج.م";
}

// تنفيذ الدفع
function payNow() {
  if (cart.length === 0) {
    alert("❌ السلة فارغة، أضف منتجات أولاً");
    return;
  }

  // تفريغ السلة
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // تحويل لصفحة الشكر
  window.location.href = "thankyou.html";
}

// تشغيل تلقائي في كل صفحة
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCartItems();
  displayCheckout();
});
