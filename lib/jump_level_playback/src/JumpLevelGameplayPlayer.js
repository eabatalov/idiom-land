function JumpLevelGameplayPlayer() {
    LevelGameplayPlayer.call(this);

    this.events = {
        recReady : new SEEvent(/*LevelGameplayHistoryRecord*/)
    };
}

JumpLevelGameplayPlayer.prototype = new LevelGameplayPlayer();

JumpLevelGameplayPlayer.prototype._playRecord = function(gamePlayRecord) {
    switch(gamePlayRecord.getRecordType()) {
        case LevelGameplayRecord.TYPES.JUMPER_GEN_PLATFORM:
        case LevelGameplayRecord.TYPES.JUMPER_GEN_IDIOM_TOKEN:
        case LevelGameplayRecord.TYPES.JUMPER_IDIOM_TO_GUESS_CHANGE:
        case LevelGameplayRecord.TYPES.JUMPER_COLLECTED_IDIOM_SUBSTRING_CHANGE:
            this.events.recReady.publish(gamePlayRecord);
        break;
    }
};
