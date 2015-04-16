define(["bgHelper"],function (bgHelper) {
    var isLogged = false;
    var hasRun = false;

    function run() {
        if (hasRun)return;

        var username = $("*:contains('You last') > *:contains('Welcome') > a[href*='member.php?u']").eq(0).text();
        if (username == "") {
            isLogged = false
            bgHelper.callFunction("setIsLogin", [false]);
            if ($("#nologin-message").length == 0) {
                $(".tborder:has(input[name='vb_login_username'])").before("<div id='nologin-message'>Bạn cần phải đăng nhập để sử dụng đầy đủ các chức năng của plugin</div>")
            }
        } else {
            isLogged = true
        }

        hasRun = true;

    }

    return{
        name: "checkLogin",
        run: run,
        isLogged: function () {
            run();
            return isLogged;
        }
    }
})
