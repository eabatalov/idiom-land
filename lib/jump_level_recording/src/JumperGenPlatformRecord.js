function JumperGenPlatformRecord(posX, posY) {
    LevelGameplayRecord.call(this, JumperGenPlatformRecord.type);
    this.posX = posX;
    this.posY = posY;
}

JumperGenPlatformRecord.type = 1000;
JumperGenPlatformRecord.prototype =
    new LevelGameplayRecord(JumperGenPlatformRecord.type);

JumperGenPlatformRecord.prototype.getPosX = function() {
    return this.posX;
};

JumperGenPlatformRecord.prototype.getPosY = function() {
    return this.posY;
};

JumperGenPlatformRecord.prototype.save = function() {
    var savedData = {
        rec : LevelGameplayRecord.prototype.save.call(this),
        px : this.posX,
        py : this.posY
    };
    return savedData;
};

JumperGenPlatformRecord.load = function(savedData) {
    var rec = new JumperGenPlatformRecord(savedData.px, savedData.py);
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};

LevelGameplayRecord.registerLevelGameplayRecordLoader(
    JumperGenPlatformRecord.type, JumperGenPlatformRecord.load
);
