function PlatformerLevelReplayPlayer() {
    LevelReplayPlayer.call(this);
}

PlatformerLevelReplayPlayer.prototype = new LevelReplayPlayer();

PlatformerLevelReplayPlayer.prototype._playRecord = function(gamePlayRecord) {
    switch(gamePlayRecord.getRecordType()) {
        case PlatformerCoinCollectedRecord.type:
            this.events.recReady.publish(gamePlayRecord);
        break;
    }
};
