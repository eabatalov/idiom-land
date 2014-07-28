function JumperGenIdiomTokenRecord(posX, posY, tokenText) {
    LevelGameplayRecord.call(this, JumperGenIdiomTokenRecord.type);
    this.posX = posX;
    this.posY = posY;
    this.tokenText = tokenText;
}

JumperGenIdiomTokenRecord.type = 1001;
JumperGenIdiomTokenRecord.prototype = new LevelGameplayRecord(JumperGenIdiomTokenRecord.type);

JumperGenIdiomTokenRecord.prototype.getPosX = function() {
    return this.posX;
};

JumperGenIdiomTokenRecord.prototype.getPosY = function() {
    return this.posY;
};

JumperGenIdiomTokenRecord.prototype.getTokenText = function() {
    return this.tokenText;
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

LevelGameplayRecord.registerLevelGameplayRecordLoader(
    JumperGenIdiomTokenRecord.type, JumperGenIdiomTokenRecord.load
);
