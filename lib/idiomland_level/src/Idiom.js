function Idiom(idiomId, title, shortMeaning, longExplanation, hint) {
    this.idiomId = idiomId;
    this.title = title;
    this.shortMeaning = shortMeaning;
    this.longExplanation = longExplanation || "";
    this.hint = hint || "";
    this.events = {
        statusChanged : new SEEvent(/* this idiom */) 
    };
    //mutables
    this.status = Idiom.STATUS.IGNORED;
}

Idiom.STATUS = {
    IGNORED: 'IGNORED',
    GUESSED: 'GUESSED',
    FAILED: 'FAILED'
};

Idiom.prototype.getId = function() {
    return this.idiomId;
};

Idiom.prototype.getTitle = function() {
    return this.title;
};

Idiom.prototype.getMeaning = function() {
    return this.shortMeaning;
};

Idiom.prototype.getExplanation = function() {
    return this.longExplanation;
};

Idiom.prototype.getHint = function() {
    return this.hint;
};

Idiom.prototype.getStatus = function() {
    return this.status;
};

Idiom.prototype.setStatus = function(status) {
    var oldStatus = this.status;
    this.status = status;
    if (oldStatus !== this.status) {
        this.events.statusChanged.publish(this);
    }
};
