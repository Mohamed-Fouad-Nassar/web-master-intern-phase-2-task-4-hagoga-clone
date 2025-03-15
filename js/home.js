import { categories, products } from "./data.js";

// vars
const homeCategoriesContainer = document.getElementById("home-categories");
const homeMenuItemsContainer = document.getElementById("home-menu-items");

// create home categories btns
const homeCategoriesBtns = categories.map(({ id, title }) => {
  const btn = document.createElement("button");
  btn.textContent = title;
  btn.setAttribute("data-id", id);
  return btn;
});
homeCategoriesContainer.append(...homeCategoriesBtns);

// set initial selected products and active btn
let selectedProducts = products.filter((product) => {
  return product.categoryId === 1;
});
homeCategoriesBtns.at(0).classList.add("text-primary");
renderProducts(selectedProducts);

// handle category btn click
homeCategoriesBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const selectedCategoryId = e.target.dataset.id;
    selectedProducts = products.filter((product) => {
      return product.categoryId == selectedCategoryId;
    });

    // console.log("selectedCategoryId: ", selectedCategoryId);
    // console.log("selectedProducts: ", selectedProducts);

    // toggle active class to active btn
    homeCategoriesBtns.forEach((btn) => btn.classList.remove("text-primary"));
    e.target.classList.add("text-primary");

    renderProducts(selectedProducts);
  });
});

// create rendered products
function renderProducts(selectedProducts) {
  // console.log("selectedProducts: ", selectedProducts);

  homeMenuItemsContainer.innerHTML = "";

  if (selectedProducts.length === 0) {
    const noItems = document.createElement("p");
    noItems.classList.add(
      "text-center",
      "text-bold",
      "text-2xl",
      "text-gray-400"
    );
    noItems.textContent = "لا يوجد منتجات";
    homeMenuItemsContainer.append(noItems);
    return;
  }

  selectedProducts.forEach((product) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add(
      "p-4",
      "flex",
      "items-center",
      "gap-4",
      "bg-gray-100"
    );

    // right-sec
    const menuItemImage = document.createElement("div");
    menuItemImage.classList.add(
      "max-w-28",
      "aspect-square",
      "flex",
      "justify-center",
      "items-center",
      "border",
      "border-white",
      "rounded-full",
      "p-1"
    );
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = "item-image";
    img.classList.add(
      "w-full",
      "aspect-square",
      "object-cover",
      "rounded-full",
      "overflow-hidden"
    );
    menuItemImage.append(img);

    // left-sec
    const menuItemInfo = document.createElement("div");
    menuItemInfo.classList.add("flex", "flex-col", "gap-2");
    const title = document.createElement("h3");
    title.classList.add("font-bold");
    title.textContent = product.title;
    const price = document.createElement("p");
    price.classList.add("text-primary");
    price.textContent = product.price + " جنية";
    menuItemInfo.append(title, price);

    menuItem.append(menuItemImage, menuItemInfo);

    homeMenuItemsContainer.append(menuItem);
    // console.log("homeMenuItemsContainer: ", homeMenuItemsContainer);
  });
}
