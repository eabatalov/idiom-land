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
    },

    levelReplaySaver : {
        //className : 'AjaxServerLevelReplaySaver',
        className : 'AjaxServerLevelReplaySaverOnAbnormalExit',
        params : ["'http://idiomland.com/replay_save.php'"]
    },

    levelReplayLoader : {
        className : 'WebDOMLocalFSLevelReplayLoader',
        params : []
    }
});
