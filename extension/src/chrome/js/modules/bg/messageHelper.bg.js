define(function(){
    function sendMessage(message,callback){
        chrome.tabs.query({currentWindow: true}, function(tabs) {
            for(var i=0;i<tabs.length;i++){
                chrome.tabs.sendMessage(tabs[i].id, message, callback);
            }
        });
    }
    function callCTFunction(name,params,callback){
        log("Send message:","function",name,params);
        if($.isArray(params) == false) params = [params];
        sendMessage({
            type:"function",
            functionName:name,
            functionParameters:params
        },function(response){
            if(typeof callback!="undefined"){
                if(response == "true"){
                    response = true;
                }
                if(response == "false"){
                    response = false;
                }

                callback.call(this,response)
            }
        })
    }

    return {
        callFunction : callCTFunction
    }
})