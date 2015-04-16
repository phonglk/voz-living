define(function ($html) {
    return function ($html) {
        return{
            getThreadId:function(){

                var thread_id = $html.find("#threadtools_menu a[href*='t=']:eq(0)").attr("href").match(/t=(\d+)/);
                if(thread_id != null && thread_id.length > 0){
                    return thread_id[1];
                }else{
                    return -1;
                }
            },
            getPage: function () {
                var page;
                var $pageNav = $html.find(".pagenav");
                if ($pageNav.length == 0) {
                    page = 1;
                } else {
                    page = $pageNav.eq(0).find("tbody td.alt2 strong").text()
                }
                return page;
            },
            getLatestPost: function () {
                var id, post;
                var lastpost = $html.find("table[id^='post']:last");
                id = lastpost.attr("id").match(/(\d+)/)[1]

                var post = $html.find("table[id^='post']").length -1;
                return {
                    post: post,
                    id: id
                }
            },
            getPostId: function (num) {
                var id, post;
                var lastpost = $html.find("table[id^='post']").eq(num);
                id = lastpost.attr("id").match(/(\d+)/)[1]
                return id;
            }
        }
    }
})