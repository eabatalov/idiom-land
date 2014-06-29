function IdiomProgressEntry(id) {
    this.id = id;
    this.title = "";
    this.shortMeaning = "";
    this.longExplanation = "";
    this.status = IdiomsProgressEntry.statuses.ignored;
}

IdiomsProgressEntry.statuses = {
    ignored: 'IGNORED',
    guessed: 'GUESSED',
    failed: 'FAILED'
};

IdiomsProgressEntry.prototype.getId = function() {
    return this.id;
};

IdiomsProgressEntry.prototype.getTitle = function() {
    return this.title;
};

IdiomsProgressEntry.prototype.setTitle = function(title) {
    this.title = title;
};

IdiomsProgressEntry.prototype.getMeaning = function() {
    return this.shortMeaning;
};

IdiomsProgressEntry.prototype.setMeaning = function(meaning) {
    this.shortMeaning = meaning;
};

IdiomsProgressEntry.prototype.getExplanation = function() {
    return this.longExplanation;
};

IdiomsProgressEntry.prototype.setExplanation = function(explanation) {
    this.longExplanation = explanation;
};

IdiomsProgressEntry.prototype.getStatus = function() {
    return this.status;
};

IdiomsProgressEntry.prototype.setStatus = function(status) {
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

IdiomsProgressTracker.prototype.getGuessedIdiomsCount = function() {
    var count = 0;
    jQuery.each(this.idiomProgressEntries, function(ix. idiom) {
        if (idiom.getStatus() === IdiomsProgressEntry.statuses.guessed)
        {
            ++count;
        }
    });
    return count;
};

IdiomsProgressTracker.prototype.registerIdiom = function(id, title, meaning, explanation) {
    var newIdiom = new IdiomsProgressEntry(id);
    newIdiom.setTitle(title);
    newIdiom.setMeaning(meaning);
    newIdiom.setExplanation(explanation);
    this.idiomProgressEntries.push(newIdiom);
};

IdiomsProgressEntry.prototype.idiomChangeStatus = function(id, newStatus) {
    jQuery.each(this.idiomProgressEntries, function(ix. idiom) {
        if (idiom.getId() !== id)
            return;

        idiom.setStatus(newStatus);
        return false;
    });
};

IdiomsProgressTracker.prototype.idiomGuessed = function(id) {
    this.idiomChangeStatus(id, IdiomsProgressEntry.statuses.guessed);

    if (this.events.idiomGuessed)
        this.events.idiomGuessed();
};

IdiomsProgressTracker.prototype.idiomFailed = function(id) {
    this.idiomChangeStatus(id, IdiomsProgressEntry.statuses.failed);
};

//===============================================================
// Public javascript interface for quest scripts
var IdiomsProgressTrackerInstance = null;
/*
 * args : {
 *  id : String,
 *  title : String,
 *  meaning: String,
 *  explanation: String
 * }
 */
function idiomRegister(args) {
    IdiomsProgressTrackerInstance.registerIdiom(args.id, args.title, args.meaning, args.explanation);
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
