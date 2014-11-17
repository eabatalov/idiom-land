function IdiomLandTestDialogRuntimeController(dialogName, isDebugMode) {
    //All scripts are preloaded in quest dialog repo -
    //no need to load and wait
    var repo = IdiomLandGame.instance.getTestDialogScriptRepo();
    var runtime = new IdiomLandTestDialogRuntime(
        repo.getDialogScript(dialogName), isDebugMode);

    TestDialogRuntimeController.call(this, runtime);
}

IdiomLandTestDialogRuntimeController.prototype =
    new TestDialogRuntimeController(null);
