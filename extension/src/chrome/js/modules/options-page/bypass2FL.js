define(["bg/localStorage.bg","settings"], function (localStorage,settings) {
    var S = new settings.BGSettingContext("bypass2FL");
    var data = {
        friendlyName:"Bypass bảo mật 2 lớp (Không khuyến khích)",
        isBypass2FL:ko.observable(JSON.parse(S.get("bypass2FL")))
    }
    data.isBypass2FL.subscribe(function(newValue){
        S.set("bypass2FL",newValue);
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
                <label class="control-label">Mypass bảo mật 2 lớp (Không khuyến khích)"</label>\
                \
                <div class="controls">\
                    <input type="checkbox"\
                    data-bind="checked: isBypass2FL">\
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
