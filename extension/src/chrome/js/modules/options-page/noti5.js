define(["bg/localStorage.bg","settings"], function (localStorage,settings) {
    var settingContext = new settings.BGSettingContext("quoteNotification");
    var data = {
        friendlyName:"Theo dõi trích dẫn",
        isActive:ko.observable(true),
        isDesktopNotification:ko.observable(JSON.parse(settingContext.get("desktopNotification")))
    }

    data.isActive(JSON.parse(localStorage.get("quoteNotification_active")));
    data.isActive.subscribe(function(newValue){
        localStorage.set("quoteNotification_active",newValue);
    })
    data.isDesktopNotification.subscribe(function(newValue){
        settingContext.set("desktopNotification",newValue);
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
                <label class="control-label">Hiện thông báo kèm âm thanh ở góc</label>\
                \
                <div class="controls">\
                    <input type="checkbox"\
                    data-bind="checked: isDesktopNotification">\
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