function JumperGenIdiomTokenRecord(posX, posY, tokenText) {
    LevelGameplayRecord.call(this, LevelGameplayRecord.TYPES.JUMPER_GEN_IDIOM_TOKEN);
    this.posX = posX;
    this.posY = posY;
    this.tokenText = tokenText;
}

JumperGenIdiomTokenRecord.prototype =
    new LevelGameplayRecord(LevelGameplayRecord.TYPES.JUMPER_GEN_IDIOM_TOKEN);

JumperGenIdiomTokenRecord.prototype.getPosX = function() {
    return this.posX;
};

JumperGenIdiomTokenRecord.prototype.getPosY = function() {
    return this.posY;
};

JumperGenIdiomTokenRecord.prototype.save = function() {
    var savedData = {
        rec : LevelGameplayRecord.prototype.save.call(this),
        px : this.posX,
        py : this.posY,
        tt : this.tokenText
    };
    return savedData;
};

JumperGenIdiomTokenRecord.load = function(savedData) {
    var rec = new JumperGenIdiomTokenRecord(
        savedData.px, savedData.py, savedData.tt
    );
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};
