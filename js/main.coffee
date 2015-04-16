requirejs.config requirejsConfig
console.log "main.coffee"
$("body").ready ()->
  require [
    "util/ctLib",
  ],(util)->
    console.log "libs Loaded"
    # Loading Modules
    require [
      "removeAds",
      "restyleForum"
    ],(
      removeAds,
      rf
    )->
      console.log("Module loaded")
