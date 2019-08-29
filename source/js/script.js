'use strict';

// Открывает и закрывает разделы в футере

var buttons = document.querySelectorAll('.js-check-button');
var lists = document.querySelectorAll('.js-check-list');

buttons.forEach(function (item, index) {
  item.addEventListener('click', function () {
    item.classList.toggle('closed');
    lists[index].classList.toggle('closed');
  });
});

// Попап обратного звонка

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

// Кнопка "скролл вниз", скроллит к следующему разделу

function scroll(scrollTarget) {
  var scroller = setInterval(function () {
    if (scrollY < scrollTarget) {
      window.scrollBy(0, 20);
    } else {
      clearInterval(scroller);
    }
  }, 10);
}

var advantages = document.querySelector('.advantages').offsetTop;

var scrollButton = document.querySelector('.js-scroll');

scrollButton.addEventListener('click', function () {
  if (scrollY < advantages) {
    scroll(advantages);
  }
});

// Валидация полей

var inputsName = document.querySelectorAll('.js-input-name');
var inputsTel = document.querySelectorAll('.js-input-tel');
var textareas = document.querySelectorAll('.js-textarea');

var nameField = {
  inputs: inputsName,
  check: /[^A-zА-я'\s]/,
  string: 'Имя не должно содержать цифр и спецсимволов'
};

var telField = {
  inputs: inputsTel,
  check: /[^\d()\s-+_]/,
  string: 'Телефон должен содержать только цифры'
};

var textarea = {
  inputs: textareas,
  check: /[^A-zА-я'"0-9\s]/,
  string: 'Вопрос не должен содержать спецсимволов'
};

function checkInputs(inputsArr, regExp, errorString) {
  inputsArr.forEach(function (item) {
    item.addEventListener('input', function () {
      if (regExp.test(item.value)) {
        item.setCustomValidity(errorString);
      } else {
        item.setCustomValidity('');
      }
    });
  });
}

checkInputs(nameField.inputs, nameField.check, nameField.string);
checkInputs(telField.inputs, telField.check, telField.string);
checkInputs(textarea.inputs, textarea.check, textarea.string);

inputsTel.forEach(function (item) {
  var temp;
  var char;
  var backspace;

  item.addEventListener('focus', function () {
    item.value = item.value === '' ? '+7 (___) ___ __-__' : item.value;
    item.setSelectionRange(4, 4);
  });

  item.addEventListener('keydown', function (evt) {
    backspace = false;
    if (evt.code !== 'Backspace') {
      if (item.value.length >= 18 && !item.value.includes('_')) {
        evt.preventDefault();
      } else if (/\d/.test(evt.key)) {
        char = item.value.indexOf('_');
        item.setSelectionRange(char, char);
      } else {
        evt.preventDefault();
      }
    } else {
      backspace = true;
    }
  });

  item.addEventListener('input', function () {
    if (!backspace) {
      item.value.replace(/\d_/, function (match) {
        temp = match.charAt(0);
      });

      item.setRangeText(temp, char, char + 2);
      item.setSelectionRange(char + 1, char + 1);
    }
  });
});
