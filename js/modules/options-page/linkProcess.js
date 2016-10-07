define(["bg/localStorage.bg","settings"], function (localStorage,settings) {
    var S = new settings.BGSettingContext("LinkProcess");
    var data = {
        friendlyName:"Xử lý link trong nội dung bài viết",
        enableYoutubeProcess:ko.observable(JSON.parse(S.get("enableYoutubeProcess"))),
        enableImageLinkProcess:ko.observable(JSON.parse(S.get("enableImageLinkProcess")))
    }
    data.enableYoutubeProcess.subscribe(function(newValue){
        S.set("enableYoutubeProcess", newValue);
    });

    data.enableImageLinkProcess.subscribe(function(newValue){
        S.set("enableImageLinkProcess", newValue);
    });

    return {
        templates: {
            "main": '\
        <div class="well widget words">\
            <div class="widget-header ">\
            <h3 class="title" data-bind="text: friendlyName"></h3>\
            </div>\
            <form class="form-horizontal">\
                <div class="control-group">\
                <label class="control-label">Tự động hiện youtube player</label>\
                \
                <div class="controls">\
                    <input type="checkbox"\
                    data-bind="checked: enableYoutubeProcess">\
                    </div>\
                </div>\
                <div class="control-group">\
                <label class="control-label">Tự động hiện hình ảnh</label>\
                \
                <div class="controls">\
                    <input type="checkbox"\
                    data-bind="checked: enableImageLinkProcess">\
                    </div>\
                </div>\
            </form>\
        </div>\
        '
        },
        template: "main",
        data: data
    }
})