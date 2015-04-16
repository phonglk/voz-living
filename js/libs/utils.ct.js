options = {
    debug: true
}
var ContentListeners = {
    test:function(){
        log("test called");
        return "test called";
    }
};

function addContentListener(functionName,handler){
    ContentListeners[functionName] = handler
}

CatchRequest = {
    do:function(html){
        if(this.events){
            this.events.notify("onDo",{html:html})
        }
    }
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type = "function") {
        if(typeof ContentListeners[request.functionName]!="function"){
            console.log("Function {0} being called is not existed".format(request.functionName));
        }else{
            var response = ContentListeners[request.functionName].apply(ContentListeners, request.functionParameters);
            console.log("Call function from bg /function: {0} /params:{1} /response: {2}".format(request.functionName,request.functionParameters,response));
            return sendResponse(response);
        }
    }
});