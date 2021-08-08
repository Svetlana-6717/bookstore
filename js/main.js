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

  // slider Category
  const categorySlider = new Swiper('.category-slider', {
    slidesPerColumnFill: 'column',

    navigation: {
      nextEl: '.slider-category__button--next',
      prevEl: '.slider-category__button--prev',
      disabledClass: 'slider-category__button-disabled',
    },

    breakpoints: {
      320: {
        slidesPerColumnFill: 'row',
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 10,
      },
      577: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 10,
      },
      769: {
        slidesPerView: 3,
      },
      993: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1201: {
        slidesPerView: 4,
        spaceBetween: 26,
      },
    },
  });

  // slider Unreleased
  const unreleasedSlider = new Swiper('.unreleased-slider', {
    slidesPerColumnFill: 'column',
    slidesPerView: 5,

    navigation: {
      nextEl: '.slider-unreleased__button--next',
      prevEl: '.slider-unreleased__button--prev',
      disabledClass: 'slider-unreleased__button-disabled',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      577: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      993: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1201: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
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
      event.preventDefault();
      const target = event.target;

      if (target.matches('.modal__close') || target.matches('.modal')) {
        modal.style.display = 'none';
      }
    });
  };
  toogleModal();

  // change color heart
  const changeColor = () => {
    const iconHeart = document.querySelectorAll('.recommended-card__icon');
    const wrapper = document.querySelector('.recommended-wrapper');

    wrapper.addEventListener('click', (event) => {
      const target = event.target;

      iconHeart.forEach((elem) => {
        if (elem === target) {
          target.src = target.dataset.img;
        }
      });
    });
  };
  changeColor();

});