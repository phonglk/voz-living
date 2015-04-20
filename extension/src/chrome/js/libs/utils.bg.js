options = {
    debug: true
}
CatchRequest = {
    do:function(html){
        if(this.events){
            this.events.notify("onDo",{html:html})
        }
    }
}
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        try{
            if(request.type="function"){
                var result = F[request.functionName].apply(F,request.functionParameters);
                sendResponse(result);
                console.log("Incoming message: /function: "+request.functionName+" /params: ",request.functionParameters," /result: ",result);
            }
        }catch(e){
            console.log("BGError: "+e.message);
        }
    });
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {
        type: "function",
        functionName:"active"
    });
});