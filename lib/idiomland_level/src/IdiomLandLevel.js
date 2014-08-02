/*
 * TODO make dedicated idiom level and idiom progress entity.
 * Idiom.status field is very bad - it adds mutability to
 * immutable objects.
 */
function IdiomLandLevel(levelName, script, status) {
    QuestLevel.call(this, levelName, script, status);
    this.events = {
        idiomAdded : new SEEvent(/* idiom */),
        finalizeProgress : new SEEvent(/* this level */)
    };
    //Not persistent. Inited during script 'init' stage run
    this.idioms = { /* idiom id => Idiom */ };
}

IdiomLandLevel.prototype = new QuestLevel();
IdiomLandLevel.prototype.constructor = IdiomLandLevel;

IdiomLandLevel.STATUS = {
    UNDEFINED : QuestLevel.STATUS.UNDEFINED,
    UNAVALIABLE : QuestLevel.STATUS.UNAVALIABLE,
    LOCKED : QuestLevel.STATUS.LOCKED,
    UNLOCKED : QuestLevel.STATUS.UNLOCKED,
    LAST : QuestLevel.STATUS.UNLOCKED + 1
};

IdiomLandLevel.prototype.regIdiom = function(idiom) {
    if (this.idioms[idiom.getId()])
        return;
    this.idioms[idiom.getId()] = idiom;
    this.events.idiomAdded.publish(idiom);
};

IdiomLandLevel.prototype.forEachIdiom = function(callback/*(idiomId, idiom)*/) {
    jQuery.each(this.idioms, callback);
};

IdiomLandLevel.prototype.getIdiomById = function(idiomId) {
    assert(this.idioms[idiomId]);
    return this.idioms[idiomId];
};

IdiomLandLevel.prototype.finalizeProgress = function() {
    this.events.finalizeProgress.publish(this);
};

IdiomLandLevel.prototype.resetProgress = function() {
    jQuery.each(this.idioms, function(idiomId, idiom) {
        idiom.setStatus(Idiom.STATUS.IGNORED);
    });
};

/*
 * returns plain js object with saved data
 */
IdiomLandLevel.magic = "ON8kie";
IdiomLandLevel.prototype.save = function() {
    var savedData = {
        ver : 1,
        magic : IdiomLandLevel.magic,
        questLevel : QuestLevel.prototype.save.call(this)
    };
    return savedData;
};

/*
 * returns: restored instance of IdiomLandLevel
 */
IdiomLandLevel.load = function(savedData, questScript) {
    assert(savedData.ver === 1);
    assert(savedData.magic === IdiomLandLevel.magic);

    var questLevel = QuestLevel.load(savedData.questLevel, questScript);

    var level = new IdiomLandLevel(
        questLevel.getName(),
        questLevel.getScript(),
        questLevel.getStatus()
    );
    return level;
};

IdiomLandLevel.loadName = function(savedData) {
    assert(savedData.ver === 1);
    assert(savedData.magic === IdiomLandLevel.magic);
    return QuestLevel.loadName(savedData.questLevel);
};
