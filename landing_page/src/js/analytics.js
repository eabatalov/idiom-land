<!-- Google analytics -->
function initGoogleAnalytics() {
    (function (i, s, o, g, r, a, m) {
        console.log("Init google analytics");
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-51937823-1', 'idiomland.com');
    ga('send', 'pageview');
}

<!-- Yandex.Metrika counter -->
function initYandexMetrica() {
    (function (d, w, c) {
        console.log("Init yandex metrics");
        (w[c] = w[c] || []).push(function () {
            try {
                w.yaCounter25287059 = new Ya.Metrika({id: 25287059, webvisor: true, clickmap: true, trackLinks: true, accurateTrackBounce: true});
            } catch (e) {
            }
        });
        var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () {
            n.parentNode.insertBefore(s, n);
        };
        s.type = "text/javascript";
        s.async = true;
        s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";
        if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
        } else {
            f();
        }
    })(document, window, "yandex_metrika_callbacks");
}

jQuery(window).load(function() {
    nonBlockingScript("initGoogleAnalytics();");
    nonBlockingScript("initYandexMetrica();");
});
