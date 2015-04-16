// Useguide for first use
define(function(){
    function useguide(){
        var guideline_var = "firstUse_options"
        eStorage.getItem(guideline_var,function(rs){
            if(rs==null || rs==false){
                var html = $("<div class='cmnw first-use'>" +
                    "Tính năng mới [Options] <img src='http://farm9.staticflickr.com/8093/8580046762_9d6659f48f_m.jpg'/>" +
                    "<a href='javascript:void(0)' class='btn confirm'>Biết rồi</a>" +
                    "<a href='javascript:void(0)' class='btn ignore'>Bỏ qua</a>" +
                    "</div>")
                function close(){
                    $(".cmnw.first-use").fadeOut(500);
                }

                html.find(".confirm").click(function(){
                    try{
                        close();
                        eStorage.setItem(guideline_var,true);
                    }catch(e){
                        console.log(e)
                    }
                })
                html.find(".ignore").click(function(){
                    try{
                        close();
                    }catch(e){
                        console.log(e)
                    }
                })
                $(document.body).append(html);
            }
        })
    }
    return useguide;
})