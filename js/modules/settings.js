define(["bgStorage"],function(storage){

    function moduleSetting(module){
        var that = this;
        var defaultModuleSetting ={
            active : {
                "text":"Kích hoạt",
                default:true
            }
        }


        if (typeof module.settings =="undefined"){
            module.settings = null;
            return;
        }

        for(var set in module.settings){
            if(module.settings.hasOwnProperty(set)){
                var sett = module.settings[set];
                var defaultSetting = {
                    text:set,
                    allowConfig:true
                }
                module.settings[set] = $.extend({},defaultSetting,sett);
            }
        }
        module.settings = $.extend({},defaultModuleSetting,module.settings);

        this.get = function(name){
            for(var attr in module.settings){
                if(module.settings.hasOwnProperty(attr) && attr == name){
                    var setting = module.settings[attr];
                    var extendSetting = {
                        value : function(callback){
                            if(arguments.length == 1){
                                exports.get(module.name,attr,function(response){

                                    if(response == null && typeof setting.default !="undefined"){
                                        response = setting.default;
                                    }
                                    callback.call(this,response);
                                })
                            }else if(arguments.length == 2){
                                exports.set(module.name,attr,arguments[0],arguments[1]);
                            }else{
                                loge("Invalid arguments");
                            }
                        }
                    };
                    $.extend(setting,module.settings,extendSetting);
                    return setting;
                }
            }
            log("Setting is not defined");
            return false;
        }
        this.settings = module.settings;

    }

    function SettingContext(name){
        var self = this;
        this.context = name;
        this.get=function(name,callback){
            storage.get(self.context+"_"+name,callback);
        },
        this.set=function(name,value,callback){
            storage.set(self.context+"_"+name,value,callback);
        }
    }

    function SettingContext_bg(name){
        var self = this;
        this.context = name;
        this.get=function(name){
            return localStorage.getItem(self.context+"_"+name);
        },
        this.set=function(name,value){
            return localStorage.setItem(self.context+"_"+name,value);
        }
    }
    var exports = {
        get:function(name,callback){
            if(arguments.length == 2){
                storage.get(name,callback)
            }else if(arguments.length == 3){

                storage.get(arguments[0]+"_"+arguments[1],arguments[2]);
            }else{
                loge("Invalid arguments");
            }
        },
        getNDefault:function(name,defaultValue,callback){
            return storage.getNDefault(name,defaultValue,callback)
        },
        set:function(name,value,callback){
            if(arguments.length == 3){
                storage.set(name,value,callback)
            }else if(arguments.length == 4){
                storage.set(arguments[0]+"_"+arguments[1],arguments[2],arguments[3]);
            }else{
                loge("Invalid arguments");
            }
        },
        module : function(module){
            var settingInstance = new moduleSetting(module);
            if(settingInstance.settings == null){
                settingInstance = null;
            }
            return settingInstance;
        },
        SettingContext: SettingContext,
        BGSettingContext: SettingContext_bg
    }
    return exports;
})