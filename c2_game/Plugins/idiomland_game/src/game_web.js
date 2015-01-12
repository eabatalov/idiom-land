// === Yandex.Metrika counter ===
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter25287059 = new Ya.Metrika({id:25287059,
                webvisor:true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");

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
