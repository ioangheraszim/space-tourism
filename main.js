const btnOpen = document.querySelector(".btn-open");
const btnClose = document.querySelector(".btn-close");
const navList = document.querySelector(".nav__list");

btnOpen.addEventListener("click", () => {
  navList.classList.add("is-active");
  console.log("button clicked");
});

btnClose.addEventListener("click", () => {
  navList.classList.remove("is-active");
});
