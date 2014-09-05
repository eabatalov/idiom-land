function PlatformerLevelGameplayRecorder(levelGameplayHistory) {
    LevelGameplayRecorder.call(this, levelGameplayHistory);
}

PlatformerLevelGameplayRecorder.prototype = new LevelGameplayRecorder(null);
