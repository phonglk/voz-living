define(["moduleHelper"], function (moduleHelper) {
    function insertFBCode(){
        var fb_requirements = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=354069784734041";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>'
        $(document.body).prepend(fb_requirements);
    }
    function isOnPostsPage(){
        return /showthread\.php/.test(location.href);
    }
    var module = new moduleHelper.Module({
        name: "FacebookSharing",
        friendlyName: "Chia sẻ lên Facebook",
        settings: {
            active: {
                text: "Kích hoạt"
            }
        },
        init: function () {
            if(isOnPostsPage() == false)return;
        },
        run: function () {
            if(isOnPostsPage() == false)return;


            $("[id^='td_post_']").each(function(){
                var $this = $(this);
                var id = $this.attr("id").match(/\d+/)[0];
                var href = location.href+"#post_message_"+id;
                var shrBtn = $('<div class="fb-share-button" data-href="'+href+'" data-type="icon_link" data-layout="button_count"></div>&nbsp;');
                var controls = $this.find(">div:last");
                if(controls.length > 0){
                    controls.prepend(shrBtn);
                }
            })
            insertFBCode();
        }
    })

    return module;
});
