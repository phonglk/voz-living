// jshint multistr:true
define(["moduleHelper"], function(moduleHelper) {
    var module = new moduleHelper.Module({
        name: "bypass2FL",
        friendlyName: "bypass 2FL",
        init: function() {
            console.log("wtf");
        },
        run: function() {
            this.setting.get("bypass2FL", function(v) {
                if (JSON.parse(v) === true) {
                    $("<style>.vbb-api #myModal {\
                      display: none !important;\
                  }</style>").appendTo(document.body);
                    $("[action='login.php?do=login'] input[type='submit']").click(function() {
                        $(this).parents("form")[0].submit();
                    });
                }
            });
        }
    });
    return module;
});
