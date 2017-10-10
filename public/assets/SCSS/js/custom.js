jQuery(document).ready(function(){
  'use strict';
//============================== PRE LOADER =============================================
  $(window).load(function() {
    $(".page-loader").fadeOut();
  });

//============================== SELECT BOX =========================
  $('.select-drop').selectbox();
  
//============================== HEADER =========================

  $('.navbar a.dropdown-toggle').on('click', function(e) {
      var elmnt = $(this).parent().parent();
      if (!elmnt.hasClass('nav')) {
          var li = $(this).parent();
          var heightParent = parseInt(elmnt.css('height').replace('px', '')) / 2;
          var widthParent = parseInt(elmnt.css('width').replace('px', '')) - 10;
          
          if(!li.hasClass('open')){
            li.addClass('open');
          } 
          else {
            li.removeClass('open');
            $(this).next().css('top', heightParent + 'px');
            $(this).next().css('left', widthParent + 'px');
          } 
          
          return false;
      }
  });

  //============================== ALL DROPDOWN ON HOVER =========================
    if($('.navbar').width() > 1007)
    {
      $('.nav .dropdown').hover(function() {
            $(this).addClass('open');
        },
        function() {
            $(this).removeClass('open');
        });
    }

//============================== SMOOTH SCROLLING TO SECTION =========================

  $('.scrolling  a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var target = $(this).attr('href');
    $(target).velocity('scroll', {
      duration: 800,
      offset: -150,
      easing: 'easeOutExpo',
      mobileHA: false
    });
  });

// scroll to a div with the ID "scrollToThis" by clicking a link with the class "scrollLink"
$('.scrolling').click( function() {
     $('html, body').animate({
          scrollTop: $('#categories').offset().top -50,
          scrollTop: $('#message').offset().top -50
     }, 600);
});

//============================== BOOTSTRA THUMBNAIL SLIDER =========================
  (function(){
    $('#thubmnailSlider').carousel({ interval: 3000 });
  }());

  (function(){
    $('.thumbnailCarousel .item').each(function(){
      var itemToClone = $(this);
      var i = 1;
      if ($(window).width() <= 767) {
        for (i=1;i<1;i++) {
          itemToClone = itemToClone.next();

          if (!itemToClone.length) {
            itemToClone = $(this).siblings(':first');
          }

          itemToClone.children(':first-child').clone()
          .addClass('cloneditem-'+(i))
          .appendTo($(this));
        }
      } else if ($(window).width() <= 991) {
        for (i=1;i<2;i++) {
          itemToClone = itemToClone.next();

          if (!itemToClone.length) {
            itemToClone = $(this).siblings(':first');
          }

          itemToClone.children(':first-child').clone()
          .addClass('cloneditem-'+(i))
          .appendTo($(this));
        }
      } else {
        for (i=1;i<3;i++) {
          itemToClone = itemToClone.next();

          if (!itemToClone.length) {
            itemToClone = $(this).siblings(':first');
          }

          itemToClone.children(':first-child').clone()
          .addClass('cloneditem-'+(i))
          .appendTo($(this));
        }
      }

    });
  }());

//============================== COUNTER-UP =========================
    $('.counter').counterUp({
      delay: 10,
      time: 2000
    });

//============================== DATE-PICKER =========================

  $('.datepicker').datepicker({
    startDate: 'dateToday',
    autoclose: true
  });

//============================== FILE UPLOADER =========================
$(document).on('click', '.browse', function(){
  var file = $(this).parent().parent().parent().find('.file');
  file.trigger('click');
});
//============================== DATA TABLE =========================


//============================== MAIN SLIDER ========================= 
 
  var $heroSlider = $( '.main-slider .inner' );
  if ( $heroSlider.length > 0 ) {
    $heroSlider.each( function () {

    var loop = $(this).parent().data('loop'),
        autoplay = $(this).parent().data('autoplay'),
        interval = $(this).parent().data('interval') || 3000;

      $(this).owlCarousel({
        items: 1,
        loop: loop,
        margin: 0,
        nav: true,
        dots: true,
        navText: [ ],
        autoplay: autoplay,
        autoplayTimeout: interval,
        autoplayHoverPause: true,
        smartSpeed:700,
        rtl:false
      });
    });
  } 

//============================== OWL-CAROUSEL =========================

var owl = $('.owl-carousel.partnersLogoSlider');
  owl.owlCarousel({
    loop:true,
    margin:28,
    autoplay:true,
    autoplayTimeout:6000,
    autoplayHoverPause:true,
    nav:true,
    dots: false,
    smartSpeed:500,
    rtl:false,
    responsive:{
      320:{
        slideBy: 1,
        items:1
      },
      768:{
        slideBy: 1,
        items:3
      },
      992:{
        slideBy: 1,
        items:4
      }
    }
  });


//============================== FANCY BOX =========================
    
    $('a.group').fancybox({
      'transitionIn'  : 'elastic',
      'transitionOut' : 'elastic',
      'speedIn'   : 600, 
      'speedOut'    : 200, 
      'overlayShow' : false
    });
    
  
//============================== CLOSE BUTTON =========================
  $('.close-btn').click(function () {
    $(this).parent().hide();
  });
});