/*
 * text : string
 * rightAnswer : boolean
 */
function TestDialogQuestion(text, rightAnswer) {
    this.text = text;
    this.rightAnswer = rightAnswer;
}

TestDialogQuestion.prototype.getText = function() {
    return this.text;
};

TestDialogQuestion.prototype.getRightAnswer = function() {
    return this.rightAnswer;
};

TestDialogQuestion.prototype.save = function() {
    /*
     * Human written files contain list of strings as text.
     * Lists allow to make good human readable formating in json files.
     */
    var savedData = {
        "text" : [this.text],
        "rightAnswer" : this.rightAnswer
    };
    return savedData;
};

TestDialogQuestion.load = function(savedData) {
    var text = savedData["text"].join("");
    var rightAnswer = savedData["rightAnswer"];
    return new TestDialogQuestion(text, rightAnswer);
};
