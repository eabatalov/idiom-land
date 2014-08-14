function JumpLevelReplayPlayer() {
    LevelReplayPlayer.call(this);

    this.events = {
        recReady : new SEEvent(/*LevelGameplayHistoryRecord*/)
    };
}

JumpLevelReplayPlayer.prototype = new LevelReplayPlayer();

JumpLevelReplayPlayer.prototype._playRecord = function(gamePlayRecord) {
    switch(gamePlayRecord.getRecordType()) {
        case JumperIdiomToGuessChangedRecord.type:
        case JumperGenPlatformRecord.type:
        case JumperGenIdiomTokenRecord.type:
        case JumperCollectedIdiomSubstringChangedRecord.type:
            this.events.recReady.publish(gamePlayRecord);
        break;
    }
};
