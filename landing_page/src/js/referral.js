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
        function onSubmitBtnClick(jqForm, jqButton, event) {
            jqForm.ajaxSubmit();

            setTimeout(function() {
                var alertContainer =
                    jQuery("[data-untorch-element=\"alert\"]");
                    alertContainer.slideUp(500);
            }, 4000);
        }

        $('.subscribe-form').each(function(formIx, form) {
            var jqForm = $(form);
            jqForm.find("button").each(function(btnIx, button) {
                var jqButton = $(button);
                jqButton.click(
                    onSubmitBtnClick.bind(null, jqForm, jqButton)
                );
            });
        });
    }
});
