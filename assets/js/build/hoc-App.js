var mobileDevices = (/iphone|ipod|android|blackberry|mini|\sce|palm/i.test(navigator.userAgent.toLowerCase()));
$('.planetMenuIcon').on('click', function () {
    if ($('.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').css('display') === 'none') {
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').show();
        $('.carouselSliderItems').hide();
    } else {
        $('.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
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
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L0img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L2img").attr('src', "../assets/img/hoc/planet/start.png");
    }
    if (mobileDevices) {
        $('.planet2').hide();
    }
});
$('.planet3').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L2img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L3img").attr('src', "../assets/img/hoc/planet/start.png");
    }
    if (mobileDevices) {
        $('.planet3').hide();
    }
});
$('.planet4').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L3img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L4img").attr('src', "../assets/img/hoc/planet/start.png");
    }
    if (mobileDevices) {
        $('.planet4').hide();
    }
});
$('.planet5').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet3,.planet4,.planet6,.planet7,.planet8,.planet9').hide();
        $("#L4img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L5img").attr('src', "../assets/img/hoc/planet/start.png");
    }
    if (mobileDevices) {
        $('.planet5').hide();
    }
});
$('.planet6').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet3,.planet5,.planet4,.planet7,.planet8,.planet9').hide();
        $("#L5img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L6img").attr('src', "../assets/img/hoc/planet/start.png");
    }
    if (mobileDevices) {
        $('.planet6').hide();
    }
});
$('.planet7').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet4,.planet8,.planet9').hide();
        $("#L6img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L7img").attr('src', "../assets/img/hoc/planet/start.png");
    }
    if (mobileDevices) {
        $('.planet7').hide();
    }
});
$('.planet8').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet4,.planet9').hide();
        $("#L7img").attr('src', "../assets/img/hoc/planet/completed.png");
        $("#L8img").attr('src', "../assets/img/hoc/planet/start.png");
    }
    if (mobileDevices) {
        $('.planet8').hide();
    }
});
$('.planet9').on('click', function () {
    if ($('.carouselSliderItems').css('display') === 'none') {
        $('.carouselSliderItems').show();
        $('#planetDiv').addClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet3,.planet5,.planet6,.planet7,.planet8,.planet4').hide();
        $("#L8img").attr('src', "../assets/img/hoc/planet/completed.png");
    }
    if (mobileDevices) {
        $('.planet9').hide();
    }
});
var $finish = $("#btnFinishL1, #btnFinishL2, #btnFinishL3, #btnFinishL4, #btnFinishL5, #btnFinishL6, #btnFinishL7, #btnFinishL8");
$($finish).on('click', function () {
    if ($('.carouselSliderItems').css('display') != 'none') {
        $('.carouselSliderItems').hide();
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').show();
        $('#planetDiv').removeClass('col-md-4 col-sm-4');
    }
});
$('#btnFinishL9').on('click', function () {
    if ($('.carouselSliderItems').css('display') != 'none') {
        $('.carouselSliderItems').hide();
        $('#planetDiv').removeClass('col-md-4 col-sm-4');
        $('.planet1,.planet2,.planet3,.planet4,.planet5,.planet6,.planet7,.planet8,.planet9').addClass('fadeIn').show();
    }
});
$('.pull-right').on('click', function () {
    if ($('.ui-variable-logo').css('display') != 'none') {
        $('.ui-variable-logo').hide();
    } else {
        $('.ui-variable-logo').show();
    }
});