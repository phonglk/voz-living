define(["ContentBar", "moduleHelper"], function (contentBar, moduleHelper) {
    var exports = new moduleHelper.Module({
        name: "HotLinks",
        friendlyName: "Hot Links",
        settings: {
            active: {
                allowConfig: false
            }
        },
        init: function () {

        },
        run: function () {
            var self = this;
            setTimeout(function(){
                console.log(self);
                self.setting.get("quickLinks",function(links){
                    var hotlinks = [17, 33];
                    try{
                        hotlinks = links.split(",").map(function(s){ return parseInt(s.toString().trim())});
                    }catch(e){
                        console.warn('Error while process custom hotLinks configuration: ' + links);
                        console.info(e);
                    } 

                    hotlinks.forEach(function(fid) {
                        if(Number.isNaN(fid)) return;
                        contentBar.addBarItem({
                            id:`hot_link${fid}_bar`,
                            barButton:{
                                template:`hot_link${fid}_barButton`
                            },
                            templates:{
                                [`hot_link${fid}_barButton`]:`<a href='/forumdisplay.php?f=${fid}' style='font-size: 15px;position: relative;top: -10px;'>F${fid}</a>`,
                                [`hot_link${fid}_container`]:"<div class='no-container'></div>"
                            },
                            container:{
                                template:`hot_link${fid}_container`,
                                data:{}
                            },
                            barButtonClick:function(){
                                return true;
                            }
                        });
                    })
                })
            }, 1500);
        }
    });
    return exports;
})
