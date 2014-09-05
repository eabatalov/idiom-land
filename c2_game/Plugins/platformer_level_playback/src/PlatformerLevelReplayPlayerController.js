function PlatformerLevelReplayPlayerController(platformerLevelReplayPlayer, replayLoader) {
    LevelReplayPlayerController.call(this, platformerLevelReplayPlayer, replayLoader);
}

PlatformerLevelReplayPlayerController.prototype = new LevelReplayPlayerController(null, null);
