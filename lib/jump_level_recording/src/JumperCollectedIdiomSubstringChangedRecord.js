function JumperCollectedIdiomSubstringChangedRecord(substr) {
    LevelGameplayRecord.call(this, JumperCollectedIdiomSubstringChangedRecord.type);
    this.substr = substr;
}

JumperCollectedIdiomSubstringChangedRecord.type = 1003;
JumperCollectedIdiomSubstringChangedRecord.prototype =
    new LevelGameplayRecord(JumperCollectedIdiomSubstringChangedRecord.type);

JumperCollectedIdiomSubstringChangedRecord.prototype.getSubstr = function() {
    return this.substr;
};

JumperCollectedIdiomSubstringChangedRecord.prototype.save = function() {
    var savedData = {
        rec : LevelGameplayRecord.prototype.save.call(this),
        ss : this.substr,
    };
    return savedData;
};

JumperCollectedIdiomSubstringChangedRecord.load = function(savedData) {
    var rec = new JumperCollectedIdiomSubstringChangedRecord(savedData.ss);
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};

LevelGameplayRecord.registerLevelGameplayRecordLoader(
    JumperCollectedIdiomSubstringChangedRecord.type,
    JumperCollectedIdiomSubstringChangedRecord.load
);
