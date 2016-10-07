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
            settings:{
                enableYoutubeProcess:{
                    text:"Tự động hiện youtube player",
                    default:"true"
                },
                enableImageLinkProcess:{
                    text:"Tự động hiện hình ảnh",
                    default:"true"
                },
            },
            setting:"options-page/linkProcess",
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
            path:"SocialSharing/FacebookSharing",
            settings:{
                enableFacebookSharing:{
                    text:"Share lên Facebook",
                    default:"false"
                },
            },
            setting:"options-page/FacebookSharing",
        },
        PageByKey:{},
        HotLinks:{
            settings:{
                quickLinks:{
                    text:"Truy cập nhanh",
                    default:"17,33"
                },
            },
            setting:"options-page/quickLinks"
        },
        LoadQuickMQuote:{
            path:"Editor/LoadQuickMQuote"
        }
    }
})
