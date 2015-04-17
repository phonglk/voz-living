require(["moduleConfig"],function(moduleConfig){
    var templateSource = {};
    var masterVM = {
        modules:ko.observableArray([])
    }
    $(function(){
        ko.setTemplateEngine(createStringTemplateEngine(new ko.nativeTemplateEngine(), templateSource));
        ko.applyBindings(masterVM,$("#general-settings")[0]);

        for(var moduleName in moduleConfig.use){
            var module = moduleConfig.use[moduleName];
            if(typeof module.setting!="undefined"){
                require([module.setting],function(moduleSetting){
                    for(var tmpl in moduleSetting.templates){
                        if(moduleSetting.templates.hasOwnProperty(tmpl)){
                            templateSource[moduleName+tmpl] = moduleSetting.templates[tmpl];
                        }
                    }
                    moduleSetting.template = moduleName + moduleSetting.template;
                    masterVM.modules.push(moduleSetting);
                })
            }
        }
    })
})