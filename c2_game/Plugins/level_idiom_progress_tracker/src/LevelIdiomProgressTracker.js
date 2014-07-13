function LevelIdiomsProgressTracker() {
    this.events = {
        idiomGuessed : new SEEvent(),
        //TODO maybe?
        idiomsChanged : new SEEvent()
    };

    this.currentLevel = null;

    IdiomLandGame.instance.events.levelChanged.
        subscribe(this, this.onCurrentLevelChanged);
}

LevelIdiomsProgressTracker.prototype.onCurrentLevelChanged = function(level) {
    this.currentLevel = level;
};

LevelIdiomsProgressTracker.prototype.forEachIdiom = function(callback/*(idiomId, idiom)*/) {
    this.currentLevel.forEachIdiom(callback);
};

LevelIdiomsProgressTracker.prototype.getIdiomsWithStatusCount = function(status) {
    var count = 0;
    this.currentLevel.forEachIdiom(function(idiomId, idiom) {
        if (idiom.getStatus() === status)
            ++count;
    });
    return count;
};

LevelIdiomsProgressTracker.prototype.getGuessedIdiomsCount = function() {
    return this.getIdiomsWithStatusCount(Idiom.STATUS.GUESSED);
};

LevelIdiomsProgressTracker.prototype.getFoundIdiomsCount = function() {
    return this.getGuessedIdiomsCount() +
        this.getIdiomsWithStatusCount(Idiom.STATUS.FAILED);
};
