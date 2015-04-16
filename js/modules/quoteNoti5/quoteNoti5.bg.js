define(["bg/messageHelper.bg", "settings"], function (msgHelper, settings) {
    var timeoutId = null;
    var timeout = 10000;
    var settingContext = new settings.BGSettingContext("quoteNotification")
//    var url = "http://localhost/search.php.@greans.php";
    var url = "http://vozforums.com/search.php"
    var localStorage = null, F = null;
    var formData = {
        do: "process",
        quicksearch: 1,
        childforums: 1,
        exactname: 1,
        securitytoken: null,
        query: null,
        showposts: 1
    }

    function setUnT(username, token) {
        localStorage.set("username", username);
        localStorage.set("isLogin", "true");
        localStorage.set("securitytoken", token);
    }

    function setT(token) {
        localStorage.set("securitytoken", token);
    }

    function getQuotes() {
        var quotes = localStorage.get("noti5_quotes")

        if (quotes == null) quotes = "[]";
        quotes = JSON.parse(quotes);

        var data = {
            quotes: quotes,
            length: quotes.length
        }

        return data;
    }

    function updateQuotes(quotes) {
        var stQuotes = JSON.parse(localStorage.get("noti5_quotes"));
        for (var i = 0; i < quotes.length; i++) {
            for (var j = 0; j < stQuotes.length; j++) {
                if (stQuotes[j].post.id == quotes[i].post.id) {
                    stQuotes[j] = $.extend(true, {}, stQuotes[j], quotes[i]);
                    break;
                }
            }
        }
        localStorage.set("noti5_quotes", JSON.stringify(stQuotes));
        return stQuotes.length;
    }

    function checksave(data) {
        var hasChanged = false;
        var oldQuotes = JSON.parse(localStorage.get("noti5_quotes"));

        if (oldQuotes != null) {
            for (var i = 0; i < data.length; i++) {
                var quote = data[i];
                for (var j = 0; j < oldQuotes.length; j++) { // compare to all old storage quote
                    var oldQuote = oldQuotes[j]; // reference one
                    if (quote.post.id == oldQuote.post.id) { // if same post id.
                        data[i] = $.extend({}, oldQuote); //copy old to new
                        break; // break the loop
                    }
                }
//            if there is new quote, flag hasChange
                if (j == oldQuotes.length) {
                    hasChanged = true;
//                    TODO: do notification helper class
                    if (JSON.parse(settingContext.get("desktopNotification")) == true) {
                        // var notification = Notifications.createNotification(
                        //     '/icos/64.png',  // icon url - can be relative
                        //     'Trích dẫn trong thớt ' + quote.thread.title,  // notification title
                        //     '@{0}: {1}\n >>>>>Bạn vui lòng vô voz để xem'.format(quote.author.username, quote.post.content)  // notification body text
                        // );
                        // notification.show();
                        // $('<audio id="quote-sound" src="{0}"></audio>'.format(eUrl("audios/quote.mp3")))
                        //
                        // setTimeout(function () {
                        //     notification.cancel();
                        // }, 3000)
                    }
                }
            }
        } else {
            hasChanged = true;
        }

        if (hasChanged) { // Only save to localstorage if there is changes.
            console.log("Quotes have changed", data)
            localStorage.set("noti5_quotes", JSON.stringify(data));
            msgHelper.callFunction("updateQuotes", getQuotes());


        }
    }

    function process(html) {
        if (localStorage.get("noti5_quotes") == "false") {
            localStorage.set("noti5_quotes", "[]")
        }

        var $html, $threads_link, data;

        $html = $(html);
        data = [];

        $threads_link = $html.find("td > div > a[href^='showthread']");

        if ($threads_link.length === 0) {
            return data;
        }

        $threads_link.each(function () {
            var $pexcerpt, $post_link, $this, $user_a, datemod, dateoffset, datestr, datetime, now, pDateTime, pPost, pUser, pWhere, pexcerpt, pid, ptitle, sDatetime, sDatetime_es, tid, ttitle, uid, username;
            try {
                $this = $(this);
                tid = $this.attr("href").match(/t=(\d+)/)[1];
                ttitle = $this.text();
                $post_link = $this.parents("td:eq(0)").find(" > div > div  a[href^='showthread'][href*='p=']");
                pid = $post_link.attr("href").match(/p=(\d+)/)[1];
                ptitle = $post_link.text();
                $pexcerpt = $post_link.parent();
                $post_link.remove();
                pexcerpt = $pexcerpt.text().trim();
                $user_a = $this.parents("td:eq(0)").find(" > div > a[href^='member'] ");
                username = $user_a.text();
                uid = $user_a.attr("href").match(/u=(\d+)/)[1];
                sDatetime = $this.parents("tbody:eq(0)").find(" > tr:eq(0) td").contents().last().text().trim();
                sDatetime_es = sDatetime.split(/[-,:]/);
                if (sDatetime_es.length === 3) {
                    datestr = ['today', 'yesterday'];
                    dateoffset = datestr.indexOf(sDatetime_es[0].toLowerCase());
                    if (dateoffset > -1) {
                        now = new Date();
                        datemod = now.getDate() - dateoffset;
                        datetime = new Date(parseInt(now.getFullYear()), now.getMonth(), datemod, parseInt(sDatetime_es[1]), parseInt(sDatetime_es[2]), 0);
                    }
                } else {
                    datetime = new Date(parseInt(sDatetime_es[2]), parseInt(sDatetime_es[1] - 1), parseInt(sDatetime_es[0]), parseInt(sDatetime_es[3]), parseInt(sDatetime_es[4]), 0);
                }
//                pUser = new User(username, parseInt(uid));
//                pWhere = new Thread(ttitle, parseInt(tid));
//                pPost = new Post(ptitle, parseInt(pid), pexcerpt);
//                pDateTime = datetime;
                data.push({
                    author: {
                        username: username,
                        userid: uid
                    },
                    thread: {
                        title: ttitle,
                        id: tid
                    },
                    post: {
                        title: ptitle,
                        id: pid,
                        content: pexcerpt,
                        datetime: datetime
                    },
                    hasRead: false,
                    hasSeen: false
                })
//                return _manager.createQuote(pUser, pWhere, pPost, pDateTime);
            } catch (e) {
                debugger;
            }
        });
        return data;
    }

    function recall() {
        timeoutId = setTimeout(_run, timeout);
    }

    function _run() {
        var username = localStorage.get("username");
        var token = localStorage.get("securitytoken");

        if (username != null && token != null) {
            var cpFD = $.extend({}, formData);
            cpFD.securitytoken = token;
            cpFD.query = username;
            $.ajax({
                url: url,
                type: "POST",
                data: cpFD,
                success: function (html) {
                    var data = process(html);
                    checksave(data);
                    recall();
                },
                error: function () {
                    console.log("request quotes failed");
                    recall();
                }
            })
        } else {
            recall();
        }
    }


    var run = function (xlocalStorage, xF) {
        localStorage = xlocalStorage;
        F = xF;
        _run();

        F.setUsernameAndSToken = setUnT;
        F.setSToken = setT;
        F.getQuotes = getQuotes;
        F.setIsLogin = function (iL) {
            localStorage.set("isLogin", new String(iL))
        };
        F.updateQuotes = updateQuotes;
    }

    return {
        run: run
    }
})
