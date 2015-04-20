define([], function () {
    var htmlTemplate = "" +
        "<div id='plk_contentbar' class='cmnw plk_contentbar'>" +
            "<div data-bind='foreach: BarItems'>" +
                "<div class='bar-item-wrapper' data-bind='attr:{id:id},css:{active:_state.open}'>" +
                    "<a href='javascript:;' class='handler animated'  data-bind='template:{name:barButton.template,data:container.data},click:barButtonClick'></a>" +
                    "<div class='bar-item-container animated' data-bind='template: {name:container.template,data:container.data},css:{fadeInLeft:_state.open}'></div>" +
                "</div>" +
            "</div>" +
        "</div>",
        $backDrop = $("<div id='plk_contentbar_bd' class='plk_backdrop' data-bind='" +
            "visible:showBD" +
            "'></div>")
    var $bar = null;

    function init() {
        $bar = $("#plk_contentbar");
        if ($bar.length == 0) {
            $bar = $(htmlTemplate);
            $bar.appendTo(document.body);
            $backDrop.appendTo(document.body);
            ko.setTemplateEngine(createStringTemplateEngine(new ko.nativeTemplateEngine(), getData().templates));
            ko.applyBindings(getData(),$bar[0]);
            ko.applyBindings(getData(),$backDrop[0]);
        }
    }

    function getData() {
        if (_.isUndefined(window.ContentBar)) {
            window.ContentBar = {
                BarItems : ko.observableArray([]),
                templates : {},
                closeAll:function(){
                    var baritems = this.BarItems();
                    for(var i=0;i<baritems.length;i++){
                        baritems[i].closePanel();
                    }
                }
            }
            window.ContentBar.showBD = ko.computed(function(){
                var baritems = window.ContentBar.BarItems();
                for(var i=0;i<baritems.length;i++){
                    if(baritems[i]._state.open()==true){
                        return true
                    }
                }
                return false;
            })
        }
        return window.ContentBar;
    }
    function updateDate(data){
        window.ContentBar = data;
    }
    $backDrop.on("click",function(){
        getData().closeAll();
    })
    var bd = {
        open:function(){
            $backDrop.show();
        },
        close:function(){
            $backDrop.hide();
        }
    }
    function BarItemDefault(){
        this.$bar = {}
        this.event = {
            init:function(){},
            open:function(){},
            close:function(){}
        }
        this.flash=function(){
            if(this._state.flashing == false){
                this.$barButton.removeClass("flash").addClass("flash");
                this._state.flashing = true
                var that = this;
                setTimeout(function(){
                    that._state.flashing = false;
                },1000)
            }
        }
        this._state={
            open:ko.observable(false),
            flashing:ko.observable(false)
        }
        this.closePanel=function(){
            this.event.close.call(this)
            this._state.open(false)
        }
        this.openPanel=function(){
            window.ContentBar.closeAll();
            this.event.open.call(this)
            this._state.open(true);
        }
        this.barButtonClick=function(barItem){
            if(this._state.open() == false){
                this.openPanel();
            }else{
                this.closePanel();
            }
        }
    }

    var exports = {
        name: "ContentBar",
        friendlyName: "Notification Bar",
        settings: {
            active: {
                allowConfig: false
            }
        },
        init: function () {

        },
        run: function () {
            init();
            this.addBarItem({
                id:"setting_bar",
                barButton:{
                    template:"setting_barButton"
                },
                templates:{
                    setting_barButton:"<a href='{0}' target='_blank'><i class='fa fa-cogs'></i></a>".format(eUrl("/html/options.html")),
                    setting_container:"<div class='no-container'></div>"
                },
                container:{
                    template:"setting_container",
                    data:{}
                },
                barButtonClick:function(){
                    return true;
                }
            })
        },
        addBarItem : function(barItem){
            barItem = $.extend(true,{},new BarItemDefault(),barItem);
            var data=getData();
            barItem.$bar = function(){return $("#"+barItem.id)};

            for(var tmpl in barItem.templates){
                if(barItem.templates.hasOwnProperty(tmpl)){
                    data.templates[tmpl] = barItem.templates[tmpl];
                }
            }

            data.BarItems.push(barItem)
            updateDate(data);
            return barItem;
        }
    }
    return exports
})
