define({
    use : {
        ContentFirstRun:{},
        fixCSSMisc :{},
        ContentBar : {},
        removeAds : {
            settings:{
                fullSize:{
                    text:"Mở rộng màn hình",
                    default:"true"
                }
            },
            setting:"options-page/removeAds"
        },
        quoteNotification : {
            path:"quoteNoti5/quoteNotification",
            setting:"options-page/noti5",
            settings:{
                desktopNotification:{
                    text:"Hiện thông báo bên dưới phải",
                    default:"true"
                }
            }
        },
        FollowThread : {
            path:"FollowThread/FollowThread"
        },
        LinkProcess:{
            path:"LinkProcess/LinkProcess"
        },
        QuickIgnore:{
            path:"Miscs/addToIgnoreList"
        },
        EmoHelper:{
            path:"Editor/EmoHelper"
        },
        PreThread:{
            path:"PreviewThread/PreviewThread"
        },
        FacebookSharing:{
            path:"SocialSharing/FacebookSharing"
        },
        PageByKey:{},
        LoadQuickMQuote:{
            path:"Editor/LoadQuickMQuote"
        }
    }
})