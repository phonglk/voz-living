define(function () {

    return{
        name:"fixCSSMisc",
        init: function () {
            if ($("#fix-bootstrap-css").length == 0) {
                html = "<div class='plk_pluginControl id='fix-bootstrap-css'>" +
                    "<style>" +
                    "@font-face {" +
                    "font-family: 'FontAwesome';" +
                    "src: url('"+eUrl("/font/fontawesome-webfont.eot?v=3.2.1")+"');" +
                    "src: url('"+eUrl("/font/fontawesome-webfont.eot?#iefix&v=3.2.1")+"') format('embedded-opentype')," +
                    " url('"+eUrl("/font/fontawesome-webfont.woff?v=3.2.1")+"') format('woff')," +
                    " url('"+eUrl("/font/fontawesome-webfont.ttf?v=3.2.1")+"') format('truetype'), " +
                    "url('"+eUrl("/font/fontawesome-webfont.svg#fontawesomeregular?v=3.2.1")+"') format('svg');" +
                    "font-weight: normal;" +
                    "font-style: normal;" +
                    "}" +
                    "</style>\n</div>";
                $(document.body).append(html);
            }
        }
    }
})
