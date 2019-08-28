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
  check: /[^0-9()\s]/,
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
  item.addEventListener('focus', function () {
    if (!item.value) {
      item.value = '+7 ';
    }
  });

  item.addEventListener('keydown', function (evt) {
    if (evt.code !== 'Backspace') {
      if (item.value.length === 3) {
        evt.preventDefault();
        item.value += '(' + evt.key;
      } else if (item.value.length === 6) {
        evt.preventDefault();
        item.value += evt.key + ') ';
      } else if (item.value.length === 11) {
        evt.preventDefault();
        item.value += evt.key + ' ';
      } else if (item.value.length === 14) {
        evt.preventDefault();
        item.value += evt.key + '-';
      } else if (item.value.length === 18) {
        evt.preventDefault();
      }
    }
  });
});
