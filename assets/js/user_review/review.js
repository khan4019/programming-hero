
    /* close navbar-collapse when a  clicked */
    $('.dropdown').on('click', function () {
        $(this).toggleClass("show");
    });
    $("#client-caro").owlCarousel({
      navigation: false,
      pagination: true,
      slideSpeed: 800,
      paginationSpeed: 800,
      smartSpeed: 500,
      autoplay: true,
      singleItem: true,
      loop: true,
      responsive:{
        0:{
          items:1
        },
        680:{
          items:1
        },
        1000:{
          items:2
        }
      }
    });
  $("#c-caro").owlCarousel({
      navigation:  true,
      pagination:false,
      slideSpeed: 800,
      nav:true,
      paginationSpeed: 800,
      smartSpeed: 500,
      autoplay: true,
      singleItem: true,
      navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
      loop: true,
      responsive:{
        0:{
          items:1
        },
        680:{
          items:1
        },
        1000:{
          items:2
        }
      }
    });
    $(".client-caro").owlCarousel({
            autoplay: true,
        loop: true,
        margin:25,
        dots:false,
        slideTransition:'linear',
        autoplayTimeout:4500,
        autoplayHoverPause:true,
        autoplaySpeed:4500,
        responsive:{
            0:{
                items:2
            },
            500: {
                items:3
            },
            600:{
                items:3
            },
            800:{
                items:4
            },
            1200:{
                items:5
            }
      }
    });

