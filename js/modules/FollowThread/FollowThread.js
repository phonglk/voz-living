function SubscribedThreadVM(data) {
    var self = this;

    self.id = ko.observable("");
    self.lastViewPos = {
        id:ko.observable("0"),
        page:ko.observable("0"),
        post:ko.observable("0")
    }
    self.latestPost = {
        id:ko.observable("0"),
        page:ko.observable("0"),
        post:ko.observable("0")
    }

    ko.mapping.fromJS(data, {}, self);

    self.test = ko.computed(function () {
        return true;
    })

    self.href = ko.computed(function(){
        return "/showthread.php?t={0}&page={1}#post{2}".format(self.id(),self.lastViewPos.page(),self.lastViewPos.id());
    })

    self.unreadPost = ko.computed(function(){
        return (parseInt(self.latestPost.page())-parseInt(self.lastViewPos.page()))*10 + (parseInt(self.latestPost.post())-parseInt(self.lastViewPos.post()));
    })
}
function SubscriptionListVM(data) {
    var self = this;

    var mappingOption = {
        'threads': {
            create: function (options) {
                return new SubscribedThreadVM(options.data);
            }
        }
    }

    self.update = function (data) {
        console.info("Update data");
        ko.mapping.fromJS(data, mappingOption, self);
    }

    if (data) {
        self.update(data);
    }
}


define(["../ContentBar", "bgHelper", "checkLogin","lib/jquery.inview","FollowThread/postHelper","MonitorReadingPost"],
    function (contentBar, bgHelper, checkLogin,jinview,postHelper,MRP) {

    var containerTpl = "<div id='SubscriptionList' class='data-list' " +
        "data-bind='template:{name:\"followthread_item\",foreach:threads,as:\"thread\"}'></div>";
    var barButtonTemplate = "<span class='icon-th-list'></span>" +
        "<span class='badge badge-mini'></span>";
    var quoteItemTemplate = "<div class='SubscriptionItem data-item'>" +
        "<strong>" +
        "<a data-bind='attr:{href:thread.href}'><i class='icon-th-list icon-white'></i><span data-bind='text:thread.title'></span></a></strong>" +
        "<br/><span class='icon-play'></span>(Có <span data-bind='text:thread.unreadPost'></span> bài mới)" +
        "</div>"
    var barItem = null;
    var viewmodel = new SubscriptionListVM({threads:[{title:'test'}]});

    var timeout_update = 0;
    var timeout_updatePostRead = 0;
    function updateData(callback){
        bgHelper.callFunction("getSubscribedData", null, function (data) {
            viewmodel.update(data);
            callback.call();
        })
    }

    function monitorPostRead(){
        var thread_id = postHelper($(document.body)).getThreadId();
        _.each(viewmodel.threads(),function(thread,k,l){
            if(thread_id == thread.id()){
                MRP.subscribe("onEachPostView",function(){
                    var post = this;
                    if(parseInt(thread.lastViewPos.page()) > parseInt(this.page)){
                        return false;
                    }else if(parseInt(thread.lastViewPos.page()) == parseInt(this.page) &&
                        parseInt(thread.lastViewPos.post()) >= parseInt(this.post_num)){
                        return false;
                    }

                    if((this.view.Y == "both" || this.view.Y == "bottom")){
                        clearTimeout(timeout_updatePostRead);
                        timeout_updatePostRead= setTimeout(function(){
                            bgHelper.callFunction("updateReadPost",[post.thread_id,post.post_num,post.post_id,post.page]);
                        },200)
                    }
                })
                return;
            }
        })
    }

    return {
        name: "FollowThread",
        friendlyName: "Follow Thread",
        settings: {
            active: {
                text: "Kích hoạt"
            }
        },
        init: function () {
            updateData(function(){
                monitorPostRead();
            })
            return true;
        },
        run: function () {

            if (checkLogin.isLogged() == false)return false;

            barItem = contentBar.addBarItem({
                id: "followthread_bar",
                barButton: {
                    template: "followthread_barButton"
                },
                templates: {
                    followthread_container: containerTpl,
                    followthread_item: quoteItemTemplate,
                    followthread_barButton: barButtonTemplate
                },
                container: {
                    template: "followthread_container",
                    data: viewmodel
                }
            })

            addContentListener("followedThreadUpdated",function(){
                clearTimeout(timeout_update);
                timeout_update = setTimeout(updateData,500);
            })
        }
    }
})