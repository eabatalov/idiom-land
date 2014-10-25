/*
 * name : string
 * questions : [TestDialogQuestion]
 */
function TestDialogSituation(name, idiomId, questions) {
    this.name = name;
    this.idiomId = idiomId;
    this.questions = questions;
}

TestDialogSituation.prototype.getName = function() {
    return this.name;
};

TestDialogSituation.prototype.getQuestions = function() {
    return this.questions;
};

TestDialogSituation.prototype.getIdiomId = function() {
    return this.idiomId;
};

TestDialogSituation.prototype.save = function() {
    var questionsSaved = jQuery.map(this.questions,
        function(question) {
            return question.save();
         }
    );

    var savedData = {
        "name" : this.name,
        "idiomId" : this.idiomId,
        "questions" : questionsSaved
    };
    return savedData;
};

TestDialogSituation.load = function(savedData) {
    var name = savedData["name"];
    var idiomId = savedData["idiomId"];
    var questions = jQuery.map(savedData["questions"],
        function(questionSaved) {
            return TestDialogQuestion.load(questionSaved);    
        }
    );
    return new TestDialogSituation(name, idiomId, questions);
};
