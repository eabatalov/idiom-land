(function($) {
  
    var App = {
 
    /**
    * Init Function
    */
    init: function() {
        App.Carousel();
        App.Lightbox();
    },
    /**
    * Carousel
    */
    Carousel: function() {
        $('#owl-gallery').owlCarousel({
            items : 4,
            itemsDesktop : [1199,4],
            itemsDesktopSmall : [980,4],
            itemsTablet: [768,4],
            itemsTabletSmall: [550,2],
            itemsMobile : [480,2],
        });
    },

    /**
    * Nivo Lightbox
    */
    Lightbox: function() {
        $('#owl-gallery a').nivoLightbox({
            effect: 'fade',                 // The effect to use when showing the lightbox
            keyboardNav: true,              // Enable/Disable keyboard navigation (left/right/escape)
        });
        $('#home-image a').nivoLightbox({
            effect: 'fade',                 // The effect to use when showing the lightbox
            keyboardNav: true,              // Enable/Disable keyboard navigation (left/right/escape)
        });
        $('#iphone-image a').nivoLightbox({
            effect: 'fade',                 // The effect to use when showing the lightbox
            keyboardNav: true,              // Enable/Disable keyboard navigation (left/right/escape)
        });
    }

    }

$(function() {
    App.init();

    //Scrollers
    $('.scrollto, .gototop').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    //Forms
    /*$('.subscribe-form').each(function (formIx, form) {
        var jqForm = $(form);
        var jqFormSuccess = $($(".subscribe-form-success").get(formIx))
        jqForm.ajaxForm({
            success: function () {
                jqForm.slideUp('slow');
                jqFormSuccess.text("Thank you!");
                jqFormSuccess.css({"opacity": "1"});
            },
            error: function () {
                jqForm.slideUp('slow');
                jqFormSuccess.text("Sorry. Error occurred.");
                jqFormSuccess.css({"opacity": "1"});
            }
        });
    });*/
    $('#contact-us-form').ajaxForm({
        success: function () {
            $('#contact-us-container').slideUp('slow');
            $("#contact-preview").text("Thank you!");
            $('#contact-preview').css({"opacity": "1"});
        },
        error: function () {
            $('#contact-us-container').slideUp('slow');
            $("#contact-preview").text("Sorry. Error occurred.");
            $('#contact-preview').css({"opacity": "1"});
        },
        //simple "c-p-t-ch-a"
        data : {
            "cpt" : "G6UexKe6XL"
        }
    });
    /**
    * Preloader
    */
    var websiteIsShown = false;
    var preloaderImages = $('.show-preloader');

    if (preloaderImages.length) {
        var preloaderImagesLoaded = 0;
        preloaderImages.each(function(imgIx, img) {
            var jqImg = $(img);
            jqImg.imagesLoaded(function() {
                ++preloaderImagesLoaded;
                if (preloaderImagesLoaded === preloaderImages.length) {
                    showWebsite();
                }
            });
        });
        /* 7 seconds fallback if some of the
         * images couldn't be loaded */
        setTimeout(showWebsite, 7000);
    } else {
        showWebsite();
    }

    function showWebsite() {
        if (websiteIsShown)
            return;

        websiteIsShown = true;
        $('#status').delay(100).fadeOut('slow');
        $('#preloader').delay(500).fadeOut('slow');
        $('body').delay(500).css({'overflow':'visible'});
        setTimeout(function(){$('#logo').addClass('animated fadeInDown')},500);
        setTimeout(function(){$('#logo_header').addClass('animated fadeInDown')},600);
        setTimeout(function(){$('#slogan').addClass('animated fadeInDown')},700);
        setTimeout(function(){$('#home_image').addClass('animated fadeInUp')},900);
    }
});

})(jQuery);
