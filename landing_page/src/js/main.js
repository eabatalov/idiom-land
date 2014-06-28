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
            items : 5,
            itemsDesktop : [1199,5],
            itemsDesktopSmall : [980,5],
            itemsTablet: [768,5],
            itemsTabletSmall: [550,2],
            itemsMobile : [480,2],
        });
    },

    /**
    * Nivo Lightbox
    */
    Lightbox: function() {
        $('#owl-gallery a').nivoLightbox({
            effect: 'fall',                             // The effect to use when showing the lightbox
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
    $('.subscribe-form').each(function (formIx, form) {
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
    });
    $('#contact-us').ajaxForm({
        success: function () {
            $('#contact-us').slideUp('slow');
            $("#contact-preview").text("Thank you!");
            $('#contact-preview').css({"opacity": "1"});
        },
        error: function () {
            $('#contact-us').slideUp('slow');
            $("#contact-preview").text("Sorry. Error occurred.");
            $('#contact-preview').css({"opacity": "1"});
        }
    });
    /**
    * Preloader
    */
    var preloaderImages = $('.show-preloader');
    var preloaderImagesLoaded = 0;
    preloaderImages.each(function(imgIx, img) {
        var jqImg = $(img);
        jqImg.imagesLoaded(function() {
            ++preloaderImagesLoaded;
            if (preloaderImagesLoaded === preloaderImages.length) {
                $('#status').delay(100).fadeOut('slow');
                $('#preloader').delay(500).fadeOut('slow');
                $('body').delay(500).css({'overflow':'visible'});
                setTimeout(function(){$('#logo').addClass('animated fadeInDown')},500);
                setTimeout(function(){$('#logo_header').addClass('animated fadeInDown')},600);
                setTimeout(function(){$('#slogan').addClass('animated fadeInDown')},700);
                setTimeout(function(){$('#home_image').addClass('animated fadeInUp')},900);
            }
        });
    });
});


})(jQuery);
