$('.planetMenuIcon').on('click', function () {
    if ($('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').css('display') === 'none') {
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').show();
        $('.carouselSliderItems').hide();
    } else {
        $('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').hide();
        $('.carouselSliderItems').show();
    }
});
$('#btnPlanet1').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L0img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L1img").attr('src', "../assets/img/hoc/planet/start.png");
        $('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet2').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L1img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L2img").attr('src', "../assets/img/hoc/planet/start.png");
        $('.planet1,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet3').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L2img").attr('src', "../assets/img/hoc/planet/completed.png");
        $('.planet1,.planet2,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet4').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L3img").attr('src', "../assets/img/hoc/planet/completed.png");
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet5').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L4img").attr('src', "../assets/img/hoc/planet/completed.png");
        $('.planet1,.planet2,.planet3,.planet4,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet6').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L5img").attr('src', "../assets/img/hoc/planet/completed.png");
        $('.planet1,.planet2,.planet3,.planet5,.planet4,.planet7,.planet8,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet7').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L6img").attr('src', "../assets/img/hoc/planet/completed.png");
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet4,.planet8,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet8').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L7img").attr('src', "../assets/img/hoc/planet/completed.png");
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet4,.planet9,#btnNextPrev').hide('slow');
    }
});
$('.planet9').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $("#L8img").attr('src', "../assets/img/hoc/planet/completed.png");
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet8,.planet4,#btnNextPrev').hide('slow');
    }
});
var $finish = $("#btnFinishL1, #btnFinishL2, #btnFinishL3, #btnFinishL4, #btnFinishL5, #btnFinishL6, #btnFinishL7, #btnFinishL8");
$($finish).on('click', function () {
    if ($('.carouselSliderItems').css('display') != 'none') {
        $('.carouselSliderItems').hide();
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').addClass('fadeIn').show();
    }
});
$('#btnFinishL9').on('click', function () {
    if ($('.carouselSliderItems').css('display') != 'none') {
        $('.carouselSliderItems').hide();
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9,#btnNextPrev').addClass('fadeIn').show();
    }
});