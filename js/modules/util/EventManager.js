function EventManager(){
    var self = this;
    self._events = {};
    self.subscribe = function(name,f){
        if(typeof self._events[name] == "undefined"){
            self._events[name] = [];
        }
        var idx = self._events[name].push(f) - 1;
        return {
            event:name,
            idx:idx
        }
    }

    self.unsubscribe = function(id){
        if(self._events[id.event] && self._events[id.event][id.idx]){
            self._events[id.event][id.idx] = null;
        }
    }

    self.notify = function(name,ctx){
        if(self._events[name]){
            for(var i=0;i<self._events[name].length;i++){
                var e = self._events[name][i];
                if(e != null){
//                    try{
                        e.call(ctx);
//                    }catch(e){
//                        console.error("Error while calling subscriber",e)
//                    }
                }
            }
        }
    }
}
define(function(){
    return EventManager
})