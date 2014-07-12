function IdiomProgressEntry(id) {
    this.id = id;
    this.title = "";
    this.shortMeaning = "";
    this.longExplanation = "";
    this.hint = "";
    this.status = IdiomProgressEntry.statuses.ignored;
}

IdiomProgressEntry.statuses = {
    ignored: 'IGNORED',
    guessed: 'GUESSED',
    failed: 'FAILED'
};

IdiomProgressEntry.prototype.getId = function() {
    return this.id;
};

IdiomProgressEntry.prototype.getTitle = function() {
    return this.title;
};

IdiomProgressEntry.prototype.setTitle = function(title) {
    this.title = title;
};

IdiomProgressEntry.prototype.getMeaning = function() {
    return this.shortMeaning;
};

IdiomProgressEntry.prototype.setMeaning = function(meaning) {
    this.shortMeaning = meaning;
};

IdiomProgressEntry.prototype.getExplanation = function() {
    return this.longExplanation;
};

IdiomProgressEntry.prototype.setExplanation = function(explanation) {
    this.longExplanation = explanation;
};

IdiomProgressEntry.prototype.getHint = function() {
    return this.hint;
};

IdiomProgressEntry.prototype.setHint = function(hint) {
    this.hint = hint;
};

IdiomProgressEntry.prototype.getStatus = function() {
    return this.status;
};

IdiomProgressEntry.prototype.setStatus = function(status) {
    this.status = status;
};

//===============================================================

function IdiomsProgressTracker() {
    this.idiomProgressEntries = [];
    this.events = {
        idiomGuessed : null
    };
    //singleton for now
    IdiomsProgressTrackerInstance = this;
}

IdiomsProgressTracker.prototype.onIdiomGuessed = function(callback) {
    this.events.idiomGuessed = callback;
};

IdiomsProgressTracker.prototype.getAllIdioms = function() {
    return this.idiomProgressEntries;
};

IdiomsProgressTracker.prototype.getIdiomsWithStatusCount = function(status) {
    var count = 0;
    jQuery.each(this.idiomProgressEntries, function(ix, idiom) {
        if (idiom.getStatus() === status)
        {
            ++count;
        }
    });
    return count;
};

IdiomsProgressTracker.prototype.getGuessedIdiomsCount = function() {
    return this.getIdiomsWithStatusCount(IdiomProgressEntry.statuses.guessed);
};

IdiomsProgressTracker.prototype.getFoundIdiomsCount = function() {
    return this.getGuessedIdiomsCount() +
        this.getIdiomsWithStatusCount(IdiomProgressEntry.statuses.failed);
};

IdiomsProgressTracker.prototype.registerIdiom = function(id, title, meaning, explanation, hint) {
    var newIdiom = new IdiomProgressEntry(id);
    newIdiom.setTitle(title);
    newIdiom.setMeaning(meaning);
    newIdiom.setExplanation(explanation);
    newIdiom.setHint(hint);
    this.idiomProgressEntries.push(newIdiom);
};

IdiomsProgressTracker.prototype.idiomChangeStatus = function(id, newStatus) {
    jQuery.each(this.idiomProgressEntries, function(ix, idiom) {
        if (idiom.getId() !== id)
            return;

        idiom.setStatus(newStatus);
        return false;
    });
};

IdiomsProgressTracker.prototype.idiomGuessed = function(id) {
    this.idiomChangeStatus(id, IdiomProgressEntry.statuses.guessed);

    if (this.events.idiomGuessed)
        this.events.idiomGuessed();
};

IdiomsProgressTracker.prototype.idiomFailed = function(id) {
    this.idiomChangeStatus(id, IdiomProgressEntry.statuses.failed);
};

//===============================================================
// Public javascript interface for quest scripts
var IdiomsProgressTrackerInstance = null;
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
    IdiomsProgressTrackerInstance.registerIdiom(args.id, args.title, args.meaning, explanation, hint);
}

/*
 * args : {
 *  id : String
 * }
 */
function idiomGuessed(args) {
    IdiomsProgressTrackerInstance.idiomGuessed(args.id);
}

/*
 * args : {
 *  id : String
 * }
 */
function idiomFailed(args) {
    IdiomsProgressTrackerInstance.idiomFailed(args.id);
}
