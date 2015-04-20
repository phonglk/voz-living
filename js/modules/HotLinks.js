define(["ContentBar"], function (contentBar) {
    var exports = {
        name: "hotLink",
        friendlyName: "Hot Links",
        settings: {
            active: {
                allowConfig: false
            }
        },
        init: function () {

        },
        run: function () {
            setTimeout(function(){
                contentBar.addBarItem({
                    id:"hot_link17_bar",
                    barButton:{
                        template:"hot_link17_barButton"
                    },
                    templates:{
                        hot_link17_barButton:"<a href='/forumdisplay.php?f=17' style='font-size: 15px;position: relative;top: -10px;'>F17</a>",
                        hot_link17_container:"<div class='no-container'></div>"
                    },
                    container:{
                        template:"hot_link17_container",
                        data:{}
                    },
                    barButtonClick:function(){
                        return true;
                    }
                });

                contentBar.addBarItem({
                    id:"hot_link33_bar",
                    barButton:{
                        template:"hot_link33_barButton"
                    },
                    templates:{
                        hot_link33_barButton:"<a href='/forumdisplay.php?f=33' style='font-size: 15px;position: relative;top: -10px;'>F33</a>",
                        hot_link33_container:"<div class='no-container'></div>"
                    },
                    container:{
                        template:"hot_link33_container",
                        data:{}
                    },
                    barButtonClick:function(){
                        return true;
                    }
                });
            }, 1500);
        }
    }
    return exports
})
