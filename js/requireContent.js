require.load = function (context, moduleName, url) {
    var xhr;
//    url = url.replace("\.js",".coffee");
    xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL(url) + '?r=' + new Date().getTime(), true);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
//            eval(xhr.responseText);
//            try{
                log("Require load "+url);
                new Function(xhr.responseText).call();
                context.completeLoad(moduleName)    
//            }catch(er){
//                log("Error while loading content: " + xhr.responseText);
//                log("Error details: ",er.message);
//                log("Error stacks:",er.stack);
//            }
        }
    };
    xhr.send(null);
};