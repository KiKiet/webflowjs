import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
let isShowed = false; // Check if all ui is showed
let infoShowed = false; // Check if info tab is showed
const listDiv = document.getElementById("list");
const loaderContainer = document.getElementById("loader-container");

app
    .load("https://prod.spline.design/2Rt17uOifuOTCcU2/scene.splinecode")
    .then(() => {
      app.setBackgroundColor("#cfddff");
      hideLoader();
      createScrollItems();
      showScrollBar();
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
    });

// Function to show the loader with a fade-in effect
function showLoader() {
  loaderContainer.style.display = "block";
  const loader = document.getElementById("loader");
  loader.style.animation = "spin 2s linear infinite, fadeIn 0.5s ease-in-out";
}

// Function to hide the loader with a fade-out effect
function hideLoader() {
  const loader = document.getElementById("loader");
  loader.style.animation = "spin 2s linear infinite, fadeOut 0.5s ease-in-out";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500); // Wait for the fadeOut animation to complete
}

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
  app.setVariable("ClickFromScrollbar", true);

  enableAllScrollItems();
  disableScrollItemByIndex(index);
  if (isShowed){
    switchTabTriggerForButtons.click();
  }
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

  // Enable pointer events for canvas to block interactions with canvas
    canvas.style.pointerEvents = "none";
}

async function hideCloseButton() {
  const closeButton = document.getElementById("close-button");
  const scrollContainer = document.getElementById("scroll-container");
  closeButton.style.animation = "button-easeOutToTop 0.5s ease-out";
  await delay(400);
  closeButton.style.display = "none";

  scrollContainer.style.width = "100%"; // Reset width when close button is hidden
  scrollContainer.style.animation = "lengthenScrollBar 1s ease-out"; // Apply lengthen animation

  // Disable pointer events for canvas
  canvas.style.pointerEvents = "auto";

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
    infoTabButton.click();
    infoShowed = true;
  }
}

async function hideInfo(){
  if (infoShowed){
    infoTabButton.click();
  }
  await delay(800);
  infoTab.style.display = 'none';
  infoShowed = false;
}

const closeButton = document.getElementById("close-button");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const switchTabTriggerForButtons = document.getElementById("switch-tab-anim-trigger-forbuttons");
const switchTabTriggerForSwipeLeft = document.getElementById("switch-tab-anim-trigger-forswipeleft");
const switchTabTriggerForSwipeRight = document.getElementById("switch-tab-anim-trigger-forswiperight");
let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;
const threshold = 50; // Minimum distance to be considered a slide
const allowedTime = 300; // Maximum time to consider it a slide
let startTime = 0;

infoTab.addEventListener('touchstart', (e) => {
  const touchObj = e.changedTouches[0];
  startX = touchObj.pageX;
  startY = touchObj.pageY;
  startTime = new Date().getTime(); // Record time when touch starts
});

infoTab.addEventListener('touchend', (e) => {
  const touchObj = e.changedTouches[0];
  distX = touchObj.pageX - startX; // Distance moved horizontally
  distY = touchObj.pageY - startY; // Distance moved vertically
  const elapsedTime = new Date().getTime() - startTime; // Time elapsed

  if (elapsedTime <= allowedTime) { // Check that time threshold is met
    if (Math.abs(distX) >= threshold && Math.abs(distY) <= threshold) {
      // Horizontal slide detected
      if (distX > 0) {
        // Trigger a custom slide right event or call a function
        console.log('Slide Right');
        switchTabTriggerForSwipeRight.click();
      } else {
        // Trigger a custom slide left event or call a function
        console.log('Slide Left');
        switchTabTriggerForSwipeLeft.click();
      }
    } 
  }
});

infoTabButton.addEventListener("click", () => {
  handleTabIconClick();
});

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

switchTabTriggerForButtons.addEventListener("click", () => {
  handleSwitchTabForButtonsClick();
});

switchTabTriggerForSwipeLeft.addEventListener("click", () => {
  enableScrollItemByIndex(app.getVariable("State"));
  disableScrollItemByIndex(app.getVariable("State") + 1);
  handleSwitchTabForSwipeLeftClick();
  handleNextClick();
});

switchTabTriggerForSwipeRight.addEventListener("click", () => {
  enableScrollItemByIndex(app.getVariable("State"));
  disableScrollItemByIndex(app.getVariable("State") - 1);
  handleSwitchTabForSwipeRightClick();
  handlePreviousClick();
});

function handleTabIconClick(){
  infoShowed = !infoShowed;
}

function handleNextClick(){
  app.emitEvent("mouseDown", "RightButton");
}

function handlePreviousClick(){
  app.emitEvent("mouseDown", "LeftButton");
}

function handleCloseClick(){
  app.emitEvent("mouseDown", "CloseButton");
  hideCloseButton();
  hideInfo();
  isShowed = false;
}

function handleSwitchTabForButtonsClick(){
  switchTabTriggerForButtons.click();
}

function handleSwitchTabForSwipeLeftClick(){
  switchTabTriggerForSwipeLeft.click();
}

function handleSwitchTabForSwipeRightClick(){
  switchTabTriggerForSwipeRight.click();
}

// Add event listener to create scroll items when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Show the loader when the page starts loading
  showLoader();
  hideInfo();
  // if (!itemLoaded) {
  //   createScrollItems();
  //   showScrollBar();
  // }
  // if (splineLoaded) {
  //   setInterval(() => {
  //     if (app.getVariable("ViewState")) {
  //       showInfo(app.getVariable("State"));
  //       if (isShowed == false) {
  //         showCloseButton();
  //         disableScrollItemByIndex(app.getVariable("State"));
  //         isShowed = true;
  //       }
  //     }
  //   }, 100); // Check every 100 milliseconds
  // }
});
