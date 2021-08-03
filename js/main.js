window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // menu
  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu-button');
    const menu = document.querySelector('.header-menu');

    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('header-menu--visible');
    });
  };
  toggleMenu();
});