(function SocialSharing() {

function configure() {
    socialSharing.services = {
        "fb" : {
            name : "Facebook",
            code : "facebook",
            shareButtonClass : "share-button-facebook",
            getCounter : addThisApiGetDynCounter
        },
        "tw" : {
            name : "Twitter",
            code : "twitter",
            shareButtonClass : "share-button-twitter",
            getCounter : addThisApiGetDynCounter
        },
        "gp" : {
            name : "Google Plus",
            code : "google_plusone_share",
            shareButtonClass : "share-button-gplus",
            getCounter : gPlusGetCounterTweak
        },
        "vk" : {
            name : "Vkontakte",
            code : "vk",
            shareButtonClass : "share-button-vkontakte",
            getCounter : addThisApiGetDynCounter
        }
    };

    /* Setting up content user shares here */
    socialSharing.dataToShare.url = "http://idiomland.com/";
    socialSharing.dataToShare.title = "Idiom Land";
    socialSharing.dataToShare.description =
        "Step into the world of adventure in English";
    socialSharing.dataToShare.pubid = "ra-537a67027f7a7a93";
    socialSharing.dataToShare.ct = "0";
}

function showShareButtons() {
    jQuery(".share-buttons-container")
        .removeClass("share-buttons-container-inactive")
        .addClass("share-buttons-container-active");
    jQuery(".button-total").hide();
    jQuery(".share-button").show(400);
}

function init() {
    /* Create share button for each service */
    var shareButtonsContainer = jQuery(".share-buttons-container");
    //shareButtonsContainer.hide();
    jQuery.each(socialSharing.services, function(id, service) {

        var shareURL = "http://api.addthis.com/oexchange/0.8/forward/"
            + service.code + "/offer?"
            + "url=" + socialSharing.dataToShare.url + "&"
            + "title=" + socialSharing.dataToShare.title + "&"
            + "description=" + socialSharing.dataToShare.description + "&"
            + "pubid=" + socialSharing.dataToShare.pubid + "&"
            + "ct=" + socialSharing.dataToShare.ct;

        var serviceShareButtonHtml = ""
        + "<div class='share-button " + service.shareButtonClass + "'>"
            + "<a href='" + shareURL + "' rel='nofollow' target='_blank'><div class='button'></div></a>"
            + "<div class='counter'>&nbsp;</div>"
        + "</div>";
        shareButtonsContainer.append(serviceShareButtonHtml);

    });
    /* */
    var buttonTotal = jQuery(".button-total").click(showShareButtons);
    /* Needed in order to make show() animation visible */
    jQuery(".share-button").hide();
    /* Misc stuff */
    socialSharing.totalCounter.reset();
    /* */
    jQuery.each(socialSharing.services, function(id, service) {
        ++socialSharing.serviceCount;
    });
}

function counterReady(service, count) {
    var counterButtonClassSelector =
        "." + service.shareButtonClass + " .counter";
    var counterElem = jQuery(counterButtonClassSelector);
    counterElem.show();
    jQuery(counterButtonClassSelector).text(count);
    socialSharing.totalCounter.addCounter(count);
}

function counterError(service) {
    var counterButtonClassSelector =
        "." + service.shareButtonClass + " .counter";
    var counterElem = jQuery(counterButtonClassSelector);
    counterElem.hide();
    socialSharing.totalCounter.addCounter(0);
}

function shareCountToInt(count) {
    var result = parseInt(count);
    if (isNaN(result))
        result = 0;
    return result;
}

function addThisApiGetDynCounter(service) {
    addthis.sharecounters.getShareCounts({
            service : service.code,
            countUrl : socialSharing.dataToShare.url
        },
        function(counter) {
            if (counter.error) {
                counterError(service); 
                return;
            }
            var count = shareCountToInt(counter.count);
            counterReady(service, count);
        }
    );
}

function gPlusGetCounterTweak(service) {
    var apiUrl = "http://share.yandex.ru/gpp.xml?url=" +
        socialSharing.dataToShare.url;

    function cb(counterStr) {
        counterReady(service, shareCountToInt(counterStr));
    };
    window.services = { gplus : { cb : cb } };

    jQuery.getJSON(apiUrl + "&callback=?", null, null);
}

function downloadCounters() {
    jQuery.each(socialSharing.services, function(id, service) {
        service.getCounter(service);
    });
}

function TotalCounter() {
    this.value = 0;
    this.countersAdded = 0;
    this.reset  = function() {
        this.value = 0;
        this.countersAdded = 0;
        jQuery(".button-total .counter").fadeTo(0, 0);
        jQuery(".button-total .counter").text(this.value);
    };
    this.addCounter = function(count) {
        this.value += count;
        ++this.countersAdded;
        jQuery(".button-total .counter").text(this.value);
        if (this.countersAdded >= socialSharing.serviceCount) {
            jQuery(".button-total .counter").fadeTo(400, 1);
        }
    };
}

/* Config + social sharing global state */
socialSharing = {
    dataToShare : {
        url : null,
        title : null,
        description : null,
        pubid : null,
        ct : null
    },
    services : null,
    serviceCount : 0,
    totalCounter : new TotalCounter()
}

jQuery(document).ready(function() {
    window.addthis_config = {
        "data_track_addressbar": true,
        "data_track_clickback": true
    };

    configure();
    init();

    jQuery.getScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-537a67027f7a7a93',
        function() {
            addthis.addEventListener('addthis.ready', downloadCounters);
        }
    );
});

})();
