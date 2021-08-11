window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // menu
  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu-button');
    const menu = document.querySelector('.header-menu');
    const items = menu.querySelectorAll('a');
    const containers = document.querySelectorAll('.title');

    const handlerMenu = () => {
      menu.classList.toggle('header-menu--visible');
      menuBtn.classList.toggle('menu-button--active');
    };

    const switchLinks = (el) => {
      let current;
      [].forEach.call(items, (item, index) => {
        if (item === el) {
          current = index;
        }
      });
      return current;
    };

    const scroll = (el, direction) => {
      let duration = 20000;
      let start = new Date().getTime();

      let fn = () => {
        let top = el.getBoundingClientRect().top;
        let now = new Date().getTime() - start;
        let result = Math.round(top * now / duration);
        if (result > direction * top) {
          result = top;
        } else if (result === 0) {
          result = direction;
        } else { result = result; }
        if (direction * top > 0) {
          window.scrollBy(0, result);
          requestAnimationFrame(fn);
        }
      };
      requestAnimationFrame(fn);
    };

    const selectContainer = (current) => {

      [].forEach.call(containers, (container, index) => {

        if (index === current) {
          let startY = container.getBoundingClientRect().top;
          let direction;
          if (startY < 0) {
            direction = -1;
          }
          if (startY > 0) {
            direction = 1;
          } else { direction = 0; }
          if (direction === 0) {
            return;
          }
          scroll(container, direction);
        }
      });
    };

    menuBtn.addEventListener('click', handlerMenu);

    menu.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;

      if (target.tagName !== 'A') {
        return;
      }
      let current = switchLinks(target);

      selectContainer(current);
      handlerMenu();
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
    const popup = document.querySelectorAll('.popup');
    const modalBtn = document.querySelectorAll('[data-toogle=modal]');
    const btnResponse = document.querySelector('.modal__button');

    const disabledScroll = () => {
      const widthScroll = window.innerWidth - document.body.offsetWidth;
      document.body.dbScrollY = window.scrollY;
      console.log(document.body.dbScrollY);

      document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
        `;
    };

    const enableScroll = () => {
      document.body.style.cssText = '';
      window.scroll({
        top: document.body.dbScrollY,
      });
      console.log(document.body.dbScrollY);
    };

    const openModal = () => {
      modal.style.display = 'block';
      disabledScroll();
    };

    const closeModal = () => {
      modal.style.display = 'none';
      enableScroll();
    };

    modalBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        openModal();
      });
    });

    modal.addEventListener('click', (event) => {
      const target = event.target;
      if (target.matches('.modal__close') || target.matches('.modal')) {
        closeModal();
      }
    });

    btnResponse.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal();
      popup.forEach((elem) => {
        elem.classList.toggle('popup--active');
      });
      popup[1].style.display = 'none';
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

  // maskPhone
  maskPhone('#phone');

  // validate form
  const validateForm = () => {
    const modal = document.querySelector('.modal');
    const popup = document.querySelectorAll('.popup');
    const modalForm = document.querySelector('.modal-form');
    const inputAll = document.querySelectorAll('input');
    const subscribeForm = document.querySelector('.subscribe-form');
    const subscribeInput = document.querySelector('.subscribe-form__input');

    let isValidate = false;

    const regName = /^[А-Яа-яЁё]{2,16}$/;
    const regEmail = /[a-z]+@[a-z]+\.[a-z]{2,4}$/;

    const submit = () => {
      popup.forEach((elem) => {
        elem.classList.toggle('popup--active');
      });
      popup[1].style.display = 'block';
    };

    const validate = (elem) => {

      if (elem.name === 'name') {
        if (!regName.test(elem.value) && elem.value !== '') {
          elem.style.border = 'solid red';
          elem.nextElementSibling.textContent = 'Только кириллица';
          isValidate = false;
          if (elem.value.length < 2) {
            elem.nextElementSibling.textContent = 'Минимум 2 символа';
            isValidate = false;
          }
        } else {
          elem.style.border = 'none';
          elem.nextElementSibling.textContent = '';
          isValidate = true;
        }
      }

      if (elem.name === 'email') {
        if (!regEmail.test(elem.value)) {
          elem.style.border = 'solid red';
          elem.nextElementSibling.textContent = 'Неверный формат e-mail';
          isValidate = false;
        } else {
          elem.style.border = 'none';
          elem.nextElementSibling.textContent = '';
          isValidate = true;
        }
      }
    };

    inputAll.forEach((elem) => {
      elem.addEventListener('blur', () => {
        validate(elem);
      });
    });

    inputAll.forEach((elem) => {
      elem.addEventListener('input', () => {
        validate(elem);
      });
    });

    subscribeInput.addEventListener('blur', () => {
      if (!regEmail.test(subscribeInput.value)) {
        subscribeInput.style.border = 'solid red';
        subscribeForm.nextElementSibling.textContent = 'Неверный формат e-mail';
        isValidate = false;
      } else {
        subscribeInput.style.border = 'none';
        subscribeForm.nextElementSibling.textContent = '';
        isValidate = true;
      }
    });

    subscribeInput.addEventListener('input', () => {
      if (!regEmail.test(subscribeInput.value)) {
        subscribeInput.style.border = 'solid red';
        subscribeForm.nextElementSibling.textContent = 'Неверный формат e-mail';
        isValidate = false;
      } else {
        subscribeInput.style.border = 'none';
        subscribeForm.nextElementSibling.textContent = '';
        isValidate = true;
      }
    });

    modalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      inputAll.forEach((elem) => {
        if (elem.value === '') {
          elem.nextElementSibling.textContent = 'Данное поле не заполнено';
          isValidate = false;
        } else {
          elem.nextElementSibling.textContent = '';
          isValidate = true;
        }
      });

      if (isValidate) {
        submit();
        modalForm.reset();
      }
    });

    subscribeForm.addEventListener('submit', (event) => {
      event.preventDefault();

      for (let elem of subscribeForm.elements) {
        if (elem.tagName !== 'BUTTON') {
          if (elem.value === '') {
            subscribeForm.nextElementSibling.textContent = 'Данное поле не заполнено';
            isValidate = false;
          } else {
            subscribeForm.nextElementSibling.textContent = '';
            isValidate = true;
          }
        }
      }

      if (isValidate) {
        modal.style.display = 'block';
        popup[1].style.display = 'block';
        submit();
        subscribeForm.reset();
      }
    });
  };
  validateForm();

  // arrow top
  const scrollTop = () => {
    const block = document.getElementById('recommended');
    const arrowTop = document.querySelector('.to-top');
    const logoLinks = document.querySelectorAll('.logo');
    console.log(logoLinks);

    const windowScroll = () => {
      const domRec = block.getBoundingClientRect().bottom;

      if (window.pageYOffset < domRec) {
        arrowTop.style.visibility = 'hidden';
      } else {
        arrowTop.style.visibility = 'visible';
      }
    };

    const smoothScroll = () => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - (currentScroll / 35));
      }
    };

    arrowTop.addEventListener('click', (event) => {
      event.preventDefault();
      smoothScroll();
    });

    logoLinks.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        smoothScroll();
      });
    });

    window.addEventListener('load', () => {
      windowScroll();
    });

    window.addEventListener('scroll', () => {
      windowScroll();
    });
  };
  scrollTop();
});