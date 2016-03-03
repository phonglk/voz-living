define(function() {
    return {
        imageLink:function($context){
            $context.find("[id^='post_message_'] a").each(function() {
                var $img, $this, href;
                $this = $(this);
                href = $this.attr("href");
                if (/\.(jpg|png|gif|bmp)$/.test(href)) {
                    $this.attr("data-smartlink", "image");
                    $img = $("<div><img src='" + href + "' title='Có thể xảy ra sai sót trong việc tự động nhận biết hình, nếu có xin vui lòng báo lỗi qua pm greans(@vozforum)'/></div>");
                    return $this.after($img);
                }
            });

        },
        youtubeLink:function($context){
            $context.find("[id^='post_message_'] a").each(function() {
                var $img, $this, href, ytb;
                $this = $(this);
                href = $this.attr("href");
                ytb = href.match(/youtube\.com[^\s]+v=([a-zA-Z0-9_-]+)/i);
                if (ytb === null || ytb.length === 0){
                    ytb = href.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i);
                }
                if (ytb !== null && ytb.length > 0) {
                    $this.attr("data-smartlink", "youtube");
                    $img = $("<div><iframe width='560' height='315' src='https://www.youtube.com/embed/" + ytb[1] + "?rel=0' frameborder='0' allowfullscreen title='Có thể xảy ra sai sót trong việc tự động nhận biết youtube, nếu có xin vui lòng báo lỗi qua pm greans(@vozforum)'></iframe></div>");
                    return $this.after($img);
                }
            });

        }
    }
});
