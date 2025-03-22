import { getCartCount, getWishlistCount } from "./layout.js";

// Load cart & wishlist from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function HandleInCart(product, button) {
  if (!cart.some((item) => item.id == product.id)) {
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    button.innerHTML = `<i data-lucide="check" class="size-5"></i>`;
  } else {
    cart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    button.innerHTML = `<i data-lucide="plus" class="size-5"></i>`;
  }
  getCartCount();
  lucide.createIcons();
}

function handleWishlist(product, button) {
  if (!wishlist.some((item) => item.id == product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    button.innerHTML = `<i data-lucide="heart" class="size-5" fill="white"></i>`;
  } else {
    wishlist = wishlist.filter((item) => item.id !== product.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    if (window.location.pathname.includes("wishlist")) {
      const productElement = document.querySelector(
        `[data-id="${product.id}"]`
      );
      if (productElement) productElement.remove();
    } else {
      button.innerHTML = `<i data-lucide="heart" class="size-5"></i>`;
    }
  }
  getWishlistCount();
  lucide.createIcons();
}

export function renderProducts(selectedProducts, targetContainer) {
  targetContainer.innerHTML = "";

  if (selectedProducts.length === 0) {
    const noItems = document.createElement("p");
    noItems.classList.add(
      "text-center",
      "text-bold",
      "text-2xl",
      "text-gray-400"
    );
    noItems.textContent = "لا يوجد منتجات";
    targetContainer.append(noItems);
    return;
  }

  selectedProducts.forEach((product) => {
    const menuItem = document.createElement("div");
    menuItem.setAttribute("data-id", product.id);
    menuItem.classList.add(
      "relative",
      "flex",
      "flex-col",
      "items-center",
      "pb-3",
      "border",
      "border-gray-200",
      "rounded"
    );

    const img = document.createElement("img");
    img.classList.add("max-w-full");
    img.src = `.${product.image}`;
    img.alt = product.title;
    menuItem.append(img);

    const title = document.createElement("h3");
    title.classList.add("mt-2", "mb-4", "font-medium");
    title.textContent = product.title;
    menuItem.append(title);

    const price = document.createElement("span");
    price.classList.add("text-primary");
    price.textContent = product.price + " جنيـه";
    menuItem.append(price);

    const btnsContainer = document.createElement("div");
    btnsContainer.classList.add(
      "flex",
      "absolute",
      "mt-4",
      "right-2",
      "items-center",
      "gap-2"
    );

    // ** Add to Cart Button **
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add(
      "add-to-cart-btn",
      "bg-primary",
      "text-white",
      "w-10",
      "h-10",
      "rounded-full",
      "flex",
      "justify-center",
      "items-center",
      "cursor-pointer",
      "hover:bg-amber-600"
    );

    // Check if product is already in cart
    const inCart = cart.some((item) => item.id === product.id);
    if (inCart)
      addToCartBtn.innerHTML = `<i data-lucide="check" class="size-5"></i>`;
    else addToCartBtn.innerHTML = `<i data-lucide="plus" class="size-5"></i>`;

    btnsContainer.append(addToCartBtn);

    // ** Add to Wishlist Button **
    const addToWishlistBtn = document.createElement("button");
    addToWishlistBtn.classList.add(
      "add-to-wishlist-btn",
      "bg-primary",
      "text-white",
      "w-10",
      "h-10",
      "rounded-full",
      "flex",
      "justify-center",
      "items-center",
      "cursor-pointer",
      "hover:bg-amber-600"
    );

    // Check if product is in wishlist
    const inWishlist = wishlist.some((item) => item.id === product.id);
    if (inWishlist)
      addToWishlistBtn.innerHTML = `<i data-lucide="heart" class="size-5" fill="white"></i>`;
    else
      addToWishlistBtn.innerHTML = `<i data-lucide="heart" class="size-5"></i>`;

    btnsContainer.append(addToWishlistBtn);
    menuItem.append(btnsContainer);

    targetContainer.append(menuItem);

    // ** Event Listeners **
    addToCartBtn.addEventListener("click", () => {
      // renderProducts(selectedProducts, targetContainer);
      HandleInCart(product, addToCartBtn);
    });
    addToWishlistBtn.addEventListener("click", () => {
      handleWishlist(product, addToWishlistBtn);
    });
  });
}
