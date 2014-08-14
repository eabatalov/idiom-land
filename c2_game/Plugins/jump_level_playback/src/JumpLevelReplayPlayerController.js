function JumpLevelReplayPlayerController(jumpLevelReplayPlayer, replayLoader) {
    this.pendingRecords = [];
    this.handlers = [];

    this.replayLoader = replayLoader;
    this.levelReplayPlayer = jumpLevelReplayPlayer;

    this.handlers.push(this.replayLoader.events.
        replayLoaded.subscribe(this, this._onLevelReplayLoaded));
    this.handlers.push(
        this.levelReplayPlayer.events.
            recReady.subscribe(this, this._onRecReady));

    this.events = {
        recPending : new SEEvent(/*LevelGameplayHistoryRecord*/)
    }
}

JumpLevelReplayPlayerController.prototype.delete = function() {
    jQuery.each(this.handlers, collectionObjectDelete);
    this.levelReplayPlayer.stop();
};

JumpLevelReplayPlayerController.prototype.getPendingRecord = function() {
    return this.pendingRecords[0];
};

JumpLevelReplayPlayerController.prototype.recProcCompleted = function() {
    this.pendingRecords.shift();
    if (this.pendingRecords.length > 0) {
        this.events.recPending.publish(this.pendingRecords[0]);
    }
};

JumpLevelReplayPlayerController.prototype.play = function() {
    //console.log("play()");
    this.levelReplayPlayer.play();
};

JumpLevelReplayPlayerController.prototype.stop = function() {
    //console.log("stop()");
    this.levelReplayPlayer.stop();
};

JumpLevelReplayPlayerController.prototype.speedUp = function() {
    this.levelReplayPlayer.speedUp();
};

JumpLevelReplayPlayerController.prototype.speedDown = function() {
    this.levelReplayPlayer.speedDown();
};

JumpLevelReplayPlayerController.prototype._onRecReady = function(rec) {
    //console.log("onRecReady");
    this.pendingRecords.push(rec);  
    if (this.pendingRecords.length === 1) {
        this.events.recPending.publish(this.pendingRecords[0]);
    } 
};

JumpLevelReplayPlayerController.prototype._onLevelReplayLoaded = function(replay) {
    //console.log("_onLevelReplayLoaded");
    this.levelReplayPlayer.setReplay(replay);
};
