define(["moduleConfig", "settings"], function (moduleConfig, settings) {
//    Setup default value of properties
    for (var mod in moduleConfig.use) {
        if (moduleConfig.use.hasOwnProperty(mod)) {
            var moduleCfg = moduleConfig.use[mod];
            var sc = new settings.BGSettingContext(mod)
            if (moduleCfg.settings) {
                for (var s in moduleCfg.settings) {
                    if (moduleCfg.settings.hasOwnProperty(s)) {
                        var se = moduleCfg.settings[s];
                        if (typeof se.default != "undefined" && sc.get(s) == null) {
                            sc.set(s, se.default);
                        }
                    }
                }
            }
        }
    }
})