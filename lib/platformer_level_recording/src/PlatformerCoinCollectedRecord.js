function PlatformerCoinCollectedRecord(coinUID) {
    LevelGameplayRecord.call(this, PlatformerCoinCollectedRecord.type);

    this.coinUID = coinUID; //Int
}

PlatformerCoinCollectedRecord.type = 2000;
PlatformerCoinCollectedRecord.prototype = new LevelGameplayRecord(PlatformerCoinCollectedRecord.type);

PlatformerCoinCollectedRecord.prototype.getCoinUID = function() {
    return this.coinUID;
};

PlatformerCoinCollectedRecord.prototype.save = function() {
    var savedData = {
        rec : LevelGameplayRecord.prototype.save.call(this),
        cu : this.coinUID
    };
    return savedData;
};

PlatformerCoinCollectedRecord.load = function(savedData) {
    var rec = new PlatformerCoinCollectedRecord(savedData.cu);
    LevelGameplayRecord.load(savedData.rec, rec);
    return rec;
};

LevelGameplayRecord.registerLevelGameplayRecordLoader(
    PlatformerCoinCollectedRecord.type, PlatformerCoinCollectedRecord.load
);
