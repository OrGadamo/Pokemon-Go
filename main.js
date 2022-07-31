window.onload = () => {
  loadHomePage();
};
//load phase 1 pages
function loadPhase1Pages(page, e) {
  e.preventDefault();
  switch (page) {
    case "home":
      loadHomePage();
      break;
    case "contact":
      loadContactPage();
      break;
    case "about":
      loadAboutPage();
      break;
  }
}
