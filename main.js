import { Application } from "@splinetool/runtime";

const canvas = document.getElementById("canvas3d");
const app = new Application(canvas);
let itemLoaded = false;
app.load("https://prod.spline.design/2Rt17uOifuOTCcU2/scene.splinecode");

// Function to dynamically create scroll items
function createScrollItems(count) {
  // Access the global configuration variables
  const listDivId = window.myGlobalConfig.listDivId;
  // Step 1: Select the parent div using the global variable
  const listDiv = document.getElementById(listDivId);
  const listItems = listDiv.querySelectorAll('[role="listitem"]');
  const itemsArray = [];
  listItems.forEach(item => {
      itemsArray.push(item.textContent.trim());
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
  console.log(`Scroll item ${index + 1} clicked!`);
  app.setVariable("ClickFromScrollbar", true);
  switch (index) {
    case 1:
      app.emitEvent("mouseUp", "Icon");
      break;
    case 2:
      app.emitEvent("mouseUp", "IconFilm");
      break;
    case 3:
      app.emitEvent("mouseUp", "IconGame");
      break;
    case 4:
      app.emitEvent("mouseUp", "IconDMedia");
      break;
    case 5:
      app.emitEvent("mouseUp", "IconAMH");
      break;
    case 6:
      app.emitEvent("mouseUp", "IconAviation");
      break;
    case 7:
      app.emitEvent("mouseUp", "IconEmotion");
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

setInterval(() => {
  if (app.getVariable("ViewState")) {
    showScrollBar();
  } else {
    hideScrollBar();
  }
}, 100); // Check every 100 milliseconds
// Add event listener to create scroll items when DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (!itemLoaded) {
    const itemCount = 7; // Set the number of items you want to add
    createScrollItems(itemCount);
  }
});
