'use strict';

var buttons = document.querySelectorAll('.js-check-button');
var lists = document.querySelectorAll('.js-check-list');

buttons.forEach(function (item, index) {
  item.addEventListener('click', function () {
    item.classList.toggle('closed');
    lists[index].classList.toggle('closed');
  });
});

function openPopup() {
  popup.classList.add('opened');
  popupCloseButton.addEventListener('click', closePopup);
  popup.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopup);
  page.classList.add('popup-opened');
}

function closePopup(evt) {
  var target = evt.target;
  if (target.classList.contains('js-popup') || target.classList.contains('js-popup-close') || evt.code === 'Escape') {
    popup.classList.remove('opened');
    popupCloseButton.removeEventListener('click', closePopup);
    popup.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', closePopup);
    page.classList.remove('popup-opened');
  }
}

var page = document.querySelector('.page');
var popup = document.querySelector('.js-popup');
var popupOpenButton = document.querySelector('.js-popup-open');
var popupCloseButton = document.querySelector('.js-popup-close');

popupOpenButton.addEventListener('click', openPopup);

function scroll(scrollTarget) {
  var scroller = setInterval(function () {
    if (scrollY < scrollTarget) {
      window.scrollBy(0, 20);
    } else {
      clearInterval(scroller);
    }
  }, 10);
}

var coords = {
  advantages: document.querySelector('.advantages').offsetTop,
  aboutCompany: document.querySelector('.about-company').offsetTop,
  services: document.querySelector('.services').offsetTop,
};

var scrollButton = document.querySelector('.js-scroll');

scrollButton.addEventListener('click', function () {
  if (scrollY < coords.advantages) {
    scroll(coords.advantages);
  } else if (scrollY >= coords.advantages && scrollY < coords.aboutCompany) {
    scroll(coords.aboutCompany);
  } else if (scrollY >= coords.aboutCompany && scrollY < coords.services) {
    scroll(coords.services);
  }
});

document.addEventListener('scroll', function () {
  if (scrollY >= coords.services) {
    scrollButton.classList.add('hidden');
  } else if (scrollY < coords.services && scrollButton.classList.contains('hidden')) {
    scrollButton.classList.remove('hidden');
  }
});
