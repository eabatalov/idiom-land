jQuery(window).load(function() {
    var alertContainer = $(
        '<div class="referral-alert shake animated" '
        + 'data-untorch-element="alert">'
        + '</div>')
    jQuery(document.body).append(alertContainer);

    makeSubmitEmailsToOurServerHook();

    nonBlockingScriptByURL('http://untorch.com/js/untorch.min.js',
        { "data-untorch-campaign" : "924" }
    );

    
    function makeSubmitEmailsToOurServerHook() {
        $('.subscribe-form').each(function(formIx, form) {
            var jqForm = $(form);
            jqForm.find("button").each(function(btnIx, button) {
                var jqButton = $(button);
                jqButton.click(function(event) {
                    jqForm.ajaxSubmit();
                });
            });
        });
    }
});
