function JumperIdiomToGuessChangedRecord(idiomText) {
    LevelGameplayRecord.call(this, LevelGameplayRecord.TYPES.JUMPER_IDIOM_TO_GUESS_CHANGE);
    this.idiomText = idiomText;
}

JumperIdiomToGuessChangedRecord.prototype =
    new LevelGameplayRecord(LevelGameplayRecord.TYPES.JUMPER_IDIOM_TO_GUESS_CHANGE);

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
