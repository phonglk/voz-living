define(["moduleHelper", "lib/jquery-scrollto"], function (moduleHelper, jst) {
    var ThreadListVM = {
        Threads: {}
    }
    var ThreadVM = function (id) {
        var self = this;
        self.id = id;

        self.isActive = ko.observable(false);
        self.isLoading = ko.observable(false);
        self.isLoaded = ko.observable(false);

        self.href = ko.observable("http://vozforums.com/showthread.php?t=" + self.id);

        self.lastPage = ko.observable(1);
        self.content = ko.observable("");
        self.activeClick = function (t) {
            if (self.isActive()) {
                self.isActive(false);
            } else {
                self.isActive(true);
                load();
            }
        }
        self.last = function (t) {
            self.href("http://vozforums.com/showthread.php?t=" + self.id + "&page=" + self.lastPage());
            self.loadPostPosition(":last")
            resetLoad()
        }
        self.first = function () {
            self.href("http://vozforums.com/showthread.php?t=" + self.id + "&page=" + 1);
            self.loadPostPosition(":first")
            resetLoad()
        }
        self.close = function (t) {
            self.isActive(false);
            setTimeout(function () {
                $("#td_threadtitle_" + t.id).ScrollTo();
            }, 10)
        }

        self.curAjax = null;
        function resetLoad() {
            if (self.curAjax != null)self.curAjax.abort();
            self.isLoaded(false);
            self.isLoading(false);
            load();
        }
        self.loadPostPosition = ko.observable(":first");
        function load() {
            if (self.isLoaded()) {
                self.isLoading(false);
            } else {
                self.isLoading(true);
                self.curAjax = $.ajax({
                    url: self.href(),
                    success: function (html) {
                        CatchRequest.do(html);
                        self.isLoading(false);
                        var post = $(html).find("[id^='post_message']"+self.loadPostPosition()).html();
                        self.content(post);
                        self.isLoaded(true);
                        setTimeout(function () {
                            require(["LinkProcess/LinkProcess"], function (LinkProcess) {
                                LinkProcess.run($("#td_threadtitle_" + self.id).find(".preview_inner"));
                            })
                        }, 100)
                    }
                })
            }
        }
    }


    function isOnThreadListPage() {
        return /forumdisplay\.php/.test(location.href);
    }

    function paa_click(e) {
        var $this = $(this);
        var $thread_td = $this.parent();
    }

    var module = new moduleHelper.Module({
        name: "PreThread",
        friendlyName: "Preview Thread",
        settings: {
            active: {
                text: "Kích hoạt"
            }
        },
        init: function () {
            if (isOnThreadListPage() == false)return;
        },
        run: function () {
            if (isOnThreadListPage() == false)return;
            var $td_title_list = $("#threadslist tbody[id^='threadbits_forum'] tr td[id^='td_threadtitle_']")
            $("#threadslist")
                .addClass("plk_thread_list table table-bordered")
                .attr("data-bind", 'with: Threads')
            $td_title_list.each(function () {
                var $this = $(this);
                var thread_id = $this.attr("id").match(/\d+/)[0];
                var open_new_tab = $("<span class='open_new_tab'>&nbsp;<a href='" + $this.find("a[id^='thread_title_']").attr("href") + "' target='_blank' title=''><span class='icon-external-link'></span></a></span>");
                $this.find("a[id^='thread_title_']").after(open_new_tab)
                open_new_tab.find("a").on("click", function () {
                    var a = document.createElement("a");
                    a.href = $this.find("a[id^='thread_title_']").attr("href");
                    var evt = document.createEvent("MouseEvents");
                    //the tenth parameter of initMouseEvent sets ctrl key
                    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                        true, false, false, false, 0, null);
                    a.dispatchEvent(evt);
                    return false;
                })

                $this
                    .addClass("thread")
                    .attr("data-bind", "with: t" + thread_id);
                var $paa = $("<div class='preview_active_area' title='Xem trước thớt' data-bind='css:{active:isActive},click:activeClick'><i class='fa fa-bolt'></i></div>")
                $this.append($paa);
                $this.find("> div").css({
                    "paddingRight": 41
                })

                var $preview_box = $("<div class='preview_container cmnw' data-bind='css:{active:isActive}'>" +
                    "<div class='preview_inner'>" +
                    "<div class='loader' data-bind='visible:isLoading'><img src='" + eUrl("img/loader-1.gif") + "'/></div>" +
                    "<div class='content' data-bind='visible:isLoading() == false'>" +
                    "<div class='inner-content' data-bind='html:content'></div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='actions'>" +
                    "<a href='javascript:;' data-bind='click:last' class='btn'>Last</a>" +
                    "&nbsp;<a href='javascript:;' data-bind='click:first' class='btn'>First</a>" +
                    "&nbsp;<a href='' data-bind='attr:{href:href}' class='btn' target='_blank'>Tab mới</a>" +
                    "&nbsp;<a href='javascript:;' data-bind='click:close' class='btn btn-inverse' target='_blank'>Đóng</a>" +
                    "</div>" +
                    "</div>")
                $this.append($preview_box);

                var pages = $this.find(">div span > a");
                var lastPage = 1;
                if (pages.length > 0) {
                    try {
                        lastPage = pages.eq(pages.length-1).attr("href").match(/&page=(\d+)/)[1];
                    } catch (e) {
                        console.log("not has pages");
                    }
                }


                var tVM = new ThreadVM(thread_id);
                tVM.lastPage(lastPage)
                ThreadListVM.Threads["t" + thread_id] = tVM;
            })

            ko.applyBindings(ThreadListVM, $("#threadslist")[0])
        }
    })

    return module;
});
