$(document).ready(function() {
	$('#testimonial-slider').owlCarousel({
		items: 2,
		center: true,
		itemsDesktop: [ 1000, 2 ],
		itemsDesktopSmall: [ 990, 2 ],
		itemsTablet: [ 768, 1 ],
		pagination: true,
		navigation: false,
		navigationText: [ '', '' ],
		slideSpeed: 1000,
		autoplayTimeout: 3000,
		autoPlay: true,
		dots: false,
		nav: false
	});
});
