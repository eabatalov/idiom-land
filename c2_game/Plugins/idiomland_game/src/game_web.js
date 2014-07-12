function IdiomLandQuestGame(name, levelRepo, persistentStorage, inAppPurchaseProvider) {
    QuestGame.call(this, name, levelRepo, persistentStorage, inAppPurchaseProvider);
};

IdiomLandQuestGame.prototype = QuestGame.prototype;
IdiomLandQuestGame.prototype.constructor = IdiomLandQuestGame;

/*
 * "Inherit" base game class methods
 */
IdiomLandQuestGame.magic = "Zee7Zo";
IdiomLandQuestGame.newGame = QuestGame.newGame;
IdiomLandQuestGame.load = QuestGame.load;

QuestGame.bootstrap({   
    game : { 
        className : 'IdiomLandQuestGame',
        name : 'IdiomLand quest 1',
        params : []
    },

    persistentStorage : {
        className : 'HTML5PersistentStorage',
        params : []
    },

    levelLoader : { 
        className : 'QuestLevelLoader',
        params : ["new AjaxQuestScriptLoader('')"]
    }
});
