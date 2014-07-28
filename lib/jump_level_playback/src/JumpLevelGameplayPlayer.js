function JumpLevelGameplayPlayer() {
    LevelGameplayPlayer.call(this);

    this.events = {
        recReady : new SEEvent(/*LevelGameplayHistoryRecord*/)
    };
}

JumpLevelGameplayPlayer.prototype = new LevelGameplayPlayer();

JumpLevelGameplayPlayer.prototype._playRecord = function(gamePlayRecord) {
    switch(gamePlayRecord.getRecordType()) {
        case JumperIdiomToGuessChangedRecord.type:
        case JumperGenPlatformRecord.type:
        case JumperGenIdiomTokenRecord.type:
        case JumperCollectedIdiomSubstringChangedRecord.type:
            this.events.recReady.publish(gamePlayRecord);
        break;
    }
};
