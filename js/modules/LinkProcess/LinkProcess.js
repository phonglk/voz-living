define(["moduleHelper"], function (moduleHelper) {

    var module = new moduleHelper.Module({
        name: "LinkProcess",
        friendlyName: "Link Processor",
        settings: {
            active: {
                text: "Kích hoạt"
            },
            active_recognition: {
                default: true
            },
            active_smart_image: {
                default: true
            },
            active_smart_youtube: {
                default: true
            },
            active_remove_redirect: {
                default: true
            }
        },
        init: function () {
        },
        run: function ($context) {
            var self = this;
            if(typeof $context=="undefined"){
                $context=$(document.body);
            }
            require(["LinkProcess/LinkRecognition"], function (LinkRecognition) {

                    LinkRecognition.run($context);

                // do link recognition first
               self.settings.get("enableImageLinkProcess", function (isActive) {
                   if (isActive) {
                        require(["LinkProcess/SmartLinkRecognition"], function (SmartLinkRecognition) {
                            SmartLinkRecognition.imageLink($context);
                        });
                   }
               });
               self.setting.get("enableYoutubeProcess", function (isActive) {
                   if (isActive) {
                        require(["LinkProcess/SmartLinkRecognition"], function (SmartLinkRecognition) {
                            SmartLinkRecognition.youtubeLink($context);
                        });
                   }
               });
            });


            require(["LinkProcess/RemoveRedirect"], function (RemoveRedirect) {
                RemoveRedirect.run($context);
            });

        }
    })

    return module;
});
