function IdiomLandGame(name, levelRepo, persistentStorage, inAppPurchaseProvider,
        levelGameplayHistorySaver, levelGameplayHistoryLoader,
        isFirstGameRun) {
    this.isReady = false;
    this.isFirstGameRun = isFirstGameRun || false;
    QuestGame.call(this, name, levelRepo, persistentStorage, inAppPurchaseProvider,
        levelGameplayHistorySaver, levelGameplayHistoryLoader);

    this.events.ready = new SEEvent(/* this IdiomLandGame */);

    this.jsLevelApi = new IdiomLevelApi(this);
    this.levelNamesOrdered = [
        '1demo',
        '2demo_jump'
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
IdiomLandGame.newGame = function(name, levelLoader, persistentStorage, inAppPurchaseProvider,
    levelGameplayHistorySaver, levelGameplayHistoryLoader) {
    return new IdiomLandGame(name, new LevelRepository(levelLoader), persistentStorage,
        inAppPurchaseProvider, levelGameplayHistorySaver, levelGameplayHistoryLoader, true);
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

IdiomLandGame.load = function(savedData, levelLoader, persistentStorage, inAppPurchaseProvider,
    levelGameplayHistorySaver, levelGameplayHistoryLoader) {
    assert(savedData.ver === 1);
    assert(savedData.magic === IdiomLandGame.magic);

    var levelRepo = LevelRepository.load(savedData.levelRepo, levelLoader);
    var game = new IdiomLandGame(savedData.name,
        levelRepo, persistentStorage, inAppPurchaseProvider,
        levelGameplayHistorySaver, levelGameplayHistoryLoader);
    return game;
};
