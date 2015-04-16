// jshint multistr: true
define(["moduleHelper"], function (moduleHelper) {
    var module = new moduleHelper.Module({
        name: "SafeSurfing",
        friendlyName: "Vui chơi an toàn",
        settings: {
            active: {
                text: "Kích hoạt"
            }
        },
        init: function () {

        },
        run: function () {
            $("#posts > div").find("table:eq(0) > tbody > tr > td.thead").each(function(){
                var $this = $(this);
                var $icon = $('<div class="cmnw" style="float:right"><div class="btn-group">\
                          <a class="btn dropdown-toggle btn-small main-button" data-toggle="dropdown" href="#">\
                            Report\
                            <span class="caret"></span>\
                          </a>\
                          <ul class="dropdown-menu">\
                            <li><a href="#">Action</a></li>\
                            <li><a href="#">Another action</a></li>\
                            <li class="dropdown-submenu">\
                                <a tabindex="-1" href="#">More options</a>\
                                <ul class="dropdown-menu">\
                                    <li><a href="#">Action</a></li>\
                                    <li><a href="#">Another action</a></li>\
                                </ul>\
                            </li>\
                          </ul>\
                        </div></div>');
                $this.prepend($icon);
                $icon.find(".main-button").on("click", function(){
                    $(this).trigger("click");
                });
            });
        }
    });

    return module;
});
