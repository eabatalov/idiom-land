function IdiomLandLevelsProgressManager(levelNamesOrdered, levelRepo, isFirstGameRun) {
    this.levelNamesOrdered = levelNamesOrdered;
    this.levelRepo = levelRepo;

    this.levelRepo.forEachLevel(function(levelName, level) {
        level.events.finalizeProgress.subscribe(this, this.onFinalizeLevelProgress);
    }.bind(this));
    if (isFirstGameRun)
        this.initLevelsOnFirstGameRun();
}

IdiomLandLevelsProgressManager.prototype.initLevelsOnFirstGameRun = function() {
    this.levelRepo.forEachLevel(function(levelName, level) {
        if (levelName === this.levelNamesOrdered[0]) {
            //UNLOCK the first level
            level.setStatus(IdiomLandLevel.STATUS.UNLOCKED);
            return;
        }
        //LOCK all other levels
        level.setStatus(IdiomLandLevel.STATUS.LOCKED);
    }.bind(this));
};

IdiomLandLevelsProgressManager.prototype.onFinalizeLevelProgress = function(level) {
    var nextLevel = this.getNextLevel(level);    
    if (!nextLevel)
        return; //ignore the last level

    if (nextLevel.getStatus() === IdiomLandLevel.STATUS.LOCKED
        && isIdiomLandLevelSucceeded(level)) {
        nextLevel.setStatus(IdiomLandLevel.STATUS.UNLOCKED);
    }
};

IdiomLandLevelsProgressManager.prototype.forEachOrderedUnlockedLevel =
    function(callback/*(level)*/) {
    jQuery.each(this.levelNamesOrdered, function(levelIx, levelName) {
        var level = this.levelRepo.getLevelByName(levelName);
        if (level.getStatus() !== IdiomLandLevel.STATUS.UNLOCKED)
            return;

        callback(level);
    }.bind(this));
};

IdiomLandLevelsProgressManager.prototype.getNextLevel = function(level) {
    var nextLevel = null;
    jQuery.each(this.levelNamesOrdered, function(levelIx, levelName) {
        if (levelIx === this.levelNamesOrdered.length - 1)
            return false;

        if (levelName !== level.getName())
            return;
        var nextLevelName = this.levelNamesOrdered[levelIx + 1];
        nextLevel = this.levelRepo.getLevelByName(nextLevelName);
        return false;
    }.bind(this));
    return nextLevel;
};
