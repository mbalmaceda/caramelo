$(function () {


    //#region Initialize On Scroll Animations
    if (!Modernizr.touch && Modernizr.cssanimations) {
        $('[data-animation-delay]').each(function () {
            var animationDelay = $(this).data("animation-delay");
            $(this).css({
                "-webkit-animation-delay": animationDelay,
                "-moz-animation-delay": animationDelay,
                "-o-animation-delay": animationDelay,
                "-ms-animation-delay": animationDelay,
                "animation-delay": animationDelay
            });

        });
        $("[data-animation]").waypoint(function (direction) {
            if (direction == "down") {
                $(this).addClass("animated " + $(this).data("animation"));
            }
        }, { offset: '90%' }).waypoint(function (direction) {
            if (direction == "up") {
                $(this).removeClass("animated " + $(this).data("animation"));
            }
        }, {
            offset: $(window).height() + 1
        });
    }
    //#endregion Initialize On Scroll Animations



    //#region Navbar Link highlighter on scroll
    $("body>section[id]").waypoint(function (direction) {
        var $links = $('.site-navigation a[href="#' + this.id + '"]').parent("li");
        $links.toggleClass('active');
    }, {
        offset: 50
    }).waypoint(function (direction) {
        var $links = $('.site-navigation a[href="#' + this.id + '"]').parent("li");
        $links.toggleClass('active');
    }, {
        offset: function () {
            return -$(this).outerHeight() + 50;
        }
    });
    //#endregion Navbar Link highlighter on scroll



    //#region Scroll On Navbar-Link Click
    $(".site-navigation a[href^='#'],.next-screen").click(function (evt) {
        var scrollToElm = $($(this).attr("href"));
        if (scrollToElm.length) {
            evt.preventDefault();
            $("body,html").animate({ scrollTop: scrollToElm.offset().top }, 500);
        }
    });
    //#endregion Scroll On Navbar-Link Click



    //#region Navbar Show/Hide On Scroll
    var navScrollTarget = $("#services");
    var siteNav = $(".site-navigation");
    navScrollTarget.waypoint(function (direction) {
        if (direction == "down") {
            siteNav.addClass("nav-visible");
        }
    }).waypoint(function (direction) {
        if (direction == "up") {
            siteNav.removeClass("nav-visible");
        }
    });
    //#endregion Navbar Show/Hide On Scroll


    //#region Portfolio Sorting And Filtering
    $(".portfolio-container").mixitup({
        targetSelector: ".portfolio-item",
        filterSelector: ".portfolio-filtering a",
        onMixEnd: function () {
            $.waypoints('refresh');
        }
    });
    $(".portfolio-filtering a").on("click", function (evt) { evt.preventDefault(); });
    //#endregion Portfolio Sorting And Filtering




    //#region Show/hide Google Map
    $("a[href='#map-toggle']").click(function (evt) {
        evt.preventDefault();
        $(".map-holder").toggleClass("map-visible");
    });
    //#endregion Show/hide Google Map



    //#region Home Screen Sliders

    //Text Rotator In Homescreen
    var flexSlider = $('.flexslider').flexslider({
        animation: "slide",
        direction: "vertical",
        controlNav: false,
        directionNav: false,
        touch: false,
        keyboard: false,
        pauseOnAction: false,
        slideshow: false,
        animationSpeed: 1000

    }).data('flexslider');


    //Icon Slider In Homescreen
    var SliderOptions = {
        autoPlay: true,
        autoPlayDelay: 3000,
        pauseOnHover: false,
        animateStartingFrameIn: true,
        transitionThreshold: true,
        fadeFrameWhenSkipped: false,
        reverseAnimationsWhenNavigatingBackwards: false,
        nextButton: ".next-slide.home-screen-slider-nav",
        prevButton: ".prev-slide.home-screen-slider-nav",
        //pauseButton:".play-pause-home-screen-slider",
        preloader: true
    }

    //Slider Text On Icon Slide 
    var sequence = $(".home-screen-slider").sequence(SliderOptions).data("sequence");
    sequence.beforeNextFrameAnimatesIn = function () {
        flexSlider.flexAnimate(sequence.nextFrameID - 1);
    };

    //Prevent Scrolling On Slider Next/Prev Navigation
    $(SliderOptions.nextButton + "," + SliderOptions.prevButton).click(function (evt) {
        evt.preventDefault();
    });

    //#endregion Home Screen Sliders


});

$(window).load(function () {

    //#region Initilize Google Map
    if ($("#gmap").length) {

        var myLatlng = new google.maps.LatLng(-33.82629, 151.05678);//Defines Location
        var mapOptions = {
            zoom: 15,//Defines Zoom Level
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,  //Map Marker
            map: map,
            title: 'We Are Here'  //Marker Title
        });
    }
    //#endregion Initilize Google Map

});