// User get key process
// change occupation to VOZLIVING_{Username}_{timestring} as keyVerification
// send username and keyVerification
// server request user profile and compair keyVerification
// if ok, return key
define([], function () {
    var isConnected = false;

    function getUserKey(cb) {
        var userName = localStorage.getItem("username");
        var userId = localStorage.getItem("userid");
        var secTkn = localStorage.getItem("securitytoken");
        if (userName == null || userName.trim() == "")return;
        var keyVer = "VOZLIVING_" + userName + "_" + (new Date().getTime());

        $.ajax({
            url: "http://vozforums.com/profile.php?do=updateprofile",
            type: "POST",
            data: {
                securitytoken: secTkn,
                "userfield[field4]": keyVer,
                "userfield[field4_set]": 1,
                "s": "",
                "do": "updateprofile"
            },
            success: function () {

            }
        })
    }

    function verifyUserKey(cb) {

    }

    var U = {
        connect: function (cb) {
            if (isConnected == false) {
                if (localStorage.getItem("isLogin") == "true") {
                    var userkey = localStorage.getItem("user_key");
                    if (userkey == null) {
                        getUserKey(cb);
                    } else {
                        verifyUserKey(cb);
                    }
                    return true;
                } else {
                    return false
                }
            } else {
                cb.call();
                return true;
            }
        }
    }
    return U;
})