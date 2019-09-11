(function($) {
"use strict";

/*------------------------------------------------------------------
[Table of contents]

/*-------------------------------------------
menu  activation
--------------------------------------------- */
$('.humbargar').on('click', function () {
	$('.humbargar').addClass('remove');
	$('.close-area').addClass('active');
	$('.sidebar-menu').addClass('highlight');	
		
});
$('.close-area').on('click', function () {
	$('.humbargar').removeClass('remove');
	$('.humbargar').addClass('active');	
	$('.close-area').addClass('remove');
	$('.sidebar-menu').removeClass('highlight');	
		
});
$('.humbargar').on('click', function () {
	$('.humbargar').addClass('remove');
	$('.close-area').addClass('active');
	$('.close-area').removeClass('remove');	
});
$('.sub-menu a span ').on('click', function () {
	$(".sub-menu .sub-menu-item").slideToggle();
	return false	
});

/*-------------------------------------------
  js wow
--------------------------------------------- */
 new WOW().init();
/*-------------------------------------------
  js scrollup
--------------------------------------------- */
$.scrollUp({
	scrollText: '<i class="fa fa-angle-up"></i>',
	easingType: 'linear',
	scrollSpeed: 900,
	animation: 'fade'
}); 
/*-------------------------------------------
    isotope activation 
--------------------------------------------- */
//=================
$('container').imagesLoaded(function () {
	// filter items on button click
	$('.filtering-button').on('click', 'a', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
    });
    $('.filtering-button').on('click', 'a', function () {
        $('.filtering-button a').removeClass('active');
        $(this).addClass('active');
    });
	var $grid = $('.grid').isotope({
		// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.grid-item',
		percentPosition: true,
		animationOptions: {
			duration: 500,
			easing: 'zoom-in'
		},
		masonry: {
			// use element for option
			columnWidth: '.grid-item'
		},
		transitionDuration: '.9s'
	})
});

/*-------------------------------------------
slide-thumbnile
--------------------------------------------- */
$(".slide-thumbnile").owlCarousel({
	autoPlay: true, 
	slideSpeed:2000,
	pagination:false,
	navigation:true,	  
	items : 1,
	navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
	itemsDesktop : [1199,1],
	itemsDesktopSmall : [980,1],
	itemsTablet: [768,1],
	itemsMobile : [479,1],
}); 
/*-------------------------------------------
related-slide-post
--------------------------------------------- */
$(".related-slide-post").owlCarousel({
	autoPlay: true, 
	slideSpeed:2000,
	pagination:false,
	navigation:true,	  
	items : 2,
	navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
	itemsDesktop : [1199,2],
	itemsDesktopSmall : [980,1],
	itemsTablet: [768,1],
	itemsMobile : [479,1],
}); 
/*-------------------------------------------
related-slidetwo-post
--------------------------------------------- */
$(".related-slidetwo-post").owlCarousel({
	autoPlay: true, 
	slideSpeed:2000,
	pagination:false,
	navigation:false,	  
	items : 2,
	navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
	itemsDesktop : [1199,2],
	itemsDesktopSmall : [980,1],
	itemsTablet: [768,1],
	itemsMobile : [479,1],
}); 
/*-------------------------------------------
Sticky Header
--------------------------------------------- */
$(window).on('scroll', function(){
    if( $(window).scrollTop()>80 ){
        $('#sticky').addClass('stick');
    } else {
        $('#sticky').removeClass('stick');
    }
});
/*-------------------------------------------
progress-bar
--------------------------------------------- */
$('#progress-bar').appear(function() {
	$('#bar1').barfiller({ barColor: '#6c62ff', duration: 3000 });
	$('#bar2').barfiller({ barColor: '#6c62ff', duration: 3000 });
	$('#bar3').barfiller({ barColor: '#6c62ff', duration: 2000 });
	$('#bar4').barfiller({ barColor: '#6c62ff', duration: 4000 });
	$('#bar5').barfiller({ barColor: '#6c62ff', duration: 4000 });
	
  });
 
/*-------------------------------------------
Counter up activation
--------------------------------------------- */
$('.counter').counterUp({
	delay: 10,
	time: 3000
});




})(jQuery);