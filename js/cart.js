import { getCartCount } from "./layout.js";

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function renderCartItems() {
  // get cart items from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  if (!cart || cart.length === 0) {
    const noItems = document.createElement("p");
    noItems.classList.add(
      "py-40",
      "text-center",
      "text-bold",
      "text-2xl",
      "text-gray-600"
    );
    noItems.textContent = "لا يوجد منتجات في السلة. من فضلك اضف بعض المنتحات";
    cartItemsContainer.append(noItems);
    return;
  }

  getTotalPrice();

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.setAttribute("data-id", item.id);
    cartItem.classList.add(
      "pb-4",
      "flex",
      "flex-col",
      "sm:flex-row",
      "items-center",
      "sm:items-start",
      "gap-4"
    );

    const cartItemImage = document.createElement("img");
    cartItemImage.src = `.${item.image}`;
    cartItemImage.alt = "item-image";
    cartItemImage.classList.add("max-w-[200px]");
    cartItem.append(cartItemImage);

    const cartItemDetails = document.createElement("div");
    cartItemDetails.classList.add("mt-2", "flex-1");

    const cartItemTitle = document.createElement("h3");
    cartItemTitle.classList.add("text-lg");
    cartItemTitle.textContent = item.title;
    cartItemDetails.append(cartItemTitle);

    const cartItemPrice = document.createElement("p");
    cartItemPrice.classList.add("text-gray-600");
    cartItemPrice.textContent = item.price + " حنيه";
    cartItemDetails.append(cartItemPrice);

    cartItem.append(cartItemDetails);

    const cartItemControls = document.createElement("div");
    cartItemControls.classList.add("flex", "gap-4", "mt-2");

    const cartItemCount = document.createElement("select");
    cartItemCount.classList.add(
      "max-w-fit",
      "block",
      "px-3",
      "py-1",
      "border",
      "border-gray-300",
      "rounded-md"
    );
    cartItemCount.name = "item-count";
    cartItemCount.id = "item-count";
    for (let i = 1; i <= 5; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (item.quantity == i) {
        option.selected = true;
      }
      cartItemCount.append(option);
    }
    cartItemCount.addEventListener("change", (e) => {
      item.quantity = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      getTotalPrice();
    });
    cartItemControls.append(cartItemCount);
    const cartItemRemove = document.createElement("button");
    cartItemRemove.classList.add(
      "text-white",
      "cursor-pointer",
      "px-3",
      "py-0.5",
      "bg-red-600",
      "border",
      "border-red-600",
      "rounded-md"
    );
    cartItemRemove.innerHTML = "<i data-lucide='trash-2' class='size-5'></i>";
    cartItemRemove.addEventListener("click", removeItem.bind(null, item));
    cartItemControls.append(cartItemRemove);
    cartItem.append(cartItemControls);

    cartItemsContainer.append(cartItem);
  });
}

// Function to update total price dynamically
function getTotalPrice() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  if (total > 0) {
    cartTotal.textContent = `اجمالى السله: ${total.toFixed(2)} جنيه`;
    cartTotal.classList.remove("hidden");
    cartTotal.classList.add("pt-4", "mt-10", "border-t", "border-gray-300");
  } else {
    cartTotal.classList.add("hidden");
  }
}

function removeItem(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((cartItem) => cartItem.id !== item.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  getTotalPrice();
  getCartCount();
  lucide.createIcons();
}

renderCartItems();
