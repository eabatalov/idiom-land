function TestDialogRuntimeController(testDialogiScriptName) {
    //All scripts are preloaded in quest dialog repo -
    //no need to load and wait
    var repo = IdiomLandGame.instance.getTestDialogScriptRepo();
    this._runtime = new TestDialogRuntime(repo.getDialogScript(testDialogiScriptName));
    this.events = {
        onQuestionIsAvaliable : new SEEvent(),
        onTestCompleted : new SEEvent()
    };
}

TestDialogRuntimeController.prototype.getCurrentQuestionText = function() {
    return this._runtime.getCurrentQuestion().getText();
};

TestDialogRuntimeController.prototype.getCurrentQuestionSituationName = function() {
    return this._runtime.getCurrentQuestionSituation().getName();
};

TestDialogRuntimeController.prototype.isTestSucceeded = function() {
    return this._runtime.isTestSucceeded();
};

TestDialogRuntimeController.prototype.answerCurrentQuestion = function(answer) {
    var boolAnswer = false;
    switch (answer) {
        case "TRUE":
            boolAnswer = true;
        break;
        case "FALSE":
            boolAnswer = false;
        break;
        default:
            throw new Error("Invalid answer value: " + answer);
    };
    this._runtime.answerCurrentQuestion(boolAnswer);
    this._runtime.nextQuestion();
    if (this._runtime.getCurrentQuestion() === null) {
        this.events.onTestCompleted.publish();
    } else {
        this.events.onQuestionIsAvaliable.publish();
    }
}
