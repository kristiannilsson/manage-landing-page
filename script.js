//Global variables
const MOBILE_SNAP_WIDTH = 1100;
let menuOpen = false;

//Elements
const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const header = document.querySelector("header");
const overlay = generateOverlay();
const form = document.getElementById("newsletter");
const slider = new Splide(".splide", {
  arrows: false,
  autoplay: false,
  focus: "center",
  gap: "2rem",
  perPage: 1,
  type: "loop",
}).mount();

//Eventlisteners
menuButton.addEventListener("click", toggleMenu);
window.addEventListener("resize", menuResizeLogic);
window.addEventListener("resize", sliderResizeLogic);
form.addEventListener("submit", handleSubmit);
form.addEventListener("input", handleInput);

onMobile = () => window.innerWidth < MOBILE_SNAP_WIDTH;

//Updates the passed object
sliderRefresh = (obj) => {
  obj.destroy();
  obj.mount();
};

//Generates and appends the overlay which fades the site
function generateOverlay() {
  const element = document.createElement("div");
  element.className = "fade-overlay";
  header.appendChild(element);
  return element;
}

//Adds overlay, updates icon and makes mobile menu visible
function toggleMenu(e) {
  if (menuOpen) {
    menuButton.src = "./images/icon-hamburger.svg";
    menu.style.display = "none";

    //Removes overlay
    overlay.style.display = "none";
    document.body.style.overflow = "visible";
  } else {
    menuButton.src = "./images/icon-close.svg";
    menu.style.display = "flex";

    //Adds overlay and prevent scrolling
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }
  menuOpen = !menuOpen;
}

//Updates the display states on window resizing.
function menuResizeLogic() {
  if (onMobile() && menuOpen) {
    menu.style.display = "flex";
  } else if (onMobile()) {
    menu.style.display = "none";
  } else {
    //closes menu if it is open
    if (menuOpen) {
      toggleMenu();
    }
    //toggleMenu() sets display to none, this changes it back
    menu.style.display = "flex";
  }
}

//Changes slider options depending on screen-size,
//then triggers a re-render if something has changed.
function sliderResizeLogic() {
  let newOptions;
  if (onMobile()) {
    newOptions = {
      fixedHeight: 0,
      fixedWidth: 0,
    };
  } else {
    newOptions = {
      fixedHeight: 400,
      fixedWidth: "40%",
    };
  }
  //Only re-render if something has changed
  if (newOptions !== slider.options) {
    slider.options = newOptions;
    sliderRefresh(slider);
  }
}

function handleSubmit(e) {
  const errorText = form.querySelector("p");
  console.log(errorText);
  errorText.style.display = "block";
  e.preventDefault();
}

function handleInput(e) {
  const btn = form.querySelector("button");
  console.log(e.target.value);
  btn.disabled = e.target.value
    ? (btn.disabled = false)
    : (btn.disabled = true);
}

//Every element is set for the right inital screen size.
menuResizeLogic();
sliderResizeLogic();
