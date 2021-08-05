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

// slider
const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  // loop: true,
  // watchOverflow: false,

  // Navigation arrows
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
    // hiddenClass: 'swiper-button-hidden',
  },

});