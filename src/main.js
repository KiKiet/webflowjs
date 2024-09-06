import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
let isShowed = false; // Check if all ui is showed
let infoShowed = false; // Check if info tab is showed
const listDiv = document.getElementById("titleList");
const loaderContainer = document.getElementById("loader-container");
const boothIconName = ["IconBOSCH", "IconHCLTech", "IconNetcompany", "IconSchneider",
  "Iconnab", "IconKatalon", "IconMarvell", "IconSchaeffler", "IconFaraday",
  "IconVirtuos", "IconPFourP", "IconPlasticPeople", "IconVietjetAir", "IconRadisson", "IconCathayPacific",
  "IconMarriot", "IconProjectPluto", "IconLimLoop", "IconRMIT", "IconAveryDennison", "IconSaint-Gobain",
  "IconMaersk", "IconDHL", "IconLi&Fung", "IconDentsu",  "IconUniClo","IconShuttlerock", "IconGiangdayviVietNam",
  "IconUnicef", "IconPWC", "IconChristinaNobleFoundation", "IconTikTok", "IconVietThai", "IconSamsung",
  "IconTotalEnergies", "IconNestle", "IconMondelez", "IconPerfetti", "IconUniversalRobina", "IconP&G", "IconShopee",
  "IconCentralRetail", "IconDKSH"]

app
    .load("https://prod.spline.design/C4gOgqmxM3MgNjvH/scene.splinecode")
    .then(() => {
      app.setBackgroundColor("#cfddff");
      hideLoader();
      createScrollItems();
      ShowHamburgerMenu();
      // showScrollBar();
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
  // const listItems = listDiv.querySelectorAll('[role="listitem"]');
  // const itemsArray = [];
  // listItems.forEach(item => {
  //   const boothName = item.querySelector('.program');
  //   itemsArray.push(boothName.textContent.trim());
  // });
  // const scrollContent = document.querySelector(".scroll-content");

  // for (let i = 0; i < itemsArray.length; i++) {
  //   const item = document.createElement("div");
  //   item.className = "scroll-item";
  //   item.textContent = itemsArray[i];
  //   item.addEventListener("click", () => {
  //     handleScrollItemClick(i+1);
  //   });
  //   scrollContent.appendChild(item);
  // }
  const listItems = listDiv.querySelectorAll('[role="listitem"]');
  console.log(listItems);
  listItems.forEach(menu => {
    console.log(menu.querySelector('.title'));
    const title = menu.querySelector('.title');
    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown-menu";

    const dropdownTitle = document.createElement("div");
    dropdownTitle.className = "dropdown-title";
    if (title != null){
      dropdownTitle.textContent = title.textContent.trim();
    }
    
    dropdownDiv.appendChild(dropdownTitle);

    const nameListDiv = document.getElementById("nameList");
    const nameListItems = nameListDiv.querySelectorAll('[role="listitem"]');

    nameListItems.forEach(item => {
      const name = item.querySelector('.item');
      const index = item.querySelector('.index');
      const itemDiv = document.createElement("div");
      itemDiv.className = "dropdown-item";
      itemDiv.textContent = name.textContent.trim();
      itemDiv.addEventListener("click", () => {
        handleScrollItemClick(parseInt(index.textContent.trim())+1);
      });

      dropdownDiv.appendChild(itemDiv);
    });

    scrollContainerWrapper.appendChild(dropdownDiv);
  });
}

// Function to disable a scroll item by its index
function disableScrollItemByIndex(index) {
  const scrollItems = document.querySelectorAll(".dropdown-item");
  scrollItems[index-1].classList.add("disabled");
}

// Function to disable a scroll item by its index
function enableScrollItemByIndex(index) {
  const scrollItems = document.querySelectorAll(".dropdown-item");
  scrollItems[index-1].classList.remove("disabled");
}

// Function to enable all scroll items
function enableAllScrollItems() {
  const scrollItems = document.querySelectorAll(".dropdown-item");
  scrollItems.forEach((item) => {
    item.classList.remove("disabled");
  });
}

// Function to handle scroll item click
function handleScrollItemClick(index) {
  console.log(`Scroll item ${index} clicked!`);
  app.setVariable("ClickFromScrollbar", true);
  enableAllScrollItems();
  // disableScrollItemByIndex(index);
  if (isShowed){
    switchTabTriggerForButtons.click();
  }
  if (app.getVariable("State") != index) {
    app.emitEvent("mouseUp", boothIconName[index-1]);
  }
}

// Function to show the scroll bar
function showScrollBar() {
  const scrollContainer = document.getElementById("scroll-container-wrapper");
  if (scrollContainer) {
    scrollContainer.style.display = "flex";
    scrollContainer.style.animation = "scrollBar-easeInFromTop 0.5s ease-out";
  }
}

async function showCloseButton() {
  const closeButton = document.getElementById("close-button");
  await delay(500);
  closeButton.style.display = "flex";
  closeButton.style.animation = "button-easeInFromTop 0.5s ease-out"; // Apply animation

  // Enable pointer events for canvas to block interactions with canvas
  canvas.style.pointerEvents = "none";
}

async function hideCloseButton() {
  const closeButton = document.getElementById("close-button");
  closeButton.style.animation = "button-easeOutToTop 0.5s ease-out";
  await delay(400);
  closeButton.style.display = "none";

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

const hamburgerMenu = document.getElementById("hamburger-menu");
const scrollContainerWrapper = document.getElementById("scroll-container-wrapper");

function ShowHamburgerMenu(){
  hamburgerMenu.style.display = "flex";
}

// Function to toggle the dropdown visibility
function toggleDropdown(dropdownDiv) {
  if (dropdownDiv.style.display === "none" || !dropdownDiv.style.display) {
    dropdownDiv.style.display = "flex";
    dropdownDiv.style.animation = "dropdown-expand 0.3s ease-out forwards";
  } else {
    dropdownDiv.style.animation = "dropdown-collapse 0.3s ease-in-out forwards";
    setTimeout(() => {
      dropdownDiv.style.display = "none";
    }, 300); // Wait for animation to finish
  }
}

// Toggle menu visibility on hamburger click
hamburgerMenu.addEventListener("click", async () => {
  hamburgerMenu.classList.toggle("active");
  if (hamburgerMenu.classList.contains("active")) {
    scrollContainerWrapper.style.display = "flex";
    scrollContainerWrapper.style.animation = "expandDown 0.5s ease-out forwards";
  } else {
    scrollContainerWrapper.style.animation = "fadeOutUp 0.5s ease-out forwards";
    await delay(600);
    scrollContainerWrapper.style.display = "none";
    
  }
});

// Add event listener for each dropdown title
scrollContainerWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("dropdown-title")) {
    const dropdownDiv = e.target.nextElementSibling;
    toggleDropdown(dropdownDiv);
  }
});

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
  // infoTabButton.click();
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
