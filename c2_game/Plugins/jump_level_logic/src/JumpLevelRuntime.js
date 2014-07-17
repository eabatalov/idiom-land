function IdiomJumpCollectionProgress(idiom) {
    this.idiom = idiom;
    //TODO make tokens more uniform
    this.allTokensOrdered = idiom.getTitle().split(" ");
    this.currentTokenToGuessIx = 0;
    this.currentGuessedTokenChainStr = "";
}

IdiomJumpCollectionProgress.prototype.getIdiomTitle = function() {
    return this.idiom.getTitle();
};

IdiomJumpCollectionProgress.prototype.getGuessedTokenChainStr = function() {
    return this.currentGuessedTokenChainStr;
};

IdiomJumpCollectionProgress.prototype.isGuessed = function() {
    return this.currentTokenToGuessIx === this.allTokensOrdered.length;
};

IdiomJumpCollectionProgress.prototype.getNextTokenToGuess = function() {
    //TODO complete
    if (this.isGuessed())
        return "";
    else
        return this.allTokensOrdered[this.currentTokenToGuessIx];
};

IdiomJumpCollectionProgress.prototype.tokenCollected = function(token) {
    if (this.allTokensOrdered[this.currentTokenToGuessIx] !== token) {
        this.currentTokenToGuessIx = 0;
        this.currentGuessedTokenChainStr = "";
        return false;
    }
    this.currentGuessedTokenChainStr += token + " ";
    this.currentTokenToGuessIx++;
    if (this.isGuessed()) {
        this.currentGuessedTokenChainStr = "";
        this.idiom.setStatus(Idiom.STATUS.GUESSED);
    }
    return true;
};

//===============================================================
function JumpLevelRuntime() {
    this.events = {
        currentIdiomChanged : new SEEvent(),
        currentTokenChainChanged : new SEEvent(),
        rigthTokenCollected : new SEEvent()
    };

    this.idiomJumpCollections = null;
    this.currentIdiomToGuessIx = null;
    this.currentLevel = null;
    IdiomLandGame.instance.events.levelChanged.
        subscribe(this, this.onCurrentLevelChanged);
}

JumpLevelRuntime.prototype.getCurrentIdiomCollection = function() {
    var idiomCollection = this.idiomJumpCollections[this.currentIdiomToGuessIx];
    assert(idiomCollection);
    return idiomCollection;
};

JumpLevelRuntime.prototype.arrayRandomShuffle = function(array) {
    //TODO implement
}

JumpLevelRuntime.prototype.onCurrentLevelChanged = function(level) {
    this.currentLevel = level;
    this.idiomJumpCollections = [];
    this.currentIdiomToGuessIx = 0;

    this.currentLevel.forEachIdiom(function(idiomId, idiom) {
        this.idiomJumpCollections.push(new IdiomJumpCollectionProgress(idiom));
    }.bind(this));
    this.arrayRandomShuffle(this.idiomJumpCollections);

    this.events.currentTokenChainChanged.publish();
    this.events.currentIdiomChanged.publish();
};

JumpLevelRuntime.prototype.tokenCollected = function(token) {
    var idiomCollection = this.getCurrentIdiomCollection();

    if (!idiomCollection.tokenCollected(token)) {
        this.events.currentTokenChainChanged.publish();
        return;
    }

    this.events.currentTokenChainChanged.publish();
    this.events.rigthTokenCollected.publish();
    if (!idiomCollection.isGuessed())
        return;

    this.currentIdiomToGuessIx++;
    if (!this.isLevelCompleted())
        this.events.currentIdiomChanged.publish();
};

JumpLevelRuntime.prototype.getCurrentIdiomTitle = function() {
    return this.getCurrentIdiomCollection().getIdiomTitle();
};

JumpLevelRuntime.prototype.getCurrentTokenChain = function() {
    return this.getCurrentIdiomCollection().getGuessedTokenChainStr();
};

JumpLevelRuntime.prototype.getNextTokenToShow = function() {
    //TODO complete
    return this.getCurrentIdiomCollection().getNextTokenToGuess();
};

JumpLevelRuntime.prototype.isLevelCompleted = function() {
    return this.idiomJumpCollections.length === this.currentIdiomToGuessIx;
};
