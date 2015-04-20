define(function(){
    function sendMessage(message,callback){
        chrome.extension.sendMessage(message,callback)
    }
    function callBGFunction(name,params,callback){
        sendMessage({
            type:"function",
            functionName:name,
            functionParameters:params
        },function(response){
            console.log("Sent message: /function: ",name," /params: ", params," /response: ",response)
            if(typeof callback!="undefined"){

                try{
                    response = JSON.parse(response)
                }catch(e){
                    console.log("-Cannot parse",response);
                }

                callback.call(this,response)
            }
        })
    }

    return {
        callFunction : callBGFunction
    }
})