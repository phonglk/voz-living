define(["moduleHelper", "lib/jquery.textarea-helper","lib/jquery.cookie"], function (moduleHelper, null1) {
    function clearChecked(){
        $.cookie("vbulletin_multiquote","");
        $("[src='https://vozforums.com/images/buttons/multiquote_on.gif']").attr("src","https://vozforums.com/images/buttons/multiquote_off.gif")
    }
    var module = new moduleHelper.Module({
        name: "LoadQuickMQuote",
        friendlyName: "Multi Quotes Quick Load",
        settings: {},
        init: function () {
        },
        run: function () {
            var self = this;
            var editorQuick = $("#vB_Editor_QR_textarea");
            var editorWrap = editorQuick.parents("#vB_Editor_QR").eq(0);
            var $Toolbar = $("<div class='controlbar cmnw'></div>");
            editorWrap.append($Toolbar);
            var $btnLoadQ = $("<a href='javascript:;' class='btn' title='Chèn các trích dẫn đã đánh dấu'>Load Quotes</a>")
            var $btnClearQ = $("<a href='javascript:;' class='btn' title='Xóa các trích dẫn đã đánh dấu'>Del Qs</a>")
            $Toolbar.append($btnLoadQ)
            $Toolbar.append($btnClearQ)

            $btnLoadQ.popover({
                html:true,
                placement:"left",
                trigger:"hover",
                title:"test",
                content:"Để thực hiện trích dẫn nhiều bài cùng lúc: Click vào nút <img src='https://vozforums.com/images/buttons/multiquote_off.gif'/>" +
                    " ở bên dưới-phải của mỗi bài viết cần trích dẫn.<br/>Những bài viết nào đã được đánh dấu icon sẽ chuyển sang -> <img src='https://vozforums.com/images/buttons/multiquote_on.gif'/>"
            })

            $btnClearQ.on("click",function(){
                clearChecked();
            })
            $btnLoadQ.on("click",function(){
                var href = $("a:has(>img[src*='images/buttons/reply.gif'])")[0].href;
                editorQuick.val("Đang xử lý...")
                $.ajax({
                    url:href,
                    success:function(html){
                        var $html = $(html);
                        var text=$html.find("#vB_Editor_001_textarea").val();
                        editorQuick.val(text);
                    }
                })
            })
        }
    })

    return module;
});
