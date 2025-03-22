import { renderProducts } from "./global.js";
import { categories, products } from "./data.js";

const menuItemsContainer = document.getElementById("menu-items");
const menuCategories = document.getElementById("menu-categories");

// create menu categories slider
const swiper = new Swiper(".swiper", {
  spaceBetween: 100,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 80,
    },
  },
});

// handle initial render
swiper.on("init", () => {
  renderProducts(
    products.filter((product) => product.categoryId === 1),
    menuItemsContainer
  );
});
swiper.emit("init");

// handle on change the active slide
swiper.on("slideChange", () => {
  // Ensure we have a valid swiper instance
  if (!swiper || !swiper.slides) return;

  // Remove active class from all slides
  document.querySelectorAll(".swiper-slide").forEach((slide) => {
    slide.classList.add("opacity-50");
    slide.classList.remove("opacity-100");
  });

  // Get the active slide using realIndex
  const activeSlide = swiper.slides[swiper.activeIndex];
  if (activeSlide) {
    activeSlide.classList.add("opacity-100");
    activeSlide.classList.remove("opacity-50");
  }

  const categoryId = swiper.activeIndex + 1;
  renderProducts(
    products.filter((product) => product.categoryId === categoryId),
    menuItemsContainer
  );

  lucide.createIcons();
});

// create menu categories slider slides
const menuCategoriesSlides = categories.map(({ id, image }, i) => {
  const containerDiv = document.createElement("div");
  containerDiv.classList.add(
    "swiper-slide",
    "w-full",
    "flex",
    "justify-center",
    "items-center",
    i === 0 ? "opacity-100" : "opacity-50"
  );
  containerDiv.setAttribute("data-id", id);

  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add(
    "w-40",
    "h-40",
    "mx-auto",
    "rounded-full",
    "bg-gray-50",
    "text-gray-900",
    "flex",
    "justify-center",
    "items-center",
    "overflow-hidden"
  );

  const categoryImg = document.createElement("img");
  categoryImg.classList.add("max-w-full", "aspect-square", "object-cover");
  categoryImg.src = image;
  categoryImg.alt = "category-image";
  categoryDiv.append(categoryImg);

  containerDiv.append(categoryDiv);

  return containerDiv;
});
menuCategories.append(...menuCategoriesSlides);
