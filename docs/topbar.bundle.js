/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/assets/js/topbar.js ***!
  \*********************************/


var iconMobile = document.querySelector(".header-menu-icon");
var headerMenu = document.querySelector(".header-menu");
var isMenuOpen = false;
var mobileMenuDOM;

var closeMenu = function closeMenu() {
  mobileMenuDOM.classList.remove("open");
};

var createMobileMenu = function createMobileMenu() {
  mobileMenuDOM = document.createElement("div");
  mobileMenuDOM.classList.add("mobile-menu");
  mobileMenuDOM.addEventListener("click", function (event) {
    event.stopPropagation();
  });
  mobileMenuDOM.append(headerMenu.querySelector("ul").cloneNode(true));
  headerMenu.append(mobileMenuDOM);
};

var openMenu = function openMenu() {
  if (!mobileMenuDOM) {
    createMobileMenu();
  }

  mobileMenuDOM.classList.add("open");
};

var toggleMobileMenu = function toggleMobileMenu(event) {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }

  isMenuOpen = !isMenuOpen;
};

iconMobile.addEventListener("click", function (event) {
  event.stopPropagation();
  toggleMobileMenu();
});
window.addEventListener("click", function () {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});
window.addEventListener("resize", function (event) {
  if (window.innerWidth > 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});
/******/ })()
;
//# sourceMappingURL=topbar.bundle.js.map