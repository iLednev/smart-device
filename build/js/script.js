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
}

function closePopup(evt) {
  var target = evt.target;
  if (target.classList.contains('js-popup') || target.classList.contains('js-popup-close') || evt.code === 'Escape') {
    popup.classList.remove('opened');
  }
  popupCloseButton.removeEventListener('click', closePopup);
  popup.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', closePopup);
}

var popup = document.querySelector('.js-popup');
var popupOpenButton = document.querySelector('.js-popup-open');
var popupCloseButton = document.querySelector('.js-popup-close');

popupOpenButton.addEventListener('click', openPopup)
