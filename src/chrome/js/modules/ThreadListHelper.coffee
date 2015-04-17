define ["Global"],(g)->
  class ThreadManager extends Array
    constructor:(@jdom=null)->
      if @jdom is null
        @jdom = $ "tbody[id^='threadbits_forum_']"
      return if !@jdom?
      threads_tr = @jdom.find ">tr"
      threads_tr.each (i,e)=>
        @add new Thread($(e))
        return;
      @bind "mouseenter",->
        @restoreToHoverRowColor()
      @bind "mouseleave",->
        @restoreToOldRowColor();
    add:(item)->
      if item isnt false
        @push(item)
      else
        return false;
    getByTid:(tid)->
      for f in this
        return f if f.tid is tid
      false;
    getByDom:(dom)->
      if dom not instanceof jQuery
        dom = $(dom)
      if dom.attr("data-type")? is "thread"
        return @getByTid(parseInt dom.attr "data-fid");
      else
        if dom.parents("[data-type='thread']")[0]?
          return @getByTid(parseInt dom.parents("[data-type='thread']").eq(0).attr("data-fid"))
        return false;
    bind:(evtName,callback,context = "object")->
      for thread in this
        if context is "object"
          context = thread;
        else
          context = thread.jdom
        thread.bind evtName,callback,context

  class Thread
    constructor:(@jdom=null)->
      return if !@jdom?
      title_td = @jdom.find "td[id^='td_threadtitle_']";
      if title_td.length is 0 # Deleted Thread
        return false;
      title_a = title_td.find "a[id^='thread_title_']";
      rep_count_a = @jdom.find("td > a[href*='misc.php?do=whoposted']")
      view_count_td = rep_count_a.parent().find("+td");
      #get tid and url
      @tid = parseInt title_td.attr("id").match(/\d+$/)[0];
      @url = title_a.attr "href";
      @title = title_a.text();
      @replyCount = rep_count_a.text().parseNum()
      @viewCount = view_count_td.text().parseNum();
      #build data for dom
      jdom.attr("data-tid",@tid);
      jdom.attr("data-type","thread");
      #save original background
      @jdom.find("td").each ->
        $(this).attr("_originBackgroundColor",$(this).css("backgroundColor"));
      #pages info
      @page = {
        num:1
      }
      @page.num = parseInt(title_td.find("span a[href*='&page=']:last").attr("href")?.match(/&page=(\d+)/)?[1]) or @page.num;
    bind:(evtName,callback,context = this)->
      @jdom.bind evtName,=>
        callback.call(this)
    restoreToOldRowColor:->
      @jdom.find("td").each ->
        $(this).css("backgroundColor",$(this).attr("_originBackgroundColor"));
    restoreToHoverRowColor:->
      @jdom.find(">td").css
        backgroundColor:"#BFD6FF"
    restoreToClickedRowColor:->
      @jdom.find(">td").css
        backgroundColor:"#72A5FF"

  g.set("Threads",new ThreadManager()) if !g.get("Threads")?
  g.set("ThreadList",ThreadManager);
  g.set("Thread",Thread);
  return {
    Thread:Thread,
    ThreadList:ThreadManager
  }