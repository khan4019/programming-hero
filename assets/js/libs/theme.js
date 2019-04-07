(function($) {
	'use strict';

	//* Navbar Fixed
	function navbarFixed() {
		if ($('.main_header_area').length) {
			$(window).on('scroll', function() {
				var scroll = $(window).scrollTop();
				if (scroll >= 295) {
					$('.main_header_area').addClass('navbar_fixed');
				} else {
					$('.main_header_area').removeClass('navbar_fixed');
				}
			});

			// toggle_menu
			$('.menu-opener').on('click', function() {
				$('.toggle_menu').toggleClass('active');
			});
			$('section').on('click', function() {
				$('.toggle_menu').removeClass('active');
			});
		}
	}

	/*Function Calls*/
	new WOW().init();
	navbarFixed();
})(jQuery);
