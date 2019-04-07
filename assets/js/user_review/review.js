/* close navbar-collapse when a  clicked */
$('.dropdown').on('click', function() {
	$(this).toggleClass('show');
});
$('#client-caro').owlCarousel({
	navigation: false,
	pagination: true,
	slideSpeed: 5000,
	paginationSpeed: 5000,
	smartSpeed: 1500,
	autoplay: true,
	singleItem: true,
	loop: true,
	responsive: {
		0: {
			items: 1
		},
		680: {
			items: 1
		},
		1000: {
			items: 2
		}
	}
});
$('#c-caro').owlCarousel({
	navigation: true,
	pagination: false,
	slideSpeed: 5000,
	nav: true,
	paginationSpeed: 5000,
	smartSpeed: 1400,
	autoplay: true,
	singleItem: true,
	navText: [ "<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>" ],
	loop: true,
	responsive: {
		0: {
			items: 1
		},
		680: {
			items: 1
		},
		1000: {
			items: 2
		}
	}
});
$('.client-caro').owlCarousel({
	autoplay: true,
	loop: true,
	margin: 25,
	dots: false,
	slideTransition: 'linear',
	autoplayTimeout: 5000,
	autoplayHoverPause: true,
	autoplaySpeed: 5000,
	responsive: {
		0: {
			items: 2
		},
		500: {
			items: 3
		},
		600: {
			items: 3
		},
		800: {
			items: 4
		},
		1200: {
			items: 5
		}
	}
});
