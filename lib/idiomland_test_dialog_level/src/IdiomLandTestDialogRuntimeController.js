function IdiomLandTestDialogRuntimeController(dialogName,
    isDebugMode, onReadyCb) {
    //All scripts are preloaded in quest dialog repo -
    //no need to load and wait
    var repo = IdiomLandGame.instance.getTestDialogScriptRepo();
    var runtime = new IdiomLandTestDialogRuntime(
        repo.getDialogScript(dialogName), isDebugMode);

    TestDialogRuntimeController.call(this, runtime);
    if (onReadyCb) {
        onReadyCb(this);
    }
}

IdiomLandTestDialogRuntimeController.prototype =
    new TestDialogRuntimeController(null);
