define(["util/EventManager",
    "bgHelper"
],function (EventManager,bgHelper) {


    function run() {
        CatchRequest.events = new EventManager();
        CatchRequest.events.subscribe("onDo",function(){
            try {
                var token = this.html.match(/SECURITYTOKEN.*/)[0].split("\"")[1]
                bgHelper.callFunction("setItemInEStorage", ["securitytoken", token]);
            } catch (e) {
                console.error("Error while catch SecTok", e.message, e)
            }
        })

        try{
            new Function($("script:not([src]):contains('SECURITYTOKEN')").text().replace('SECURITYTOKEN', 'SECURITYTOKEN=window.SECURITYTOKEN')).call(window)
            var token = SECURITYTOKEN;

        }catch(e){
            console.error("Error while catch SecTok", e.message, e)
        }

        var aUser = $("*:contains('You last') > *:contains('Welcome') > a[href*='member.php?u']").eq(0);
        var userId = aUser.attr("href").match(/\d+/)[0];
        var userName = aUser.text();
        bgHelper.callFunction("setItemInEStorage", ["username", userName]);
        bgHelper.callFunction("setItemInEStorage", ["userid", userId]);
    }

    return{
        name: "CFR",
        run: run
    }
})
