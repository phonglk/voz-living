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
        bypass2FL : {
            settings:{
                bypass:{
                    text:"bypass 2 Phrase Login",
                    default:"false"
                }
            },
            setting:"options-page/bypass2FL"
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
        SafeSurfing : {
            path:"SafeSurfing/SafeSurfing"
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
        HotLinks:{},
        LoadQuickMQuote:{
            path:"Editor/LoadQuickMQuote"
        }
    }
})
