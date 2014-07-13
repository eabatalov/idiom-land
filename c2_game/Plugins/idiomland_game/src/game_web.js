QuestGame.bootstrap({   
    game : { 
        className : 'IdiomLandGame',
        name : 'IdiomLand quest 1',
        params : []
    },

    persistentStorage : {
        className : 'HTML5PersistentStorage',
        params : []
    },

    levelLoader : { 
        className : 'IdiomLandLevelLoader',
        params : ["new AjaxQuestScriptLoader('')"]
    }
});
