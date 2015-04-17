define(["bg/localStorage.bg","settings"], function (localStorage,settings) {
    var S = new settings.BGSettingContext("removeAds");
    var data = {
        friendlyName:"Xóa quảng cáo",
        isFSActive:ko.observable(JSON.parse(S.get("fullSize")))
    }
    data.isFSActive.subscribe(function(newValue){
        S.set("fullSize",newValue);
    })

    return {
        templates: {
            "main": '\
        <div class="well widget words">\
            <div class="widget-header ">\
            <h3 class="title" data-bind="text: friendlyName"></h3>\
            </div>\
            <form class="form-horizontal">\
                <div class="control-group">\
                <label class="control-label">Mở rộng toàn màn hình</label>\
                \
                <div class="controls">\
                    <input type="checkbox"\
                    data-bind="checked: isFSActive">\
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