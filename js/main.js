window.addEventListener('DOMContentLoaded', () => {
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
const categorySlider = new Swiper('.category-slider', {
  navigation: {
    nextEl: '.slider-category__button--next',
    prevEl: '.slider-category__button--prev',
  },
});

// slider
const unreleasedSlider = new Swiper('.unreleased-slider', {
  navigation: {
    nextEl: '.slider-unreleased__button--next',
    prevEl: '.slider-unreleased__button--prev',
  },
});

// modal
const toogleModal = () => {
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toogle=modal]');

  modalBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });

  modal.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('modal__close')) {
      modal.style.display = 'none';
    }
  });
};
toogleModal();