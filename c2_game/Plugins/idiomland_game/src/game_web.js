// === CONFIGURE THE REPLAYS ===
var REPLAY_CLIENT_CONFIG = {
    SERVER_URL : "http://idiomland.com:20322"
};

// === START THE GAME ===
QuestGame.bootstrap({
    game : { 
        className : 'IdiomLandGame',
        name : 'IdiomLand quest 1',
        params : []
    },

    persistentStorage : {
        className : 'HTML5PersistentStorage',
        params : ['"game2"']
    },

    levelReplayLoader : {
        className : 'WebDOMLocalFSLevelReplayLoader',
        params : []
    },

    levelLoader : { 
        className : 'IdiomLandLevelLoader',
        params : ["new QuestScriptLoader(new AjaxTextFileLoader(''))"]
    },

    textFileLoader : {
        className : 'AjaxTextFileLoader',
        params : ['']
    }
});
