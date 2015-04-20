define(["util/EventManager", "lib/jquery.inview", "FollowThread/postHelper"], function (EventManager, jinview, postHelper) {
    var Events = new EventManager();
    Events.subscribe("onEachPost",function(){
        if(this.view.isInView){
            Events.notify("onEachPostView",this);
        }else{
            Events.notify("onEachPostUnview",this)
        }
    })

    if (/\/showthread\.php/.test(location.href)) {
        var thread_id = postHelper($(document.body)).getThreadId();
        if (thread_id > 0) {
            $("table[id^='post']").bind("inview", function (e, isInView, X, Y) {
                var $this = $(this);
                var post_id = $this.attr("id").match(/(\d+)/)[1];
                var post = $("table[id^='post']").index($this);
                var page = postHelper($(document.body)).getPage();
                Events.notify("onEachPost",{
                    thread_id:thread_id,
                    post_id : post_id,
                    post_num : post,
                    page : page,
                    $j: $this,
                    view:{
                        e:e,
                        isInView:isInView,
                        X:X,
                        Y:Y
                    }
                })
            })
        }
    }

    return Events;
})