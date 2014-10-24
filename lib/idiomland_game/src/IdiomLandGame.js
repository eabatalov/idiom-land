function IdiomLandGame(name, gameInitDict, isFirstGameRun) {
    this.isReady = false;
    this.isFirstGameRun = isFirstGameRun || false;
    QuestGame.call(this, name, gameInitDict);

    this.events.ready = new SEEvent(/* this IdiomLandGame */);

    this.jsLevelApi = new IdiomLevelApi(this);
    this.levelNamesOrdered = [
        '1demo',
    ];

    this.levelsProgressManager = null;
    this.learningProgressManager = null;
    //Should be last cause signals ready event
    this.startLoadingAllLevels();
};

IdiomLandGame.prototype = new QuestGame();
IdiomLandGame.prototype.constructor = IdiomLandGame;

IdiomLandGame.prototype.startLoadingAllLevels = function() {
    /*
     * Fill all Idiomland levels here.
     * Their status is only known when levels are loaded.
     */
    jQuery.each(this.levelNamesOrdered, function(ix, levelName) {
        this.levelRepo.addLevel(levelName);
    }.bind(this));
    this.levelRepo.waitAllPendingRequests(this.onAllLevelsLoaded.bind(this));
};

IdiomLandGame.prototype.onAllLevelsLoaded = function() {
    this.levelRepo.forEachLevel(levelInit.bind(this));
        this.jsLevelApi.setLevel(null);

    this.levelsProgressManager =
        new IdiomLandLevelsProgressManager(this.levelNamesOrdered, this.levelRepo,
                this.isFirstGameRun);
    this.learningProgressManager =
        new IdiomLandLearningProgressManager(this.levelRepo);

    this.isReady = true;
    this.events.ready.publish(this);

    function levelInit(levelName, level) {
        var levelInterpretator = new ScriptInterpretator(level.getScript());
        var nodeExecJS = new QuestScriptNodeExecJS();
        var nodeExecJSEnvDef = new QuestScriptNodeExecJSEnv();
 
        this.jsLevelApi.setLevel(level);
        levelInterpretator.execStage('init', function(node) {
            nodeExecJS.exec(node, nodeExecJSEnvDef);               
        });
    }
};

IdiomLandGame.prototype.getIsReady = function() {
    return this.isReady;
};

IdiomLandGame.prototype.getIdiomLevelApi = function() {
    return this.jsLevelApi;
};

IdiomLandGame.prototype.getLevelsProgressManager = function() {
    return this.levelsProgressManager;
}

/*
 * Create totally new game (first game run)
 */
IdiomLandGame.newGame = function(name, gameInitDict) {
    gameInitDict["levelRepo"] =
        new LevelRepository(gameInitDict["levelLoader"]);
    return new IdiomLandGame(name, gameInitDict, true);
};

// ==================================================
// Save/Load
IdiomLandGame.magic = "Zee7Zo";

IdiomLandGame.prototype._save = function() {
    var savedData = {
        ver : 1,
        magic : IdiomLandGame.magic,
        name : this.getName(),
        levelRepo : this.getLevelRepo().save()
    };
    return savedData;
};

IdiomLandGame.load = function(savedData, gameInitDict) {
    assert(savedData.ver === 1);
    assert(savedData.magic === IdiomLandGame.magic);

    gameInitDict["levelRepo"] = LevelRepository.load(
        savedData.levelRepo,
        gameInitDict["levelLoader"]
    );
    var game = new IdiomLandGame(savedData.name, gameInitDict, false);
    return game;
};
