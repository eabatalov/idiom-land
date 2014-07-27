function JumperCollectedIdiomSubstringChangedRecord(substr) {
    LevelGameplayRecord.call(this,
        LevelGameplayRecord.TYPES.JUMPER_COLLECTED_IDIOM_SUBSTRING_CHANGE);
    this.substr = substr;
}

JumperCollectedIdiomSubstringChangedRecord.prototype =
    new LevelGameplayRecord(LevelGameplayRecord.TYPES.JUMPER_COLLECTED_IDIOM_SUBSTRING_CHANGE);

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
    var rec = new JumperCollectedIdiomSubstringChangedRecord(savedData.substr);
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};
