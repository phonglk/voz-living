define(["moduleHelper", "lib/jquery.textarea-helper", "Editor/SmilieList"], function (moduleHelper, null1, smilieList) {

    var module = new moduleHelper.Module({
        name: "EmoHelper",
        friendlyName: "Emoticon Helper",
        settings: {
            active: {
                text: "Kích hoạt"
            }
        },
        init: function () {
        },
        run: function () {
            var self = this;
            var editorFull = $("#vB_Editor_001_textarea");
            var editorQuick = $("#vB_Editor_QR_textarea");
            var editor = null;
            var smileCont = $("#vB_Editor_001_smiliebox");

            var smileBox = $("<div id='smilebox' class='plk_smilebox' data-bind='foreach: smilies'>" +
                "<img data-bind='attr:{src:src,alt:text},click:$root.Select'/>" +
                "</div>")
//            vB_Editor_QR_textarea - quick reply
            if (editorFull.length > 0) {
                editor = editorFull;
                if (smileCont.length == 0) {
                    return;
                }
                smileCont.find("table").remove();
            } else if (editorQuick.length > 0) {
                editor = editorQuick;
                smileCont = editorQuick.parents("#vB_Editor_QR").eq(0);
                smileBox.addClass("controlbar");
                smileBox.addClass("quick")
            } else {
                return;
            }

            smileCont.append(smileBox);

            function _exec() {
                var _smiles = smilieList.sort(function(a,b){
                    if(a.clickNum < b.clickNum){
                        return 1;
                    }else if(a.clickNum > b.clickNum){
                        return -1;
                    }else{
                        return 0;
                    }
                });
                var SmilieVM = {
                    smilies: _smiles,
                    Select: function (smilie) {
                        var smilieText = "";
                        try {
                            smilieText = smilie.text
                        } catch (e) {
                        }
                        var v = editor.val();
                        var selStart = editor.prop('selectionStart');
                        var selEnd = editor.prop('selectionEnd');
                        var textBefore = v.substring(0, selStart);
                        var textAfter = v.substring(selEnd, v.length);
                        editor.val(textBefore + smilieText + textAfter);
                        editor[0].setSelectionRange(selStart + smilieText.length, selStart + smilieText.length);

                        if(typeof smilie.clickNum!="undefined"){
                            smilie.clickNum++;
                        }else{
                            smilie.clickNum = 1;
                        }
                        var smile = _.findWhere(smilieList,{text:smilie.text});
                        smile.clickNum = smilie.clickNum;
                        var clickList = [];
                        for(var i=0;i<smilieList.length;i++){
                            clickList.push({click:smilieList[i].clickNum})
                        }
                        self.setting.set("iconUsage",JSON.stringify(clickList),function(){});
                    }
                }

                ko.applyBindings(SmilieVM, smileBox[0]);
            }

            function initIconUsageData(){
                var _t = [];
                for(var i=0;i<smilieList.length;i++){
                    _t.push({click:0});
                }
                self.setting.set("iconUsage",JSON.stringify(_t));
            }

            self.setting.get("iconUsage", function (value) {
                if (value == null) {
                    _exec();
                    initIconUsageData();
                } else {
                    try{
                        var data = value;
                        if(typeof data=="string"){
                            data = JSON.parse(data)
                        }
                        if(data.length > 0){
                            for(var i=0;i<data.length;i++){
                                var d = data[i];
                                if(typeof d.click!="undefined" && smilieList[i]){
                                    smilieList[i].clickNum = d.click;
                                }
                            }
                            _exec();
                        }else{
                            _exec();
                            initIconUsageData();
                        }
                    }catch(e){
                        _exec();
                        initIconUsageData();
                    }
                }
            })


        }
    })

    return module;
});
