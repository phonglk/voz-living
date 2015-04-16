define(["settings"], function (settings) {
    var initialModuleState = {
        init: function () {
        },
        run: function () {
        }
    }

    function Module(opt) {
        var self = this;
        $.extend(this, opt);

        self.setting = new settings.SettingContext(self.name);
    }

    var exports = {
        get: function (module) {
            var moduleSetting = null;
            if (module instanceof Module == true) {
                module = $.extend({}, initialModuleState, module);
                moduleSetting = module.settings
            } else {
                module = $.extend({}, initialModuleState, module);
                moduleSetting = settings.module(module);
            }
            var exports = {
                name: module.name,
                run: function () {
                    try {
                        if (moduleSetting != null) {
                            var param
                            if (module instanceof Module) {
                                param = "active";
                            } else {
                                param = module.name + "_active";
                            }
                            settings.get(param, function (response) {
                                if (response == null)response = true;
                                if (response == true) {
                                    log("module " + module.name + " is being run");
                                    module.init();
                                    module.run();
                                }
                            })
                        } else {
                            log("module " + module.name + " is being run");
                            module.init();
                            module.run();
                        }
                    } catch (e) {
                        log("Error while loading module ", module)
                    }
                },
                settings: moduleSetting
            }
            exports.friendlyName = typeof module.friendlyName == "undefined" ? exports.name : module.friendlyName;
            return exports
        },
        run: function (module) {
            try {
                settings.get(module.name, "active", function (response) {
                    if (response == null)response = true;
                    if (response == true) {
                        log("module " + module.name + " is being run");
                        module.init();
                        module.run();
                    }
                })
            } catch (e) {
                log("Error while loading module ", module)
            }
        },
        Module: Module
    }
    return exports;
})