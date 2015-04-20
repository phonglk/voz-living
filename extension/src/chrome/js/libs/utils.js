function log(message){
    try{
        if(options.debug == true){
            console.log.apply(console,arguments);
        }
    }catch(e){console.error("error:"+ e.message)}
}
function loge(message){
    try{
        console.error.apply(console,arguments);
    }catch(e){console.error("error:"+ e.message)}
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

eUrl = function(url) {
    return chrome.extension.getURL(url);
};