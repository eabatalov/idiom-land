function share() {
    alert("share");
}

function showShareButtons() {
    jQuery(".share-button-container").css("display", "block").show();
    jQuery(".button-total").hide();
    jQuery(".share-button").show(400);
}

jQuery(function() {
    var buttonTotal = jQuery(".button-total").click(showShareButtons);
    jQuery(".share-button > .button").click(share);
    jQuery(".share-button").hide();
});
