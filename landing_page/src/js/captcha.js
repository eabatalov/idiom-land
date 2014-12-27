var CONTACT_US_SUBMIT_ENABLED_CLASSES = ['sm', 'cta2'];
var CONTACT_US_SUBMIT_DISABLED_CLASSES = ['cta3'];
var CONTACT_US_SUBMIT_ID = '#contact-us-submit';

function onReCaptchaLoaded() {
    function onReCaptchaSuccess(g_recaptcha_response) {
        var contactUSSubmit = jQuery(CONTACT_US_SUBMIT_ID);
        contactUSSubmit.prop('disabled', false);
        contactUSSubmit.removeClass();
        jQuery.each(CONTACT_US_SUBMIT_ENABLED_CLASSES,
            function(ix, classStr) {
                contactUSSubmit.addClass(classStr); 
            }
        );
    }

    grecaptcha.render('contact-us-captcha', {
        'sitekey' : '6Ld8if8SAAAAAH5hrCgoyhXnUQ9HSDu3o1iTqDYj',
        'callback' : onReCaptchaSuccess,
        'theme' : 'light'
    });
}

jQuery(window).load(function() {
    var contactUSSubmit = jQuery(CONTACT_US_SUBMIT_ID);
    contactUSSubmit.prop('disabled', true);
    contactUSSubmit.removeClass();
    jQuery.each(CONTACT_US_SUBMIT_DISABLED_CLASSES,
        function(ix, classStr) {
           contactUSSubmit.addClass(classStr); 
        }
    );   

    nonBlockingScriptByURL(
        'https://www.google.com/recaptcha/api.js?'
        + 'onload=onReCaptchaLoaded&render=explicit'
    );
});
