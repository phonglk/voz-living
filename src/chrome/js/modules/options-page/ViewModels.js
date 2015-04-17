
define(["moduleConfig","moduleHelper","settings"],function(moduleConfig,mHelper,settings){
    function loadModuleSettings(m){
        m.allSetting = ko.observableArray([]);
        settings.module(m);
        if(m.settings == null){
            return false;
        }
        for(var set in m.settings){
            if(m.settings.hasOwnProperty(set)){
                var sett = m.settings[set];
                if(sett.allowConfig != true)continue;
                sett.waitLoading = ko.observable(false);
                sett.val = ko.observable("");
                sett.id = m.name+"_"+set;
                m.allSetting.push(sett)
//                TODO: here
                m.settings.get(set).value(function(response){
                    log("Retrive setting " + set + " of "+ m.name + ":" + response)
                    sett.val(response);
                    sett.waitLoading(false);
                })
                sett.val.subscribe(function(newValue){
                    sett.waitLoading = ko.observable(true);
                    m.settings.get(set).value(newValue,function(response){
                        sett.waitLoading(false);
                    })
                })
            }
        }
    }

    function GeneralSettings(){
        var self = this;

        self.modules = ko.observableArray([])

        // Loading
        var _allM = 0,_loadedM = 0,_loadingM = true;
        function _loadHandler(){
            if(_loadingM == false &&
                _allM == _loadedM){
                self.ready();
            }
        }
        for(var mod in moduleConfig.use){
            if(moduleConfig.use.hasOwnProperty(mod)){
                _allM++;
                var path = mod;
                if(moduleConfig.use[mod].path){
                    path = moduleConfig.use[mod].path
                }
                require([path],function(module){
                    _loadedM++;
                    var m = mHelper.get(module);
                    self.modules.push(m);
                    loadModuleSettings(m);
                    _loadHandler();
                })
            }
            _loadingM = false;
            _loadHandler();
        }
        // EndLoading
        self.ready = function(callback){
            if(arguments.length == 1){
                self._readyCallback = callback;
            }else if(arguments.length == 0){
                self._readyCallback.call(self);
            }
        }
    }

    var exports = {
        GeneralSettings : GeneralSettings
    }

    return exports;
})