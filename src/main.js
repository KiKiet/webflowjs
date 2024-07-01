import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
let itemLoaded = false;
let isShowed = false;
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

// Function to handle scroll item click
function handleScrollItemClick(index) {
  console.log(`Scroll item ${index} clicked!`);
  app.setVariable("ClickFromScrollbar", true);
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
  const scrollContainer = document.getElementById("scroll-container");
  if (scrollContainer) {
    scrollContainer.style.display = "flex";
  }
}

// Function to hide the scroll bar
function hideScrollBar() {
  const scrollContainer = document.getElementById("scroll-container");
  if (scrollContainer) {
    scrollContainer.style.display = "none";
  }
}

const infoTab = document.getElementById("infoTab");
const infoTabButton = document.getElementById("TabIcon");

function showInfo(index) {
  const listItems = listDiv.querySelectorAll('[role="listitem"]');
  infoTab.style.display = 'flex';
  listItems.forEach((item, idx) => {
    item.style.display = idx === index-1 ? 'block' : 'none';
  });
  infoTabButton.click();
}

function hideInfo(){
  infoTabButton.click();
  infoTab.style.display = 'none';
}

const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
nextButton.addEventListener("click", () => {
  handleNextClick();
});

previousButton.addEventListener("click", () => {
  handlePreviousClick();
});

function handleNextClick(){
  app.setVariable('IfNum(Right)', app.getVariable('IfNum(Right)')+1);
}

function handlePreviousClick(){
  app.setVariable('IfNum(Left)', app.getVariable('IfNum(Left)')+1);
}

// Add event listener to create scroll items when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (!itemLoaded) {
    createScrollItems();
  }
  setInterval(() => {
    if (app.getVariable("ViewState")) {
      if (isShowed == false) {
        showScrollBar();
        showInfo(app.getVariable("State"));
        isShowed = true;
      }
    } else {
      hideScrollBar();
      hideInfo();
      isShowed = false 
    }
  }, 100); // Check every 100 milliseconds
});
