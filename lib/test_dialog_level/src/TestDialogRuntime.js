function TestDialogRuntime(script) {
    this._script = script;
    this._questionPerSituation = [];
    this._answerPerSituation = [];
    this._currentSituationIx = 0;

    this._computeDialog();
}

/*
 * returns current question or null.
 * if null - dialog is finished.
 */
TestDialogRuntime.prototype.getCurrentQuestion = function() {
    return this._isCurrenQuestionAvaliable() ?
        this._questionPerSituation[this._currentSituationIx] :
        null;
};

TestDialogRuntime.prototype.getCurrentQuestionSituation = function() {
    return this._isCurrenQuestionAvaliable() ?
        this._script.getSituations()[this._currentSituationIx] :
        null;
};

TestDialogRuntime.prototype.answerCurrentQuestion = function(answer) {
    if (!this._isCurrenQuestionAvaliable())
        return;

    this._answerPerSituation[this._currentSituationIx] = answer;

    //Update idiom status of current level
    var rightAnswer = this.getCurrentQuestion().getRightAnswer();
    var idiomId = this.getCurrentQuestionSituation().getIdiomId();
    var api = IdiomLandGame.instance.getIdiomLevelApi();
    var newIdiomStatus = rightAnswer === answer ?
        Idiom.STATUS.GUESSED : Idiom.STATUS.FAILED;
    api.idiomChangeStatus(idiomId, newIdiomStatus);
};

TestDialogRuntime.prototype.nextQuestion = function() {
    if (!this._isCurrenQuestionAvaliable())
        return;

    this._currentSituationIx++;
};

TestDialogRuntime.prototype._computeDialog = function() {
    var situations = this._script.getSituations();
    for (var sitIx = 0; sitIx < situations.length; ++ sitIx) {
        var situation = situations[sitIx];
        var sitQuestions  = situation.getQuestions();
        var randSitQuestionIx = getRandomInt(0, sitQuestions.length - 1);
        var randSitQuestion = sitQuestions[randSitQuestionIx];
        this._questionPerSituation.push(randSitQuestion);
        this._answerPerSituation.push(undefined);
    }
};

TestDialogRuntime.prototype._isCurrenQuestionAvaliable = function() {
    return (this._currentSituationIx >= 0) &&
        (this._currentSituationIx < this._questionPerSituation.length);
};
