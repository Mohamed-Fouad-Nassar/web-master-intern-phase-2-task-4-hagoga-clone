import { renderProducts } from "./global.js";

const wishlistItemsContainer = document.getElementById("wishlist-items");

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

renderProducts(wishlist, wishlistItemsContainer);
