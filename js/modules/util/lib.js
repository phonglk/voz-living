define(function(){
    chrome.extension.onMessage.addListener(
        function (request, sender, sendResponse) {
            if(request.type="function"){
                console.log("Call Function "+request.functionName+ " from background");
                sendResponse(F[request.functionName].apply(F,request.functionParameters));
        }
    });

    sendMessage=function(message,callback){
        chrome.extension.sendMessage(message, callback);
    }

    callBGFunction=function(name,params,callback){
        sendMessage({
            type: "function",
            functionName:name,
            functionParameters:params
        }, function(response) {
            if(typeof callback!="undefined")callback.call(this,response)
        });
    }

    function eUrl(url){
        return chrome.extension.getURL(url);
    }
    eStorage={
        setItem:function(name,value,callback){
            sendMessage({
                type: "function",
                functionName:"setItemInEStorage",
                functionParameters:[name,value]
            }, function(response) {
                callback.call()
            });
        },
        getItem:function(name,callback){
            sendMessage({
                type: "function",
                functionName:"getItemInEStorage",
                functionParameters:[name]
            }, function(response) {
                callback.call(this,response)
            });
        }
    }
    fixBootstrapIcon=function(){
        $(document.body).append('<style>.cmnw [class*=" icon-"],.cmnw [class^="icon-"]{background-image: url("'+eUrl("/img/glyphicons-halflings.png")+'") !important;}.cmnw .icon-white{background-image: url("'+eUrl("/img/glyphicons-halflings-white.png")+'") !important;}</style>')
    }

    return {
        callBGFunction:callBGFunction,
        extStorage:eStorage,
        extUrl:eUrl
    }
})

