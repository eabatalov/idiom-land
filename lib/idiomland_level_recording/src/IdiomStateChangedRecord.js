function IdiomStateChangeRecord(idiomId, state) {
    LevelGameplayRecord.call(this, IdiomStateChangeRecord.type);
    this._idiomId = idiomId;
    this._state = state;
}

IdiomStateChangeRecord.STATE = {
    GUESSED : 1,
    FAILED : 2
};

IdiomStateChangeRecord.type = 3000;
IdiomStateChangeRecord.prototype = new LevelGameplayRecord(IdiomStateChangeRecord.type);

IdiomStateChangeRecord.prototype.getIdiomId = function() {
    return this._idiomId;
};

IdiomStateChangeRecord.prototype.getState = function() {
    return this._state;
};

IdiomStateChangeRecord.prototype.save = function() {
    var savedData = {
        rec : LevelGameplayRecord.prototype.save.call(this),
        id : this._idiomId,
        st : this._state
    };
    return savedData;
};

IdiomStateChangeRecord.load = function(savedData) {
    var rec = new IdiomStateChangeRecord(savedData.id, savedData.st);
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};

LevelGameplayRecord.registerLevelGameplayRecordLoader(
    IdiomStateChangeRecord.type, IdiomStateChangeRecord.load
);
