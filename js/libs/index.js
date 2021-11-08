$(document).ready(function () {
  $("#banner-slider").owlCarousel({
    items: 1,
    itemsDesktop:[1000,1],
    itemsDesktopSmall:[979,1],
    itemsTablet:[768,1],
    pagination: false,
    navigation: false,
    // navigationText:["",""],
    slideSpeed: 1000,
    autoPlay: false,
  });

  $(".assignments").owlCarousel({
    items: 1,
    // itemsDesktop:[1000,1],
    // itemsDesktopSmall:[979,1],
    // itemsTablet:[768,1],
    pagination: false,
    navigation: false,
    // navigationText:["",""],
    slideSpeed: 1000,
    autoPlay: true,
  });
  // $(".assignments").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   fade: true,
  //   arrows: false,
  //   swipeToSlide: true,
  //   autoplay: true,
  // });
});
