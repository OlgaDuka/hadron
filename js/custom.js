'use strict';
(function () {
  // ----------------------------------------------
  // Меню
  // ----------------------------------------------
  var header = document.querySelector('.header');
  var toggle = header.querySelector('.header__toggle');
  var menu = header.querySelector('.menu');
  // Закрываем меню, если JS работает
  menu.classList.remove('menu--nojs');
  menu.classList.add('menu--close');
  toggle.classList.remove('header__toggle--collapse');
  // Переключаем состояние меню по кнопке
  toggle.addEventListener('click', function () {
    menu.classList.toggle('menu--close');
    toggle.classList.toggle('header__toggle--collapse');
  });

})();
