//TODO:Stop quote in bg when turn off
//TODO: option to off notification
define(["../ContentBar", "bgHelper","checkLogin"], function (contentBar, bgHelper,checkLogin) {
    var barButton = ("<div data-bind='template:{name:\"quoteNotification_barButton\"}'></div>"),
        containerTpl = ("<div class='Noti5-QuoteList data-list' data-bind='template:{name:\"quoteNotification_item\",foreach:quotes, as: \"quote\"}'>" +
            "</div>");
    var barButtonTemplate = "<span class='icon-comment'></span>" +
        "<span class='badge badge-mini' data-bind='text: unseenCount'></span>";
    var quoteItemTemplate = "<div class='Noti5-QuoteItem data-item'>" +
        "<strong><a data-bind='attr:{href:\"showthread.php?t=\"+thread.id}'><i class='icon-th-list icon-white'></i><span data-bind='text:thread.title'></span></a></strong>" +
        "&nbsp;&nbsp;&nbsp;" +
        "<span class='label label-primary' style=''><a data-bind='attr:{href:\"member.php?u=\"+author.userid}'><i class='icon-user icon-white'></i><span data-bind='text: author.username'></span></a> : </span>  " +
        "<span style='font-style:italic;text-decoration:underline'>" +
        "<a data-bind='text: post.content,attr:{href:\"showthread.php?p={0}#post{0}\".format(post.id)}'></a></span>" +
        "" +
        "</div>"
    var barItem = null;
    var sound = null;
    var qO = {
        quotes: ko.observableArray([])
    };
    qO.unseenCount = ko.computed(function () {
        var count = 0;
        var qs = qO.quotes();
        for (var i = 0; i < qs.length; i++) {
            if(qs[i].hasSeen() == false) count++;
        }
        return count;
    })


    function updateQuotes(qo) { // from fresh data
        qO.quotes.removeAll();
        console.log(qo)
        for (var i = 0; i < qo.quotes.length; i++) {
            var quote = qo.quotes[i];
            quote.hasSeen = ko.observable(quote.hasSeen);
            quote.hasRead = ko.observable(quote.hasRead);
            qO.quotes.push(quote);
        }
        return i;
    }

    function updateQuotesToStorage(){
//Update to localstorage
        var updates = [];
        var quotes = qO.quotes();
        for (var i = 0; i < quotes.length; i++) {
            var quote = quotes[i];
            var update = {
                post:{
                    id:quote.post.id
                },
                hasSeen: quote.hasSeen(),
                hasRead: quote.hasRead()
            }
            updates.push(update)
        }
        bgHelper.callFunction("updateQuotes",[updates]);
    }

    return {
        name: "quoteNotification",
        friendlyName: "Quote Notification",
        settings: {
            active: {
                text: "Kích hoạt"
            }
        },
        init: function () {
            var username = $("*:contains('You last') > *:contains('Welcome') > a[href*='member.php?u']").eq(0).text();
            if(checkLogin.isLogged() == false)return false;
            new Function($("script:not([src]):contains('SECURITYTOKEN')").text().replace('SECURITYTOKEN', 'SECURITYTOKEN=window.SECURITYTOKEN')).call(window)
            var token = SECURITYTOKEN;
            bgHelper.callFunction("setUsernameAndSToken", [username, token]);
            return true;
        },
        run: function () {
            if(checkLogin.isLogged() == false)return false;
            barItem = contentBar.addBarItem({
                id: "quoteNotification_bar",
                barButton: {
                    template: "quoteNotification_barButton"
                },
                templates: {
                    "quoteNotification_container": containerTpl,
                    "quoteNotification_item": quoteItemTemplate,
                    "quoteNotification_barButton": barButtonTemplate
                },
                container: {
                    template: "quoteNotification_container",
                    data: qO
                },
                event: {
                    init: function () {

                    },
                    open: function () {
                        var qs = qO.quotes();
                        for(var i=0;i<qs.length;i++){
                            qs[i].hasSeen(true);
                        }
                        updateQuotesToStorage();
                    },
                    close: function () {

                    }
                }
            })

            addContentListener("updateQuotes", function updateQuotesListener(qo){
                updateQuotes(qo);
            })

            bgHelper.callFunction("getQuotes", null, function (qo) {
                updateQuotes(qo)
            })

            // Sound embedding



        }
    }
})
