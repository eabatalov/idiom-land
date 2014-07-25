function IdiomLevelApi(idiomLandGame) {
    this.level = null;

    idiomLandGame.events.levelChanged.subscribe(this, function(questLevelRuntime) {
        this.setLevel(questLevelRuntime.getLevel());
    });
}

IdiomLevelApi.prototype.setLevel = function(level) {
    this.level = level;
};

IdiomLevelApi.prototype.regIdiom = function(id, title, meaning, explanation, hint) {
    assert(this.level);
    var idiom = new Idiom(id, title, meaning, explanation, hint);
    this.level.regIdiom(idiom);
};

IdiomLevelApi.prototype.idiomChangeStatus = function(idiomId, newStatus) {
    assert(this.level);
    this.level.getIdiomById(idiomId).setStatus(newStatus);
};

//===============================================================
// Public javascript interface for quest scripts
/*
 * args : {
 *  id : String,
 *  title : String,
 *  meaning: String,
 *  hint: String (optional)
 *  explanation: String (optional)
 * }
 */
function idiomRegister(args) {
    var explanation = args.explanation || "";
    var hint = args.hint || "";

    var api = IdiomLandGame.instance.getIdiomLevelApi();
    api.regIdiom(args.id, args.title, args.meaning, explanation, hint);
}

/*
 * args : {
 *  id : String
 * }
 */
function idiomGuessed(args) {
    var api = IdiomLandGame.instance.getIdiomLevelApi();
    api.idiomChangeStatus(args.id, Idiom.STATUS.GUESSED);
}

/*
 * args : {
 *  id : String
 * }
 */
function idiomFailed(args) {
    var api = IdiomLandGame.instance.getIdiomLevelApi();
    api.idiomChangeStatus(args.id, Idiom.STATUS.FAILED);
}
