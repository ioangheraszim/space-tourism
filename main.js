// Variables
// Navbar Variables
const btnOpen = document.querySelector(".btn-open");
const btnClose = document.querySelector(".btn-close");
const navList = document.querySelector(".nav__list");

// Navbar button even handlers
btnOpen.addEventListener("click", () => {
  navList.classList.add("is-active");
  console.log("button clicked");
});

btnClose.addEventListener("click", () => {
  navList.classList.remove("is-active");
});

// Highlight active nav link
const navLinks = document.querySelectorAll(".nav__link");
const current = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
  const linkFile = link.getAttribute("href").replace("./", "");

  if (linkFile === current) {
    link.parentElement.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

// fetching data
async function init() {
  const res = await fetch("./data.json");
  const data = await res.json();
  if (document.body.classList.contains("background--destination")) {
    initDestination(data);
  }
  if (document.body.classList.contains("background--crew")) {
    initCrew(data);
  }
  if (document.body.classList.contains("background--tech")) {
    initTech(data);
  }
}

init();

// functions to handle buttons
function setupButtons(buttons, callback) {
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      callback(index);
    });
  });
}

// handle destination data
function initDestination(data) {
  const btnTabs = document.querySelectorAll(".btn--tab");

  function destinationData(index) {
    const myData = data.destinations[index];

    const destinationTitle = document.querySelector(".destination__title");
    const destinationText = document.querySelector(".destination__text");
    const statLabels = document.querySelectorAll(".destination__stat-label");
    const statValues = document.querySelectorAll(".destination__stat-value");
    const destinationImg = document.querySelector(".destination__img");

    destinationTitle.textContent = myData.name;
    destinationText.textContent = myData.description;
    destinationImg.src = myData.images.webp;

    statLabels[0].textContent = "Avg. distance";
    statValues[0].textContent = myData.distance;
    statLabels[1].textContent = "Est. travel time";
    statValues[1].textContent = myData.travel;

    // Remove animation classes
    destinationTitle.classList.remove("fade-in");
    destinationText.classList.remove("fade-in");
    statLabels.forEach((label) => label.classList.remove("fade-in"));
    statValues.forEach((value) => value.classList.remove("fade-in"));
    destinationImg.classList.remove("fade-in");

    void destinationImg.offsetWidth;
    // Add animation classes
    destinationTitle.classList.add("fade-in");
    destinationText.classList.add("fade-in");
    statLabels.forEach((label) => label.classList.add("fade-in"));
    statValues.forEach((value) => value.classList.add("fade-in"));
    destinationImg.classList.add("fade-in");
  }

  setupButtons(btnTabs, destinationData);
}

// handle crew data
function initCrew(data) {
  const btnPills = document.querySelectorAll(".btn--pills");

  function crewData(index) {
    const myData = data.crew[index];

    const crewName = document.querySelector(".crew__name");
    const crewCategory = document.querySelector(".crew__category");
    const crewBio = document.querySelector(".crew__body");
    const crewPic = document.querySelector(".crew__img");

    crewName.textContent = myData.name;
    crewCategory.textContent = myData.role;
    crewBio.textContent = myData.bio;
    crewPic.src = myData.images.webp;

    // Remove animation classes
    crewName.classList.remove("fade-left");
    crewCategory.classList.remove("fade-left");
    crewBio.classList.remove("fade-left");
    crewPic.classList.remove("fade-in");

    void crewPic.offsetWidth;
    // Add animation classes
    crewName.classList.add("fade-left");
    crewCategory.classList.add("fade-left");
    crewBio.classList.add("fade-left");
    crewPic.classList.add("fade-in");
  }

  setupButtons(btnPills, crewData);

  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % btnPills.length;
    btnPills[currentIndex].click();
  }, 4000);
}

// handle tech data
function initTech(data) {
  const btnPaging = document.querySelectorAll(".btn--paging");

  function techData(index) {
    const myData = data.technology[index];

    const techName = document.querySelector(".tech__head");
    const techTerm = document.querySelector(".tech__term");
    const techBio = document.querySelector(".tech__body");
    const picture = document.querySelector(".tech__img picture");
    const sources = picture.querySelectorAll("source");
    const img = picture.querySelector("img");

    // Update content
    techName.textContent = myData.name;
    techTerm.textContent = "The Terminology";
    techBio.textContent = myData.description;

    sources[0].srcset = myData.images.portrait;
    sources[1].srcset = myData.images.landscape;
    img.src = myData.images.portrait;

    // Remove animation classes
    techName.classList.remove("fade-top");
    techTerm.classList.remove("fade-top");
    techBio.classList.remove("fade-top");
    img.classList.remove("fade-in");

    void img.offsetWidth;

    // Add animation classes
    techName.classList.add("fade-top");
    techTerm.classList.add("fade-top");
    techBio.classList.add("fade-top");
    img.classList.add("fade-in");
  }

  setupButtons(btnPaging, techData);
}
