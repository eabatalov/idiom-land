function JumpLevelReplayPlayerController(jumpLevelReplayPlayer, replayLoader) {
    LevelReplayPlayerController.call(this, jumpLevelReplayPlayer, replayLoader);
}

JumpLevelReplayPlayerController.prototype = new LevelReplayPlayerController(null, null);
