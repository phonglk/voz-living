define ()->

  $.fn.hoverInDelay = (delay,callback,context=this)->
    @attr "_mousehover","false"
    timer = null;
    @hover (=>
      @attr "_mousehover","true"
      clearTimeout(timer)
      timer=setTimeout (=>
        callback.call(context) if @attr("_mousehover") is "true"
      ),delay
    ),=>
      @attr "_mousehover","false"
    return

  $.fn.hoverOutDelay = (delay,callback,context=this)->
    @attr "_mousehover","false"
    timer = null;
    @hover (=>
      @attr "_mousehover","true"
    ),=>
      @attr "_mousehover","false"
      clearTimeout(timer)
      timer=setTimeout (=>
        callback.call(context) if @attr("_mousehover") is "false"
      ),delay

    return
  ##-----------------
  #Date Helper
  Date::getRangeTime = (dateTo=new Date()) ->
    to = dateTo.getTime();
    from = this.getTime();
    range = to-from;
    rangeInMinute = range/60000;
    #day hourse minute
    timeScale = [
      ["Phút",1]
      ["Giờ",60]
      ["Ngày",24]
    ]
    minutes = Math.round(rangeInMinute);
    hours = Math.floor(minutes/60);
    days = Math.floor(hours/24);
    minutes = + minutes - hours*60;
    hours = + hours - days*24;
    return [minutes,hours,days]

  Date::getRangeTimeInString=(dateTo=new Date()) ->
    rangeTime = @getRangeTime(dateTo);
    str = "#{if rangeTime[2]>0 then rangeTime[2]+' Ngày' else ''} #{if rangeTime[1]>0 then rangeTime[1]+' Giờ' else ''} #{if rangeTime[0]>0 then rangeTime[0]+' Phút' else ''}"
    return str;
  Date.rangeTimeUpdateManager = [];
  Date.rangeTimeUpdateTrigger = ()->
    current = new Date();
    for u in Date.rangeTimeUpdateManager
      str = u.dateFrom.getRangeTimeInString(current)
      u.$jq?.text(str);
  Date::rangeTimeAutoUpdateTo=(jtarget)->
    $jq = $(jtarget);
    Date.rangeTimeUpdateManager.push
      dateFrom:this
      $jq:$jq
  Date.rangeTimeUpdateIntervaler = setInterval(Date.rangeTimeUpdateTrigger,15000);
  #
  Date.TimeSchedule = [];
  Date.TimeScheduleTrigger = ()->

  Date.setTimeout = (f,interval)->
  Date.prototype.parseString=(sDatetime)->
    sDatetime_es = sDatetime.split(/[-,:]/);
    if sDatetime_es.length is 3
      datestr = ['today','yesterday']
      dateoffset = datestr.indexOf sDatetime_es[0].toLowerCase()
      if dateoffset>-1
        now = new Date();
        datemod = now.getDate()-dateoffset;
        datetime = new Date parseInt(now.getFullYear()),now.getMonth(),datemod,parseInt(sDatetime_es[1]),parseInt(sDatetime_es[2]),0
    else
      datetime = new Date parseInt(sDatetime_es[2]),parseInt(sDatetime_es[1]-1),parseInt(sDatetime_es[0]),parseInt(sDatetime_es[3]),parseInt(sDatetime_es[4]),0
    return datetime;
  #--------------------------------------
  eUrl = (url) ->
    chrome.extension.getURL url
  chrome.extension.onMessage.addListener (request, sender, sendResponse) ->
    if request.type = "function"
      console.log "Call Function " + request.functionName + " from background"
      sendResponse F[request.functionName].apply(F, request.functionParameters)

  sendMessage = (message, callback) ->
    chrome.extension.sendMessage message, callback

  callBGFunction = (name, params, callback) ->
    sendMessage
      type: "function"
      functionName: name
      functionParameters: params
    , (response) ->
      callback.call this, response  unless typeof callback is "undefined"


  eStorage =
    setItem: (name, value, callback) ->
      sendMessage
        type: "function"
        functionName: "setItemInEStorage"
        functionParameters: [name, value]
      , (response) ->
        callback.call()
    getItem: (name, callback) ->
      sendMessage
        type: "function"
        functionName: "getItemInEStorage"
        functionParameters: [name]
      , (response) ->
        callback.call this, response

  _ctx = (context,func)->
    func.call context;
  extpath = (path)->
    chrome.extension.getURL path
  extimg = (path)->
    extpath "/img/#{path}"
  goToAnchorInURL=(url)->
    anchorInURL = url.match(/#([\d\w]+)$/);
    if anchorInURL?.length > 0
      $("##{anchorInURL[1]}")[0].scrollIntoView()
      return true;
    else
      return false;
  parseNum = (str)->
    str = str.replace(/,/g,"");
    str = parseInt(str)
    return str;
  String::parseNum = ->
    str = @replace(/,/g,"");
    str = parseInt(str)
    return str
  fixBootstrapIcon = ->
    $(document.body).append "<style>.cmnw [class*=\" icon-\"],.cmnw [class^=\"icon-\"]{background-image: url(\"" + eUrl("/img/glyphicons-halflings.png") + "\") !important;}.cmnw .icon-white{background-image: url(\"" + eUrl("/img/glyphicons-halflings-white.png") + "\") !important;}</style>"

  return {
    callBGFunction:callBGFunction,
    extStorage:eStorage,
    extUrl:eUrl,
  }