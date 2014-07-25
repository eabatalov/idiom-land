function LevelIdiomsProgressTracker() {
    this.events = {
        idiomGuessed : new SEEvent(/*Idiom*/),
    };

    this.currentLevel = null;
    this.idiomStatusChangeSubscriptions = [];
    this.isProgressFinalized = false;

    IdiomLandGame.instance.events.levelChanged.
        subscribe(this, this.onCurrentLevelChanged);
}

LevelIdiomsProgressTracker.prototype.onCurrentLevelChanged = function(questLevelRuntime) {
    var level = questLevelRuntime.getLevel();
    jQuery.each(this.idiomStatusChangeSubscriptions, function(ix, subs) {
        subs.delete();
    });
    this.idiomStatusChangeSubscriptions = [];

    this.currentLevel = level;
    this.isProgressFinalized = false;

    this.currentLevel.forEachIdiom(function(idiomId, idiom) {
        idiom.events.statusChanged.subscribe(this, this.onCurrentLevelIdiomStatusChanged);
    }.bind(this));
};

LevelIdiomsProgressTracker.prototype.onCurrentLevelIdiomStatusChanged = function(idiom) {
   if (idiom.getStatus() === Idiom.STATUS.GUESSED) {
        this.events.idiomGuessed.publish(idiom);
   } 
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

LevelIdiomsProgressTracker.prototype.getAllIdiomsCount = function() {
    return this.getIdiomsWithStatusCount(Idiom.STATUS.GUESSED) +
        this.getIdiomsWithStatusCount(Idiom.STATUS.IGNORED) +
        this.getIdiomsWithStatusCount(Idiom.STATUS.FAILED);
};

LevelIdiomsProgressTracker.prototype.getGuessedIdiomsCount = function() {
    return this.getIdiomsWithStatusCount(Idiom.STATUS.GUESSED);
};

LevelIdiomsProgressTracker.prototype.getFoundIdiomsCount = function() {
    return this.getGuessedIdiomsCount() +
        this.getIdiomsWithStatusCount(Idiom.STATUS.FAILED);
};

LevelIdiomsProgressTracker.prototype.finalizeProgress = function() {
    if (this.isProgressFinalized)
        return;

    this.currentLevel.finalizeProgress();

    this.isProgressFinalized = true;
};

LevelIdiomsProgressTracker.prototype.isLevelSucceeded = function() {
    return isIdiomLandLevelSucceeded(this.currentLevel);
};

LevelIdiomsProgressTracker.prototype.getLevelName = function() {
    return this.currentLevel.getName();
};

LevelIdiomsProgressTracker.prototype.getNextLevelName = function() {
    var nextLevel = IdiomLandGame.instance.
            getLevelsProgressManager().getNextLevel(this.currentLevel);

    return nextLevel ? nextLevel.getName() : "";
};
