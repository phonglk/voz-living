define(["bg/localStorage.bg","settings"], function (localStorage,settings) {
    var S = new settings.BGSettingContext("HotLinks");
    var data = {
        friendlyName:"Truy cập nhanh",
        quickLinks:ko.observable(S.get("quickLinks"))
    }
    data.quickLinks.subscribe(function(newValue){
        S.set("quickLinks", newValue);
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
                <label class="control-label">Danh sách Id của thớt muốn đưa lên top (được phân cách bởi dấu phẩy)</label>\
                \
                <div class="controls">\
                    <input type="text"\
                    data-bind="value: quickLinks">\
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