$('.planetMenuIcon').on('click', function () {
    if ($('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').css('display') === 'none') {
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').show();
        $('.carouselSliderItems').hide();
    } else {
        $('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $('.carouselSliderItems').show();
    }
});
// $('#btnPlanet1').on('click', function () {
//     if ($('.carouselSliderItems').css('display') === 'none') {
//         $('.carouselSliderItems').show();
//         $('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
//         $("#L0img").attr('src', "../assets/img/hoc/planet/completed.png");
//         $("#L1img").attr('src', "../assets/img/hoc/planet/start.png");
//     }
// });
$('.planet2').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L0img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L2img").attr('src', "../assets/img/hoc/planet/start.png");
    }
});
$('.planet3').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet2,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L2img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L3img").attr('src', "../assets/img/hoc/planet/start.png");
    }
});
$('.planet4').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L3img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L4img").attr('src', "../assets/img/hoc/planet/start.png");
    }
});
$('.planet5').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet2,.planet3,.planet4,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L4img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L5img").attr('src', "../assets/img/hoc/planet/start.png");
    }
});
$('.planet6').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet2,.planet3,.planet5,.planet4,.planet7,.planet8,.planet9').hide();
        $("#L5img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L6img").attr('src', "../assets/img/hoc/planet/start.png");
    }
});
$('.planet7').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet4,.planet8,.planet9').hide();
        $("#L6img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L7img").attr('src', "../assets/img/hoc/planet/start.png");
    }
});
$('.planet8').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet4,.planet9').hide();
        $("#L7img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L8img").attr('src', "../assets/img/hoc/planet/start.png");
    }
});
$('.planet9').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet8,.planet4').hide();
        $("#L8img").attr('src', "../assets/img/hoc/planet/completed.png");
    }
});
var $finish = $("#btnFinishL1, #btnFinishL2, #btnFinishL3, #btnFinishL4, #btnFinishL5, #btnFinishL6, #btnFinishL7, #btnFinishL8");
$($finish).on('click', function () {
    if ($('.carouselSliderItems').css('display') != 'none') {
        $('.carouselSliderItems').hide();
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').addClass('fadeIn').show();
    }
});
$('#btnFinishL9').on('click', function () {
    if ($('.carouselSliderItems').css('display') != 'none') {
        $('.carouselSliderItems').hide();
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').addClass('fadeIn').show();
    }
});