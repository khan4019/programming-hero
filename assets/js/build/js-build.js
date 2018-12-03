(function ($, undefined) {
    "use strict";
    var doc = $(document),
        body = $("body"),
        win = $(window),
        breaks = {
            xs: 576,
            sm: 768,
            md: 992,
            lg: 1200
        };
    $.fn.ui_navbar = function () {
        var navbar = this;
        var toggle = $(".ui-mobile-nav-toggle");
        var navbar_nav = $(".ui-navigation");
        win.scroll(function () {
            var scroll_top = $(this).scrollTop();
            if (body.hasClass("ui-transparent-nav") && !body.hasClass("mobile-nav-active")) {
                if (scroll_top >= 24) {
                    navbar.removeClass("transparent");
                } else {
                    navbar.addClass("transparent");
                }
            }
        });
        toggle.html("<div><span></span><span></span><span></span><span></span></div>");
        var toggle_nav = function () {
            var win_top = win.scrollTop();
            if (!body.hasClass("mobile-nav-active")) {
                body.addClass("mobile-nav-active");
                toggle.addClass("active");
                navbar_nav.slideDown(250, function () {
                    navbar_nav.find("li").animate({
                        opacity: 1
                    }, 350);
                });
                if (body.hasClass("ui-transparent-nav")) {
                    navbar.removeClass("transparent");
                }
            } else {
                body.removeClass("mobile-nav-active");
                toggle.removeClass("active");
                navbar_nav.find("li").animate({
                    opacity: 0
                }, 100, function () {
                    navbar_nav.slideUp(200);
                });
                if (body.hasClass("ui-transparent-nav")) {
                    if (win_top < 24) {
                        navbar.addClass("transparent");
                    }
                }
            }
        };
        toggle.on("click", function (e) {
            e.preventDefault();
            toggle_nav();
        });
        win.resize(function () {
            var w = $(this).width();
            var win_top = win.scrollTop();
            if (w >= breaks.md) {
                navbar_nav.find("li").css({
                    opacity: 1
                });
                if (body.hasClass("mobile-nav-active")) {
                    body.removeClass("mobile-nav-active");
                    toggle.removeClass("active");
                    if (body.hasClass("ui-transparent-nav")) {
                        if (win_top < 24) {
                            navbar.addClass("transparent");
                        }
                    }
                }
                navbar_nav.show();
            } else {
                if (!body.hasClass("mobile-nav-active")) {
                    navbar_nav.hide();
                }
                navbar_nav.find("[data-scrollto]").on("click", function () {
                    navbar_nav.hide();
                });
            }
            if (w >= breaks.md) {
                navbar_nav.insertAfter(".navbar-brand");
            } else {
                navbar_nav.appendTo(navbar);
            }
            $(".ui-variable-logo").css({
                width: $(".ui-variable-logo img").width() + 32 + "px"
            });
        });
    };
    var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
    if(mobile) {
        $('.letstart').hide();
    }
    $('.pull-right').on('click', function () {
        if ($('.ui-variable-logo').css('display') != 'none') {
            $('.ui-variable-logo').hide(); 
        }else{
            $('.ui-variable-logo').show(); 
        }
    });

    $(".navbar").ui_navbar();
    if ($("[data-uhd]").length) {
        $("[data-uhd]").ui_uhd_images();
    }
    if ($("[data-scrollto]").length) {
        $("[data-scrollto]").ui_scroll_to();
    }
    if ($(".ui-app-showcase").length) {
        $(".ui-app-showcase").ui_app_showcase();
    }

    win.trigger("scroll");
    win.trigger("resize");
    doc.imagesLoaded(function () {
        win.trigger("resize");
        $('[data-fade_in="on-load"]').animate({
            opacity: 1
        }, 450);
    });

})(jQuery);