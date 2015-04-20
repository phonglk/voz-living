

define(["bg/messageHelper.bg", "lib/taffy", "lib/JobStack","FollowThread/postHelper"], function (msgHelper, TAFFY, JobStack,postHelp) {
    var timeoutId = null;
    var timeout = 60000;
//    var url = "http://localhost/search.php.@greans.php";
    var url = "http://vozforums.com/search.php"
    var storageHelper = null, F = null;
    var sound = $('<audio id="quote-sound" src="{0}"></audio>'.format(eUrl("audios/quote.mp3")))[0];
    var db = null;window.getDB = function(){return db;};
    var link = {
        subscribedThreads: "http://vozforums.com/subscription.php?do=viewsubscription"
    }

    var f_needInit = false;

    var patterns = {}

    function init() {
        var ls = storageHelper.get("taffy_followThreads_data");
        if (ls == null) {
            storageHelper.set("taffy_followThreads_data", "[]");
        }
        db = TAFFY();
        db.store("followThreads_data");
//        window.db = TAFFY();
//        window.db.store("followThreads_data");
    }

    /*
     *   To get subscribed threads
     */
    function getSubscribedThreads(callback) {
        function process(html) {
            var $html = $(html);
            var form = $html.find("form[action*='subscription.php?do=dostuff']");
            if (form.length == 0) {
                if ($html.find("*:contains('You are not logged in or you do not have permission to access this page')").length > 0) {
//                    NO LOGIN
                }
                return false;
            }
            var result = [];
            var subRows = form.find("table tr:not(:has(td.thead,td.tfoot,td.tcat))");
            if (subRows.length > 0) {

                subRows.each(function () {
                    var $this = $(this);
                    var thread = {};
                    thread.id = (function getThreadId(t) {
                        var a = t.find("a[href*='showthread.php?t=']").eq(0).attr("href").match(/\?t=(\d+)/)[1];
                        return a;
                    })($this)

                    thread.title = (function (t) {
                        return t.find("a[id^='thread_title']").text()
                    })($this);


                    thread.lastPage = (function (t) {
                        var nextTitle = t.find("a[id^='thread_title']").next();
                        if (nextTitle.length > 0) {
                            var lastPageLink = nextTitle.find("a:last");
                            return lastPageLink.attr("href").match(/page=(\d+)/)[1];
                        } else {
                            return 1;
                        }
                    })($this)
                    result.push(thread);
                })
            }

            //syncing
            var newResult = [];
            var oldResult = [];
            db().each(function(record){
                for(var i=0;i<result.length;i++){
                    if(result[i].id == record.id){
                        // find matched record to push into array for later process
                        oldResult.push(result[i]);
                        db(record).update(result[i]);
                        break;
                    }
                }

                if(i==result.length){
                    // if record is not found in latest result
                    // remove it
                    db(record).remove();
                }
            })

            // if there is some record which is not matched above
            // insert in into db
            var needAdds = _.difference(result,oldResult);
            db.insert(needAdds);

            return newResult;
        }


        $.ajax({
            url: link.subscribedThreads+"&t="+new Date().getTime(),
            type: "GET",
            success: function (html) {
                CatchRequest.do(html)
                var data = process(html);
                callback.call(this, data);
            },
            error: function () {
                console.log("request getSubscribedThreads failed");
                recall();
            }
        })
    }

    /*
     * To compare and sync to the localstorage
     * @data array of data
     */
    function compareAndSync(data) {
        for (var i = 0; i < data.length; i++) {
            var thread = data[i];
            var query = db({id: thread.id});
            if (query.first() == false) {
                db.insert(thread);
            } else {
                query.update(thread);
            }
        }
        return i;
    }

    function recall() {
        timeoutId = setTimeout(_run, timeout);
    }

    function _run() {
        var stack = new JobStack.Stack({
            maxJobDoing: 1,
            callback: recall
        })

        function initThreadData() {

        }

        function initJob(thread) {
            stack.addAsyncJob(function () {
                var job = this;
                $.ajax({
                    url: "http://vozforums.com/showthread.php?t={0}&goto=newpost".format(thread.id),
                    success: function (html) {
                        CatchRequest.do(html)
                        var $html = $(html);
                        var posthelp = postHelp($html);
                        var lastViewPos = {
                            page:posthelp.getPage(),
                            post:posthelp.getLatestPost().post,
                            id:posthelp.getLatestPost().id
                        };

                        db(thread).update({lastViewPos:lastViewPos});

                        job.done();
                    },
                    error: function () {
                        console.error("Error while init job")
                        job.done();
                    }
                })


            })
        }

        function updateJob(thread) {
            stack.addAsyncJob(function () {
                var job = this;
                $.ajax({
                    url: "http://vozforums.com/showthread.php?t={0}&page={1}".format(thread.id, thread.lastPage),
                    success: function (html) {
                        var $html = $(html);
                        var hasChanged = false;
                        var posthelp = postHelp($html);
                        var latestPost = {
                            page:posthelp.getPage(),
                            post:posthelp.getLatestPost().post,
                            id:posthelp.getLatestPost().id
                        };
                        if(thread.latestPost){
                            if(_.isEqual(latestPost,thread.latestPost) == false){
                                console.info("Latest post changed ",latestPost," of topic ",thread.title);
                                hasChanged = true;
                            }
                        }else{
                            console.info("Init latest post ",latestPost," of topic ",thread.title)
                            hasChanged = true;
                        }

                        db(thread).update({latestPost:latestPost});
                        if(hasChanged)msgHelper.callFunction("followedThreadUpdated",null);

                        job.done();
                    },
                    error: function () {
                        console.error("Error while update job")
                        job.done();
                    }
                })
            })
        }

        getSubscribedThreads(function () {
            // get all subscribed threads
            db().each(function(record){
                if(typeof record.lastViewPos=="undefined"){
                    initJob(record);
                }
                updateJob(record);
            })
//            for (var i = 0; i < threads.length; i++) {
//                var thread = threads[i];
//                if (db({id: thread.id}).first() == false) {
//                    initJob(thread);
//                }
//                updateJob(thread);
//            }
            stack.run();
        })
    }


//    ------------------------------
    function getSubscribedData(){
        return {
            threads: JSON.parse(db().stringify())
        };
    }

    function updateReadPost(thread_id,post_num,post_id,page){
        db({id:thread_id}).update({lastViewPos:{id:post_id,post:post_num,page:page}});
        msgHelper.callFunction("followedThreadUpdated",null);
    }

    var run = function (xlocalStorage, xF) {
        storageHelper = xlocalStorage;
        F = xF;
        init();
        _run();

        F.getSubscribedData = getSubscribedData;
        F.updateReadPost = updateReadPost;
    }

    return {
        run: run
    }
})