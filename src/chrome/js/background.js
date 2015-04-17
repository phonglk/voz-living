window.F = {};
require([
    "bg/localStorage.bg",
    "bg/messageHelper.bg",
    "util/EventManager"
], function (myLocalStorage, messenger, EventManager) {

    // mapping from localStorage functions
    F.getItemInEStorage = myLocalStorage.get;
    F.setItemInEStorage = myLocalStorage.set;
    F.getItemInEStorageNDefault = myLocalStorage.getNDefault;

    F.callFunction = messenger.callFunction;

    require(["bg/modulesSetup"],function(){

    })
    require(["quoteNoti5/quoteNoti5.bg"], function (noti5) {
        noti5.run(myLocalStorage, F);
    })

    require(["FollowThread/FollowThread.bg"], function (FollowThread) {
        FollowThread.run(myLocalStorage, F);
    })

    CatchRequest.events = new EventManager();
    CatchRequest.events.subscribe("onDo", function () {
        try {
            var token = this.html.match(/SECURITYTOKEN.*/)[0].split("\"")[1]
            localStorage.setItem("securitytoken", token)
        } catch (e) {
            console.error("Error while catch SecTok", e.message, e)
        }
        try{
            if($(this.html).find("form[action='login.php?do=login']").length > 0){
                localStorage.setItem("isLogin","false");
            }else{
                localStorage.setItem("isLogin","true");
            }
        }catch(e){
            console.error("Error while catch username", e.message, e)
        }
    })
})

