function LevelIdiomProgressEntry(idiomId) {
    this.idiomId = idiomId;
    this.title = "";
    this.shortMeaning = "";
    this.longExplanation = "";
    this.hint = "";
    this.status = LevelIdiomProgressEntry.statuses.ignored;
}

LevelIdiomProgressEntry.statuses = {
    ignored: 'IGNORED',
    guessed: 'GUESSED',
    failed: 'FAILED'
};

LevelIdiomProgressEntry.prototype.getId = function() {
    return this.idiomId;
};

LevelIdiomProgressEntry.prototype.getTitle = function() {
    return this.title;
};

LevelIdiomProgressEntry.prototype.setTitle = function(title) {
    this.title = title;
};

LevelIdiomProgressEntry.prototype.getMeaning = function() {
    return this.shortMeaning;
};

LevelIdiomProgressEntry.prototype.setMeaning = function(meaning) {
    this.shortMeaning = meaning;
};

LevelIdiomProgressEntry.prototype.getExplanation = function() {
    return this.longExplanation;
};

LevelIdiomProgressEntry.prototype.setExplanation = function(explanation) {
    this.longExplanation = explanation;
};

LevelIdiomProgressEntry.prototype.getHint = function() {
    return this.hint;
};

LevelIdiomProgressEntry.prototype.setHint = function(hint) {
    this.hint = hint;
};

LevelIdiomProgressEntry.prototype.getStatus = function() {
    return this.status;
};

LevelIdiomProgressEntry.prototype.setStatus = function(status) {
    this.status = status;
};

//===============================================================

function LevelIdiomsProgressTracker() {
    this.idiomProgressEntries = [];
    this.events = {
        idiomGuessed : null
    };
    //singleton for now
    LevelIdiomsProgressTrackerInstance = this;
}

LevelIdiomsProgressTracker.prototype.onIdiomGuessed = function(callback) {
    this.events.idiomGuessed = callback;
};

LevelIdiomsProgressTracker.prototype.getAllIdioms = function() {
    return this.idiomProgressEntries;
};

LevelIdiomsProgressTracker.prototype.getIdiomsWithStatusCount = function(status) {
    var count = 0;
    jQuery.each(this.idiomProgressEntries, function(ix, idiom) {
        if (idiom.getStatus() === status)
        {
            ++count;
        }
    });
    return count;
};

LevelIdiomsProgressTracker.prototype.getGuessedIdiomsCount = function() {
    return this.getIdiomsWithStatusCount(LevelIdiomProgressEntry.statuses.guessed);
};

LevelIdiomsProgressTracker.prototype.getFoundIdiomsCount = function() {
    return this.getGuessedIdiomsCount() +
        this.getIdiomsWithStatusCount(LevelIdiomProgressEntry.statuses.failed);
};

LevelIdiomsProgressTracker.prototype.registerIdiom = function(id, title, meaning, explanation, hint) {
    var newIdiom = new LevelIdiomProgressEntry(id);
    newIdiom.setTitle(title);
    newIdiom.setMeaning(meaning);
    newIdiom.setExplanation(explanation);
    newIdiom.setHint(hint);
    this.idiomProgressEntries.push(newIdiom);
};

LevelIdiomsProgressTracker.prototype.idiomChangeStatus = function(id, newStatus) {
    jQuery.each(this.idiomProgressEntries, function(ix, idiom) {
        if (idiom.getId() !== id)
            return;

        idiom.setStatus(newStatus);
        return false;
    });
};

LevelIdiomsProgressTracker.prototype.idiomGuessed = function(id) {
    this.idiomChangeStatus(id, LevelIdiomProgressEntry.statuses.guessed);

    if (this.events.idiomGuessed)
        this.events.idiomGuessed();
};

LevelIdiomsProgressTracker.prototype.idiomFailed = function(id) {
    this.idiomChangeStatus(id, LevelIdiomProgressEntry.statuses.failed);
};

//===============================================================
// Public javascript interface for quest scripts
var LevelIdiomsProgressTrackerInstance = null;
/*
 * args : {
 *  id : String,
 *  title : String,
 *  meaning: String,
 *  hint: String (optional)
 *  explanation: String (optional)
 * }
 */
function idiomRegister(args) {
    var explanation = args.explanation || "";
    var hint = args.hint || "";
    LevelIdiomsProgressTrackerInstance.registerIdiom(args.id, args.title, args.meaning, explanation, hint);
}

/*
 * args : {
 *  id : String
 * }
 */
function idiomGuessed(args) {
    LevelIdiomsProgressTrackerInstance.idiomGuessed(args.id);
}

/*
 * args : {
 *  id : String
 * }
 */
function idiomFailed(args) {
    LevelIdiomsProgressTrackerInstance.idiomFailed(args.id);
}
