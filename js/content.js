log("doc-start")
$(function(){
    log("doc-end")
    require(["bgStorage","moduleHelper","moduleConfig"],
        function(storage,loader,moduleConfig)
        {
            for(var mod in moduleConfig.use){
                if(moduleConfig.use.hasOwnProperty(mod)){
                    var path = mod;
                    if(typeof moduleConfig.use[mod].path!="undefined"){
                        path = moduleConfig.use[mod].path;
                    }
                    require([path],function(module){
                        loader.get(module).run();
                    })
                }
            }
        })
})
