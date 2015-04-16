define ["Global"],(g)->

  Threads = g.get("Threads");
  ThreadList = g.get("ThreadList");
  Thread = g.get("Thread");
  panel = null;
  g.set("URL",{
    host: "http://vozforums.com/"
    forumdisplay : "forumdisplay.php"
    showthread : "showthread.php"
  })
  ThreadList::deselectAll = ->
    for thread in this
      thread._deselect() if thread.selected is true
  Thread::selected = false;
  Thread::currentSelected = false;
  Thread::_select = ->
    @restoreToClickedRowColor();
    @jdom.addClass("ThreadReview-row-clicked")
    quickReviewPanelShow();
    @selected = true;
    return;
  Thread::_deselect = ->
    @jdom.removeClass("ThreadReview-row-clicked")
    quickReviewPanelHide();
    @selected = false;
    if @currentSelected is true
      @restoreToHoverRowColor();
    else
      @restoreToOldRowColor();
    return;
  Thread::select = ->
    #  Global.log(@selected);
    thread.currentSelected = false for thread in Threads
    @currentSelected = true;
    if @selected is true
      @_deselect()
    else
      Threads.deselectAll();
      panelToLoading();
      @_select();
      panel.find(".post-misc-reply-data").text(@replyCount)
      panel.find(".post-misc-view-data").text(@viewCount)
      panel.find(".preview-firstpost").unbind().click =>
        panelToLoading();
        @preview "first";
      panel.find(".preview-lastpost").unbind().click =>
        panelToLoading();
        @preview "last";
      panel.find(".btn-go").unbind().click =>
        @_lastPreviewPreloader.replaceContent();
      panel.find(".btn-go-newtab").attr("href",@url).attr("target","_blank");
      panel.find(".btn-close").unbind().click =>
        @_deselect();
        @restoreToOldRowColor();
      panel.find(".preview-firstpost").trigger("click");

  Thread::getPost = (which ="first",callback = null) ->
    url = g.get("URL").showthread+"?t=#{@tid}";
    if which is "last"
      url += "&page=#{@page.num}"
    loader = new Preloader(url);
    loader.preload false,
      f:(html,preloader) =>
        $dom = $(html);
        $post = $dom.find("table[id^=post]:#{which}")
        callback.call(this,$post,loader);
  Thread::preview = (which="first") ->
    @_lastPreviewPreloader = @getPost which,($post,preloader)=>
      return false if @currentSelected is false
      postDiv = $post.find("div[id^=post_message]");
      postContent = postDiv.html();
      container = panel.find(".ThreadReview-post-content")
      container.attr("id",postDiv.attr("id"))
      container.hide();
      container.html(postContent);
      container.fadeIn(300);
      container.mCustomScrollbar
        scrollInertia:0
        advanced:
          updateOnBrowserResize:true,
          updateOnContentResize:true,
          autoExpandHorizontalScroll:false
      Modules.get("RemoveRedirect")?.reload();
      Modules.get("MinimizeQuotes")?.reload();
      Modules.get("LinkDetector")?.reload();
      preloader.callback = false;
    return;
  bindingToThread = ->
    Threads.bind "click",(e)->
      @select();
  panelToLoading = ->
    panel.find(".ThreadReview-post-content")
      .empty()
      .append($("""<center><img class='content-loader' src='#{chrome.extension.getURL("img/content-loader.gif")}'/></center>"""))
  quickReviewPanelInit =->
    panel = $ """
      <div class='ThreadReview-wrapper css-bootstrap'>
        <div class='ThreadReview-panel'>
          <div class="ThreadReview-controls">
            <div class="btn-group btn-preview">
              <button class="btn dropdown-toggle" data-toggle="dropdown">Xem trước <span class="caret"></span></button>
                <ul class="dropdown-menu">
                  <li><a href="javascript:void(0)" class='preview-firstpost'>Bài đầu tiên</a></li>
                  <li><a href="javascript:void(0)">Bài chưa xem</a></li>
                  <li><a href="javascript:void(0)" class='preview-lastpost'>Bài cuối cùng</a></li>
                </ul>
            </div>
            <div class="btn-group btn-go-option">
              <button class="btn btn-success btn-go">Xem thớt</button>
              <button class="btn btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li><a href="javascript:void(0)" class='btn-go-newtab'>Xem thớt trong tab mới</a></li>
              </ul>
            </div>
            <button class="btn btn-danger btn-close">Đóng</button>
             </div>
            <div class="ThreadReview-post-content">

            </div>
            <div class="ThreadReview-post-misc">
              <div class='post-misc-rate'></div>
              <div class='post-misc-reply'>
              <span class='post-misc-reply-data'></span>
              <br/><i class='icon-comment icon-white'/>
              </div>
              <div class='post-misc-view'>
              <span class='post-misc-view-data'></span>
              <br/><i class='icon-eye-open icon-white'/>
              </div>
            </div>
          </div>
        </div>
          """
    panel.hide();
    $(".page").append(panel)
  quickReviewPanelShow=->
    _panel=panel.find(".ThreadReview-panel")
    console
    panel.css
      display:"block",
      visibility:"hidden"
    _panel.css
      right:-_panel[0].offsetWidth
      visibility:"visible"
    panel.show();
    _panel.stop().animate({right:0},400)
  quickReviewPanelHide=->
    _panel=panel.find(".ThreadReview-panel")
    _panel.stop().animate({right:-_panel.width()},200,->
      panel.hide()
    );
  bindingToThread();
  #quickTooltip();
  quickReviewPanelInit();
  return;