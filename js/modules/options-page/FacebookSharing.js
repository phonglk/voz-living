define(["bg/localStorage.bg","settings"], function (localStorage,settings) {
    var S = new settings.BGSettingContext("FacebookSharing");
    var data = {
        friendlyName:"Share lên facebook",
        enableFacebookSharing:ko.observable(JSON.parse(S.get("enableFacebookSharing")))
    }
    data.enableFacebookSharing.subscribe(function(newValue){
        S.set("enableFacebookSharing", newValue);
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
                <label class="control-label">Kích hoạt nút share Facebook</label>\
                \
                <div class="controls">\
                    <input type="checkbox"\
                    data-bind="checked: enableFacebookSharing">\
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