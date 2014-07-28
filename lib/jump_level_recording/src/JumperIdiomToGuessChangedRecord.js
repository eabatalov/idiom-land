function JumperIdiomToGuessChangedRecord(idiomText) {
    LevelGameplayRecord.call(this, JumperIdiomToGuessChangedRecord.type);
    this.idiomText = idiomText;
}

JumperIdiomToGuessChangedRecord.type = 1002;
JumperIdiomToGuessChangedRecord.prototype =
    new LevelGameplayRecord(JumperIdiomToGuessChangedRecord.type);

JumperIdiomToGuessChangedRecord.prototype.getIdiomText = function() {
    return this.idiomText;
};

JumperIdiomToGuessChangedRecord.prototype.save = function() {
    var savedData = {
        rec : LevelGameplayRecord.prototype.save.call(this),
        tx : this.idiomText
    };
    return savedData;
};

JumperIdiomToGuessChangedRecord.load = function(savedData) {
    var rec = new JumperIdiomToGuessChangedRecord(savedData.tx);
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};

LevelGameplayRecord.registerLevelGameplayRecordLoader(
    JumperIdiomToGuessChangedRecord.type,
    JumperIdiomToGuessChangedRecord.load
);
