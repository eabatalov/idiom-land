/*
 * name : string
 * questions : [TestDialogQuestion]
 */
function TestDialogSituation(name, questions) {
    this.name = name;
    this.questions = questions;
}

TestDialogSituation.prototype.getName = function() {
    return this.name;
};

TestDialogSituation.prototype.getQuestions = function() {
    return this.questions;
};

TestDialogSituation.prototype.save = function() {
    var questionsSaved = jQuery.map(this.questions,
        function(question) {
            return question.save();
         }
    );

    var savedData = {
        "name" : this.name,
        "questions" : questionsSaved
    };
    return savedData;
};

TestDialogSituation.load = function(savedData) {
    var name = savedData["name"];
    var questions = jQuery.map(savedData["questions"],
        function(questionSaved) {
            return TestDialogQuestion.load(questionSaved);    
        }
    );
    return new TestDialogSituation(name, questions);
};
