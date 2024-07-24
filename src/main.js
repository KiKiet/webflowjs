import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
let itemLoaded = false; // Check if scroll items is loaded
let isShowed = false; // Check if all ui is showed
let infoShowed = false; // Check if info tab iss showed
let currentlySelectedItem = null; // Track the currently selected item
const listDiv = document.getElementById("list");
app.load("https://prod.spline.design/2Rt17uOifuOTCcU2/scene.splinecode");

// Function to dynamically create scroll items
function createScrollItems() {
  // Step 1: Select the parent div using the global variable
  // const listDiv = document.getElementById(listDivId);
  // const listDiv = document.getElementById("list");
  const listItems = listDiv.querySelectorAll('[role="listitem"]');
  const itemsArray = [];
  listItems.forEach(item => {
    const boothName = item.querySelector('.program');
    itemsArray.push(boothName.textContent.trim());
  });
  const scrollContent = document.querySelector(".scroll-content");

  for (let i = 1; i <= itemsArray.length; i++) {
    const item = document.createElement("div");
    item.className = "scroll-item";
    item.textContent = itemsArray[i-1];
    item.addEventListener("click", () => {
      handleScrollItemClick(i);
    });
    scrollContent.appendChild(item);
  }
  itemLoaded = true;
}

// Function to disable a scroll item by its index
function disableScrollItemByIndex(index) {
  const scrollItems = document.querySelectorAll(".scroll-item");
  scrollItems[index - 1].classList.add("disabled");
}

// Function to disable a scroll item by its index
function enableScrollItemByIndex(index) {
  const scrollItems = document.querySelectorAll(".scroll-item");
  scrollItems[index - 1].classList.remove("disabled");
}

// Function to enable all scroll items
function enableAllScrollItems() {
  const scrollItems = document.querySelectorAll(".scroll-item");
  scrollItems.forEach((item) => {
    item.classList.remove("disabled");
  });
}

// Function to handle scroll item click
function handleScrollItemClick(index) {
  console.log(`Scroll item ${index} clicked!`);
  // previousButton.click();
  app.setVariable("ClickFromScrollbar", true);

  enableAllScrollItems();
  disableScrollItemByIndex(index);
  switch (index) {
    case 1:
      if (app.getVariable("State") != 1){
        app.emitEvent("mouseUp", "Icon");
      }
      break;
    case 2:
      if (app.getVariable("State") != 2){
        app.emitEvent("mouseUp", "IconFilm");
      }
      break;
    case 3:
      if (app.getVariable("State") != 3){
        app.emitEvent("mouseUp", "IconGame");
      }
      break;
    case 4:
      if (app.getVariable("State") != 4){
        app.emitEvent("mouseUp", "IconDMedia");
      }
      break;
    case 5:
      if (app.getVariable("State") != 5){
        app.emitEvent("mouseUp", "IconAMH");
      }
      break;
    case 6:
      if (app.getVariable("State") != 6){
        app.emitEvent("mouseUp", "IconAviation");
      }
      break;
    case 7:
      if (app.getVariable("State") != 7){
        app.emitEvent("mouseUp", "IconEmotion");
      }
      break;
    default:
      break;
  }
  // Add your custom logic here
}

// Function to show the scroll bar
function showScrollBar() {
  const scrollContainer = document.getElementById("scroll-container-wrapper");
  if (scrollContainer) {
    scrollContainer.style.display = "flex";
    scrollContainer.style.animation = "scrollBar-easeInFromTop 0.5s ease-out";
  }
}

// Function to hide the scroll bar
function hideScrollBar() {
  const scrollContainer = document.getElementById("scroll-container-wrapper");
  if (scrollContainer) {
    scrollContainer.style.display = "none";
  }
  // Disable pointer events for canvas2d
  const canvas2d = document.getElementById("canvas2d");
  if (canvas2d) {
    canvas2d.style.pointerEvents = "none";
  }
}

async function showCloseButton() {
  const closeButton = document.getElementById("close-button");
  const scrollContainer = document.getElementById("scroll-container");
  scrollContainer.style.width = "calc(100% - 43px)";
  scrollContainer.style.animation = "shortenScrollBar 0.5s ease-out"; // Apply shorten animation
  await delay(500);
  closeButton.style.display = "flex";
  closeButton.style.animation = "button-easeInFromTop 0.5s ease-out"; // Apply animation

  // Enable pointer events for canvas2d to block interactions with canvas3d
  const canvas2d = document.getElementById("canvas2d");
  if (canvas2d) {
    canvas2d.style.pointerEvents = "auto";
  }
}

async function hideCloseButton() {
  const closeButton = document.getElementById("close-button");
  const scrollContainer = document.getElementById("scroll-container");
  closeButton.style.animation = "button-easeOutToTop 0.5s ease-out";
  await delay(400);
  closeButton.style.display = "none";

  scrollContainer.style.width = "100%"; // Reset width when close button is hidden
  scrollContainer.style.animation = "lengthenScrollBar 1s ease-out"; // Apply lengthen animation

  // Disable pointer events for canvas2d
  const canvas2d = document.getElementById("canvas2d");
  if (canvas2d) {
    canvas2d.style.pointerEvents = "none";
  }

  // Enable all scroll items when the close button is hidden
  enableAllScrollItems();
}

const infoTab = document.getElementById("infoTab");
const infoTabButton = document.getElementById("TabIcon");
const listItems = listDiv.querySelectorAll('[role="listitem"]');
function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}

async function showInfo(index) {
  listItems.forEach((item, idx) => {
    item.style.display = idx === index-1 ? 'block' : 'none';
  });
  if (isShowed == false){
    infoTab.style.display = 'flex';
    await delay(1000);
    infoTabButton.click();
    infoShowed = true;
  }
}

async function hideInfo(){
  infoTabButton.click();
  await delay(800);
  infoTab.style.display = 'none';
  infoShowed = false;
}

const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const closeButton = document.getElementById("close-button");
nextButton.addEventListener("click", () => {
  enableScrollItemByIndex(app.getVariable("State"));
  disableScrollItemByIndex(app.getVariable("State") + 1);
  handleNextClick();
});

previousButton.addEventListener("click", () => {
  enableScrollItemByIndex(app.getVariable("State"));
  disableScrollItemByIndex(app.getVariable("State") - 1);
  handlePreviousClick();
});

closeButton.addEventListener("click", () => {
  handleCloseClick();
});

function handleNextClick(){
  app.emitEvent("mouseDown", "RightButton");
}

function handlePreviousClick(){
  app.emitEvent("mouseDown", "LeftButton");
}

function handleCloseClick(){
  app.emitEvent("mouseDown", "CloseButton");
  hideCloseButton();
  if (infoShowed){
    hideInfo();
  }
  isShowed = false;
}

// Add event listener to create scroll items when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (!itemLoaded) {
    createScrollItems();
    showScrollBar();
  }
  if (app != null) {
    setInterval(() => {
      if (app.getVariable("ViewState")) {
        showInfo(app.getVariable("State"));
        if (isShowed == false) {
          showCloseButton();
          disableScrollItemByIndex(app.getVariable("State"));
          isShowed = true;
        }
      }
    }, 100); // Check every 100 milliseconds
  }
});
