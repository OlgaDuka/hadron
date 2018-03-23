'use strict';
$(function () {
  // ----------------------------------------------
  // Меню
  // ----------------------------------------------
/*  var header = document.querySelector('.header');
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
  });*/

    // ---------------------------------------
    // Меню (Стандартные функции JQuery)
    // -----------------------------------------
    var tabletWidth = 768;
    $('.menu').removeClass('menu--nojs');
    if ($(window).width() < tabletWidth) {
      $('.header__toggle').removeClass('header__toggle--cross');
      $('.menu').addClass('menu--close');
      $('.menu').slideUp('slow');
    }
    $('.header__toggle').click(function () {
      $('.menu').slideToggle('slow');
      $('.header__toggle').toggleClass('header__toggle--cross');
    });

    // Перезагрузка страницы, если изменение идет между мобильной и десктопной версиями
    var oldWidth = $(window).width();
    $(window).resize(function () {
      var newWith = $(window).width();
      if ((oldWidth < tabletWidth) && (newWith >= tabletWidth)) {
        location.reload();
        $('.menu').removeClass('menu--nojs');
        $('.menu').removeClass('menu--close');
        return;
      } else if ((oldWidth >= tabletWidth) && (newWith < tabletWidth)) {
        location.reload();
      }
    });
});
