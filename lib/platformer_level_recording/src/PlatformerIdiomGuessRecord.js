function PlatformerIdiomGuessRecord(isGuessed) {
    LevelGameplayRecord.call(this, PlatformerIdiomGuessRecord.type);
    this._isGuessed = isGuessed;
}

PlatformerIdiomGuessRecord.type = 2001;
PlatformerIdiomGuessRecord.prototype = new LevelGameplayRecord(PlatformerIdiomGuessRecord.type);

PlatformerIdiomGuessRecord.prototype.getIsGuessed = function() {
    return this._isGuessed;
};

PlatformerIdiomGuessRecord.prototype.save = function() {
    var savedData = {
        rec : LevelGameplayRecord.prototype.save.call(this),
        isg : this._isGuessed
    };
    return savedData;
};

PlatformerIdiomGuessRecord.load = function(savedData) {
    var rec = new PlatformerIdiomGuessRecord(savedData.isg);
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};

LevelGameplayRecord.registerLevelGameplayRecordLoader(
    PlatformerIdiomGuessRecord.type, PlatformerIdiomGuessRecord.load
);
