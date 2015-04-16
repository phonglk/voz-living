define [
  'Thread/Thread',
  'Thread/ThreadList',
  'Thread/User',
  'Thread/ThreadListVM',
  'Thread/Post'
  'Global'
  ],(Thread,ThreadList,User,ThreadListVM,Post,g)->
    threads = new ThreadList();
    $forum = $ "tbody[id^='threadbits_forum_']"
    $threads = $forum.find ">tr"
    $threads.each (i,e)->
      $e = $(e)
      $title = $e.find "td[id^='td_threadtitle_']"
      debugger;
      if $title.length isnt 0
        thr = {};
        $title_a = $title.find "a[id^='thread_title_']"
        $repCount_a = $e.find "td > a[href*='misc.php?do=whoposted']"
        $viewCount_a = $repCount_a.parent().find "+td"
        $user = $title.find("[onclick*='member.php?u']");
        thr.tid = parseInt $title.attr("id").match(/\d+$/)[0];
        thr.url = $title_a.attr "href"
        thr.title = $title_a.text();
        thr.replyCount = $repCount_a.text().parseNum();
        thr.viewCount = $viewCount_a.text().parseNum();
        thr.pageCount = parseInt($title.find("span a[href*='&page=']:last").attr("href")?.match(/&page=(\d+)/)?[1]) or 1;
        thr.isSticky = $title.find(".vozsticky").length isnt 0
        if $title.find("img[alt^='Thread Rating']").length>0
          thr.rating = parseFloat($title.find("img[alt^='Thread Rating']").attr("alt").match(/,[^\d]*([\d\.]+)[^\d]*average/)[1]);
        if $e.find("td[id*='threadstatusicon'] img").length>0
          thr.type = $e.find("td[id*='threadstatusicon'] img").attr("src").match(/([^/]*)\.gif/)[1]
        thr.author = new User({
          username:$user.text()
          uid:parseInt($user.attr("onclick").match(/\?u=(\d+)/)[1])
        })
        thr.lastPost = new Post({
          author:new User({username:$e.find("a[href*='lastposter']").text()})
        })

        thread = new Thread(thr);
        threads.add(thread)
    g.set("Threads",threads)
    $forum.empty()
    colspan = $forum.parent().find("tbody:eq(0) tr:eq(1) td").length
    $forum.append "<tr><td id='f17l_replaceContent' colspan='#{colspan}'></td></tr>"
    $replacedContent = $ "#f17l_replaceContent";
    threadsVM = new ThreadListVM(threads);

    html="""
<div id='threadList' data-bind="foreach:threads">
  <div class='f17l_thread'>
    <div class='f17l_author_avatar'>
    </div>
    <div class='f17l_title'>
      <a href="#" data-bind='text: title,attr:{href: url}'></a>
      <a href="#" data-bind='text: author.username,attr:{href: author.profile_link()}' class='f17l_post_author'></a>
      <div class='f171_sticky' data-bind='visible: isSticky'>Sticky</div>
      <div class='f171_rating' data-bind='text:rating,visible: rating > 0'></div>
    </div>
    <div class="f17l_info">
      Replies: <span data-bind="text: replyCount"></span><br/>
      Views: <span data-bind="text: viewCount"></span><br/>
    </div>
    <div class="f17l_lastPost">
      by <a href="#" data-bind="text: lastPost.author.username,attr:{href: lastPost.author.profile_link()}" class='f17l_lasted_author'></a>
    </div>
    </div> </div>
    """
    $replacedContent.append(html);
    ko.applyBindings(threadsVM);





