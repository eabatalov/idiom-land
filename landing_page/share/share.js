function init() {
    /* When you change supported services list fix this list too */
    socialSharing.shareButtonToService = {
        ".share-button-facebook" : "facebook",
        ".share-button-twitter" : "twitter",
        ".share-button-gplus" : "googleplus",
        ".share-button-vkontakte" : "vk"
    };
    socialSharing.serviceToShareButton = {};
    socialSharing.services =
        jQuery.map(socialSharing.shareButtonToService, function(value) { return value; });
    jQuery.each(socialSharing.shareButtonToService, function(shareBtnClass, service) {
        socialSharing.serviceToShareButton[service] = shareBtnClass;
    });
    /* Setting up content user shares here */
    socialSharing.dataToShare.url = "http://idiomland.com";
    socialSharing.dataToShare.title = "Idiom Land";
    socialSharing.dataToShare.description =
        "Step into the world of adventure in English";
    socialSharing.dataToShare.pubid = "ra-537a67027f7a7a93";
    socialSharing.dataToShare.ct = "1";
}

function showShareButtons() {
    jQuery(".share-button-container").css("display", "block").show();
    jQuery(".button-total").hide();
    jQuery(".share-button").show(400);
}

function initUI() {
    var buttonTotal = jQuery(".button-total").click(showShareButtons);
    /* Needed in order to make show() animation visible */
    jQuery(".share-button").hide();
    /* Create links to share  */
    jQuery.each(socialSharing.services, function(ix, service) {
        var shareURL = "http://api.addthis.com/oexchange/0.8/forward/"
            + service + "/offer?"
            + "url=" + socialSharing.dataToShare.url + "&"
            + "title=" + socialSharing.dataToShare.title + "&"
            + "description=" + socialSharing.dataToShare.description + "&"
            + "pubid=" + socialSharing.dataToShare.pubid + "&"
            + "ct=" + socialSharing.dataToShare.ct;
        var button = jQuery(socialSharing.serviceToShareButton[service]);
        button.find("a").attr('href', shareURL);
    });
}

function shareCountToInt(count) {
    var result = parseInt(count);
    if (isNaN(result))
        result = 0;
    return result;
}

function downloadCounters() {
    socialSharing.totalCounter.reset();
    jQuery.each(socialSharing.services, function(ix, service) {
        addthis.sharecounters.getShareCounts({
                service : service,
                countUrl : socialSharing.dataToShare.url
            },
            function(counter) {
                var counterButtonClassSelector =
                    socialSharing.serviceToShareButton[service] + " .counter";
                var counterElem = jQuery(counterButtonClassSelector);
                if (counter.error) {
                    counterElem.hide();
                    return;
                }
                counterElem.show();
                var count = shareCountToInt(counter.count);
                jQuery(counterButtonClassSelector).text(count);
                socialSharing.totalCounter.add(service, count);
            }
        );
    });
}

jQuery(function() {
    init();
    initUI();
    addthis.addEventListener('addthis.ready', downloadCounters);
});

socialSharing = {
    dataToShare : {
        url : null,
        title : null,
        description : null,
        pubid : null,
        ct : null
    },
    shareButtonToService : null,
    serviceToShareButton : null,
    services : null,
    totalCounter : {
        value : 0,
        reset : function() {
            this.value = 0;
        },
        add : function(service, count) {
            this.value += count;
            jQuery(".button-total > .counter").text(this.value);
        }
    }
}
