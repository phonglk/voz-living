define(function () {

    return{
        name:"fixCSSMisc",
        init: function () {
            if ($("#fix-bootstrap-css").length == 0) {
                html = "<div class='plk_pluginControl id='fix-bootstrap-css'>" +
                    "<style>" +
                    "@font-face {" +
                    "font-family: 'FontAwesome';" +
                    "src: url('"+eUrl("bower_components/fontawesome/fonts/fontawesome-webfont.eot?v=4.3.0")+"');" +
                    "src: url('"+eUrl("bower_components/fontawesome/fonts/fontawesome-webfont.eot?#iefix&v=4.3.0")+"') format('embedded-opentype')," +
                    " url('"+eUrl("bower_components/fontawesome/fonts/fontawesome-webfont.woff?v=4.3.0")+"') format('woff')," +
                    " url('"+eUrl("bower_components/fontawesome/fonts/fontawesome-webfont.ttf?v=4.3.0")+"') format('truetype'), " +
                    "url('"+eUrl("bower_components/fontawesome/fonts/fontawesome-webfont.svg#fontawesomeregular?v=4.3.0")+"') format('svg');" +
                    "font-weight: normal;" +
                    "font-style: normal;" +
                    "}" +
                    "</style>\n</div>";
                $(document.body).append(html);
            }
        }
    }
})
