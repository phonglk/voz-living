define(["moduleHelper","lib/shortcut"], function (moduleHelper,shortcut) {

    $.fn.go = function() {
        var href
        href = this.attr("href");
        if (href != null) {
            return window.location = href;
        }
    };

    var module = new moduleHelper.Module({
        name: "PageByKey",
        friendlyName: "Chuyển trang bằng phím tắt",
        settings: {
            active: {
                text: "Kích hoạt"
            }
        },
        init: function () {

        },
        run: function () {
            (function() {
                shortcut.add("Left", (function() {
                    debugger;
                    $(".pagenav td a[rel=prev]:eq(0)").go();
                    return true;
                }), {
                    disable_in_input: true
                });
                return shortcut.add("Right", (function() {
                    $(".pagenav td a[rel=next]:eq(0)").go();
                    return true;
                }), {
                    disable_in_input: true
                });
            }).call(window);
            if($(".pagenav").length > 0){
                $(".pagenav").append("<div class='guide guide-keynav'>Dùng phím ← và → để chuyển trang</div>")
            }
        }
    })

    return module;
});
