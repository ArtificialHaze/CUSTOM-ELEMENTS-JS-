let events = ["contextmenu", "touchstart"];
let timeout;
let lastTapped = 0;

let contextmenu = document.getElementById("context-menu");

events.forEach((event) => {
  document.addEventListener(
    event,
    (e) => {
      e.preventDefault();
      let mouseX = e.clientX || e.touches[0].clientX;
      let mouseY = e.clientY || e.touches[0].clientY;

      let menuHeight = contextmenu.getBoundingClientRect().height;
      let menuWidth = contextmenu.getBoundingClientRect().width;

      let width = window.innerWidth;
      let height = window.innerHeight;

      if (width - mouseX <= 200) {
        contextmenu.style.borderRadius = "5px 0 5px 5px";
        contextmenu.style.left = width - menuWidth + "px";
        contextmenu.style.top = mouseY + "px";
        if (height - mouseY <= 200) {
          contextmenu.style.top = mouseY - menuHeight + "px";
          contextmenu.style.borderRadius = "5px 5px 0 5px";
        }
      } else {
        contextmenu.style.borderRadius = "0 5px 5px 5px";
        contextmenu.style.left = mouseX + "px";
        contextmenu.style.top = mouseY + "px";
        if (height - mouseY <= 200) {
          contextmenu.style.top = mouseY - menuHeight + "px";
          contextmenu.style.borderRadius = "5px 5px 5px 0";
        }
      }
      contextmenu.style.visibility = "visible";
    },
    { passive: false }
  );
});

document.addEventListener("touchend", (e) => {
  let currentTime = new Date().getTime();
  let tapLength = currentTime - lastTapped;

  clearTimeout(timeout);
  if (tapLength < 500 && tapLength > 0) {
    contextmenu.style.visibility = "hidden";
    e.preventDefault();
  } else {
    timeout = setTimeout(() => {
      clearTimeout(timeout);
    }, 500);
    contextmenu.style.visibility = "hidden";
  }
  lastTapped = currentTime;
});

document.addEventListener("click", (e) => {
  if (!contextmenu.contains(e.target)) {
    contextmenu.style.visibility = "hidden";
  }
});

let button = document.querySelector(".button");

button.addEventListener("click", () => {
  button.classList.add("active");

  setTimeout(() => {
    button.classList.remove("active");
    document
      .querySelector(".fa-cloud")
      .classList.replace("fa-cloud", "fa-check");
    document.querySelector(".button-text").textContent = "Complete";
  }, 6000);
});
