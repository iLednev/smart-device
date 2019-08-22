'use strict';

var buttons = document.querySelectorAll('.js-check-button');
var lists = document.querySelectorAll('.js-check-list');

buttons.forEach(function (item, index) {
  item.addEventListener('click', function () {
    item.classList.toggle('closed');
    lists[index].classList.toggle('closed');
  });
});
