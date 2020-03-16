var $allPlanet = $('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9');
var $allListItem = $('.listitem1,.listitem2,.listitem3,.listitem4,.listitem5,.listitem6,.listitem7,.listitem8');
var $finish = $(
	'#btnFinishL1, #btnFinishL2, #btnFinishL3, #btnFinishL4, #btnFinishL5, #btnFinishL6, #btnFinishL7, #btnFinishL8, #btnFinishL9'
);
var mobileDevices = /iphone|ipod|android|blackberry|mini|\sce|palm/i.test(navigator.userAgent.toLowerCase());

if ($($allPlanet).css('display') != 'none' && mobileDevices) {
	$($allPlanet).hide();
	$('#planet-listview').show();
} else {
	$($allPlanet).show();
	$('#planet-listview').hide();
}
$($finish).on('click', function() {
	if ($('.carouselSliderItems').css('display') != 'none' && mobileDevices) {
		$('.carouselSliderItems').hide();
		$($allPlanet).hide();
		$('#planet-listview').show();
		$('.section-intro').css({
			opacity: '1'
		});
		$('#planetDiv').removeClass('col-md-4 col-sm-4');
	} else {
		$($allPlanet).show();
		$('.carouselSliderItems').hide();
		$('.section-intro').css({
			opacity: '1'
		});
		$('#planetDiv').removeClass('col-md-4 col-sm-4');
	}
});

$('.planet2,.listitem1').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L1img')).attr('src', '../assets/img/hoc/planet/completed.png');
		$(document.querySelectorAll('#L2img')).attr('src', '../assets/img/hoc/planet/start.png');
	}
});

$('.planet3,.listitem2').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L2img')).attr('src', '../assets/img/hoc/planet/completed.png');
		$(document.querySelectorAll('#L3img')).attr('src', '../assets/img/hoc/planet/start.png');
	}
});
$('.planet4,.listitem3').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L3img')).attr('src', '../assets/img/hoc/planet/completed.png');
		$(document.querySelectorAll('#L4img')).attr('src', '../assets/img/hoc/planet/start.png');
	}
});
$('.planet5,.listitem4').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L4img')).attr('src', '../assets/img/hoc/planet/completed.png');
		$(document.querySelectorAll('#L5img')).attr('src', '../assets/img/hoc/planet/start.png');
	}
});
$('.planet6,.listitem5').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L5img')).attr('src', '../assets/img/hoc/planet/completed.png');
		$(document.querySelectorAll('#L6img')).attr('src', '../assets/img/hoc/planet/start.png');
	}
});
$('.planet7,.listitem6').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L6img')).attr('src', '../assets/img/hoc/planet/completed.png');
		$(document.querySelectorAll('#L7img')).attr('src', '../assets/img/hoc/planet/start.png');
	}
});
$('.planet8,.listitem7').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L7img')).attr('src', '../assets/img/hoc/planet/completed.png');
		$(document.querySelectorAll('#L8img')).attr('src', '../assets/img/hoc/planet/start.png');
	}
});
$('.planet9,.listitem8').on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$(document.querySelectorAll('#L8img')).attr('src', '../assets/img/hoc/planet/completed.png');
	}
});

$($allListItem).on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$('.carouselSliderItems').show();
		$($allPlanet).hide();
		$('#planet-listview').hide();
	}
	if (mobileDevices) {
		$('.carouselSliderItems').show();
		$($allPlanet).hide();
		$('.section-intro')
			.css({
				opacity: '0'
			})
			.fadeIn('slow');
	}
});

$($allPlanet).on('click', function() {
	if ($('.carouselSliderItems').css('display') === 'none') {
		$('.carouselSliderItems').show();
		$('#planetDiv').addClass('col-md-4 col-sm-4');
		$($allPlanet).hide();
		$(this).show();
	}
	if (mobileDevices) {
		$('.carouselSliderItems').show();
		$($allPlanet).hide();
		$('.section-intro')
			.css({
				opacity: '0'
			})
			.fadeIn('slow');
	}
});
$('.pull-right').on('click', function() {
	if ($('.planetMenuIcon').css('display') != 'none' && mobileDevices) {
		$('.planetMenuIcon').hide();
	} else {
		$('.planetMenuIcon').show();
	}
});
$('.planetMenuIcon').on('click', function() {
	if ($($allPlanet).css('display') === 'none') {
		$($allPlanet).show();
		$('.carouselSliderItems').hide();
	} else {
		$('.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
		$('.carouselSliderItems').show();
		$('#planetDiv').addClass('col-md-4 col-sm-4');
	}
});
