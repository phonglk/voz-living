define(["moduleHelper"],function(moduleHelper) {
    var module = new moduleHelper.Module({
        name:"QuickIgnore",
        friendlyName: "QuickIgnore",
        settings:{
            active:{
                default:true
            }
        },
        init:function(){},
        run:function(){
            $(".vbmenu_popup[id^='postmenu_']").each(function(){
                var $this = $(this);
                var uid = $this.find("a[href*='member.php']").attr("href").match(/\?u=(\d+)/)[1];
                var ignoreRow = $(("<tr>" +
                    "<td class='vbmenu_option vbmenu_option_alink'>" +
                    "<a target='_blank' href='https://vozforums.com/profile.php?do=addlist&userlist=ignore&u={0}' title='{2}'>{1}</a>" +
                    "</td>" +
                    "</tr>").format(
                        uid,
                        "Add to ban list",
                        "Mở trong tab mới"
                    ))
                $this.find("table tbody").append(ignoreRow)
            })
        }
    })

    return module;
});
