function IdiomLandLevelGameplayRecordsCollector(levelRuntime) {
    LevelGameplayRecorder.call(this, levelRuntime.getLevelGameplayHistory());
    this._levelRuntime = levelRuntime;
    this._idiomStateChangeHandlers = [];

    this._levelRuntime.getLevel().forEachIdiom(this._subscribeIdiomState.bind(this));
}

IdiomLandLevelGameplayRecordsCollector.prototype = new LevelGameplayRecorder(null);

IdiomLandLevelGameplayRecordsCollector.prototype._subscribeIdiomState = function(idiomId, idiom) {
    this._idiomStateChangeHandlers.push(
        idiom.events.statusChanged.subscribe(this, this._onIdiomStatusChanged)
    );
};

IdiomLandLevelGameplayRecordsCollector.prototype._onIdiomStatusChanged = function(idiom) {
    if (idiom.getStatus() === Idiom.STATUS.GUESSED) {
        var record = new IdiomStateChangeRecord(
            idiom.getId(),
            IdiomStateChangeRecord.STATE.GUESSED
        );
        this.addRecord(record);
    } else if (idiom.getStatus() === Idiom.STATUS.FAILED) {
        var record = new IdiomStateChangeRecord(
            idiom.getId(),
            IdiomStateChangeRecord.STATE.FAILED
        );
        this.addRecord(record);
    }
};

IdiomLandLevelGameplayRecordsCollector.prototype.delete = function() {
    jQuery.each(this._idiomStateChangeHandlers, collectionObjectDelete);
    delete this._levelRuntime;
    delete this._idiomStateChangeHandlers;
};
