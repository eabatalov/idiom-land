function IdiomLandTestDialogRuntime(script, isDebugMode) {
    TestDialogRuntime.call(this, script, isDebugMode);
}

IdiomLandTestDialogRuntime.prototype = new TestDialogRuntime(null);

IdiomLandTestDialogRuntime.prototype.answerCurrentQuestion =
function(answer) {
    var isAnswerRight = TestDialogRuntime.prototype
        .answerCurrentQuestion.call(this, answer);
    //idiom status change
    var idiomId = this.getCurrentQuestionSection().getPolyProp("idiomId");
    var api = IdiomLandGame.instance.getIdiomLevelApi();
    var newIdiomStatus = isAnswerRight ?
        Idiom.STATUS.GUESSED : Idiom.STATUS.FAILED;
    api.idiomChangeStatus(idiomId, newIdiomStatus);

    return isAnswerRight;
};
