function JumperLevelGameplayRecorder(levelGameplayHistory) {
    LevelGameplayRecorder.call(this, levelGameplayHistory);
}

JumperLevelGameplayRecorder.prototype = new LevelGameplayRecorder(null);
