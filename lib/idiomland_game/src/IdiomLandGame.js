function IdiomLandGame(name, levelRepo, persistentStorage, inAppPurchaseProvider) {
    this.isReady = false;
    QuestGame.call(this, name, levelRepo, persistentStorage, inAppPurchaseProvider);

    this.events.ready = new SEEvent(/* this IdiomLandGame */);
    this.jsLevelApi = new IdiomLevelApi(this);
    this.setupAllLevels();
};

IdiomLandGame.prototype = new QuestGame();
IdiomLandGame.prototype.constructor = IdiomLandGame;

IdiomLandGame.prototype.setupAllLevels = function() {
    /*
     * Fill all Idiomland levels here.
     * Their status is only known when levels are loaded.
     */
    this.levelRepo.addLevel('1demo');
    //...
    this.levelRepo.waitAllPendingRequests(onAllLevelsLoaded.bind(this));
    return;

    function onAllLevelsLoaded() {
        this.levelRepo.forEachLevel(firstLevelInit.bind(this));
        this.jsLevelApi.setLevel(null);
        this.isReady = true;
        this.events.ready.publish(this);
    }

    function firstLevelInit(levelName, level) {
        var levelInterpretator = new ScriptInterpretator(level.getScript());
        this.jsLevelApi.setLevel(level);
        levelInterpretator.execStage('init');
    }
};

IdiomLandGame.prototype.getIsReady = function() {
    return this.isReady;
};

IdiomLandGame.prototype.getIdiomLevelApi = function() {
    return this.jsLevelApi;
}

/*
 * Create totally new game (first game run)
 */
IdiomLandGame.newGame = function(name, levelLoader, persistentStorage, inAppPurchaseProvider) {
    return new IdiomLandGame(name, new LevelRepository(levelLoader), persistentStorage,
        inAppPurchaseProvider);
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

IdiomLandGame.load = function(savedData, levelLoader, persistentStorage, inAppPurchaseProvider) {
    assert(savedData.ver === 1);
    assert(savedData.magic === IdiomLandGame.magic);

    var levelRepo = LevelRepository.load(savedData.levelRepo, levelLoader);
    var game = new IdiomLandGame(savedData.name,
        levelRepo, persistentStorage, inAppPurchaseProvider);
    return game;
};
