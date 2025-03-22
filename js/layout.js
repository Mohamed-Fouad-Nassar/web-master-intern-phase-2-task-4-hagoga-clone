// vars
const navMenu = document.getElementById("nav-menu");
const navMenuToggle = document.getElementById("nav-menu-toggle");
const scrollToTopBtn = document.getElementById("scroll-to-top-btn");
const subscriptionForm = document.getElementById("subscription-form");

const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");

export function getCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
  return cart.length;
}

export function getWishlistCount() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistCount.textContent = wishlist.length;
  return wishlist.length;
}

// Initialize counts on page load
document.addEventListener("DOMContentLoaded", () => {
  getCartCount();
  getWishlistCount();
});

// handle open/close menu
navMenuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("hidden");
});

// close nav menu on click outside it
window.addEventListener("click", (e) => {
  if (
    e.target !== navMenuToggle &&
    !navMenu.classList.contains("hidden") &&
    !navMenu.contains(e.target)
  ) {
    navMenu.classList.add("hidden");
  }
});

// close nav menu on scroll
window.addEventListener("scroll", () => {
  if (!navMenu.classList.contains("hidden")) {
    navMenu.classList.add("hidden");
  }
});

// show/hide scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    scrollToTopBtn.classList.remove("scale-0");
  } else {
    scrollToTopBtn.classList.add("scale-0");
  }
});

// prevent submitting form
subscriptionForm?.addEventListener("submit", (e) => e.preventDefault());
