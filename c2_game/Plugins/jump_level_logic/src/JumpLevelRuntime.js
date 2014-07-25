function IdiomJumpCollectionProgress(idiom) {
    this.idiom = idiom;
    this.allTokensOrdered = this.tokenize(idiom.getTitle());
    this.currentTokenToGuessIx = 0;
    this.currentGuessedTokenChainStr = "";
}

IdiomJumpCollectionProgress.prototype.tokenize = function(str) {
    var TOKEN_MAX_LEN = 8; //Depends on current UI settings
    var tokens = [];
    var curToken = [];
    for (var chIx = 0; chIx < str.length; ++chIx) {
        var ch = str[chIx];
        curToken.push(ch);

        if (curToken.length === TOKEN_MAX_LEN
            || ch === " "
            || chIx === (str.length - 1)) {
            tokens.push(curToken.join(""));
            curToken = [];
        }
    }
    return tokens;
};

IdiomJumpCollectionProgress.prototype.getIdiomTitle = function() {
    return this.idiom.getTitle();
};

IdiomJumpCollectionProgress.prototype.getGuessedTokenChainStr = function() {
    return this.currentGuessedTokenChainStr;
};

IdiomJumpCollectionProgress.prototype.isGuessed = function() {
    return this.currentTokenToGuessIx === this.allTokensOrdered.length;
};

IdiomJumpCollectionProgress.prototype.getNextRightToken = function() {
    if (this.isGuessed())
        return "";
    else
        return this.allTokensOrdered[this.currentTokenToGuessIx];
};

IdiomJumpCollectionProgress.prototype.getRandomToken = function() {
    var randTokenIx = Math.floor(Math.random() * this.allTokensOrdered.length);
    return this.allTokensOrdered[randTokenIx];
};

IdiomJumpCollectionProgress.prototype.tokenCollected = function(token) {
    if (this.allTokensOrdered[this.currentTokenToGuessIx] !== token) {
        this.currentTokenToGuessIx = 0;
        this.currentGuessedTokenChainStr = "";
        return false;
    }
    this.currentGuessedTokenChainStr += token;
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

JumpLevelRuntime.prototype.arrayRandomShuffle = function(ar) {
    var srcIx = 0; var dstIx = 0; var tmp = null;
    while (dstIx < ar.length) {
        srcIx = Math.floor((Math.random() * (ar.length - dstIx))) + dstIx;
        tmp = ar[srcIx];
        ar[srcIx] = ar[dstIx];
        ar[dstIx] = tmp;
        ++dstIx;
    }
}

JumpLevelRuntime.prototype.onCurrentLevelChanged = function(questLevelRuntime) {
    this.currentLevel = questLevelRuntime.getLevel();
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
    var RIGHT_TOKEN_PROB = 0.5;
    if (Math.random() < RIGHT_TOKEN_PROB)
        return this.getCurrentIdiomCollection().getNextRightToken();

    var randIdiomIx = Math.floor(Math.random() * this.idiomJumpCollections.length);
    return this.idiomJumpCollections[randIdiomIx].getRandomToken();
};

JumpLevelRuntime.prototype.isLevelCompleted = function() {
    return this.idiomJumpCollections.length === this.currentIdiomToGuessIx;
};
