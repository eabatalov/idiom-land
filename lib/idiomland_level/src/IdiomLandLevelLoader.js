function IdiomLandLevelLoader(questScriptLoader) {
    this.questScriptLoader = questScriptLoader;
}

IdiomLandLevelLoader.prototype = new ILevelLoader();
IdiomLandLevelLoader.prototype.constructor = IdiomLandLevelLoader;

IdiomLandLevelLoader.prototype.create = function(levelName, callback) {
    // by current policy level and quest script names are the same
    this.questScriptLoader.load(levelName, function(script) {
        var level = new IdiomLandLevel(levelName, script);
        callback(level);
    });
};

IdiomLandLevelLoader.prototype.load = function(levelSavedData, callback) {
    // by current policy level and quest script names are the same
    var levelName = IdiomLandLevel.loadName(levelSavedData);
    this.questScriptLoader.load(levelName, function(script) {
        var level = IdiomLandLevel.load(levelSavedData, script);
        callback(level);
    });
};

IdiomLandLevelLoader.prototype.loadName = function(levelSavedData) {
    return IdiomLandLevel.loadName(levelSavedData);
};
