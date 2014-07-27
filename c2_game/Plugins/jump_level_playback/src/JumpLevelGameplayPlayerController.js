function JumpLevelGameplayPlayerController(jumpLevelGameplayPlayer, histLoader) {
    this.pendingRecords = [];
    this.handlers = [];

    this.histLoader = histLoader;
    this.levelGameplayPlayer = jumpLevelGameplayPlayer;
    this.levelGameplayPlayer.setLevelHist(new LevelGameplayHistory());

    this.handlers.push(this.histLoader.events.
        historyLoaded.subscribe(this, this._onLevelGameplayHistoryLoaded));
    this.handlers.push(
        this.levelGameplayPlayer.events.
            recReady.subscribe(this, this._onRecReady));

    this.events = {
        recPending : new SEEvent(/*LevelGameplayHistoryRecord*/)
    }
}

JumpLevelGameplayPlayerController.prototype.delete = function() {
    jQuery.each(this.handlers, collectionObjectDelete);
    this.levelGameplayPlayer.stop();
};

JumpLevelGameplayPlayerController.prototype.getPendingRecord = function() {
    return this.pendingRecords[0];
};

JumpLevelGameplayPlayerController.prototype.recProcCompleted = function() {
    this.pendingRecords.shift();
    if (this.pendingRecords.length > 0) {
        this.events.recPending.publish(this.pendingRecords[0]);
    }
};

JumpLevelGameplayPlayerController.prototype.play = function() {
    console.log("play()");
    this.levelGameplayPlayer.play();
};

JumpLevelGameplayPlayerController.prototype.stop = function() {
    console.log("stop()");
    this.levelGameplayPlayer.stop();
};

JumpLevelGameplayPlayerController.prototype.speedUp = function() {
    this.levelGameplayPlayer.speedUp();
};

JumpLevelGameplayPlayerController.prototype.speedDown = function() {
    this.levelGameplayPlayer.speedDown();
};

JumpLevelGameplayPlayerController.prototype._onRecReady = function(rec) {
    console.log("onRecReady");
    this.pendingRecords.push(rec);  
    if (this.pendingRecords.length === 1) {
        this.events.recPending.publish(this.pendingRecords[0]);
    } 
};

JumpLevelGameplayPlayerController.prototype._onLevelGameplayHistoryLoaded = function(history) {
    console.log("_onLevelGameplayHistoryLoaded");
    this.levelGameplayPlayer.setLevelHist(history);
};
