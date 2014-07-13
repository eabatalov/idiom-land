function isIdiomLandLevelSucceeded(level) {
    var result = true;
    level.forEachIdiom(function(idiomId, idiom) {
        if (idiom.getStatus() !== Idiom.STATUS.GUESSED) {
            result = false;
            return false;
        }
    });
    return result;
}
