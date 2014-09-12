function trace(obj)
{
    console.log(obj);
}

var Preloader = function()
{
    var self = this;
    this.view = $("<div>");
    this.logo = $("<div>",{style:"position:absolute;display:none;"});
    this.img = $("<img>",{
        src:"assets/images/logo.png",
        style:"position:absolute;left:-22px;top:-24px;"
    }).appendTo(this.logo);
    this.logo.appendTo(this.view);
    $(window).bind("resize",this,this.resizeHandler);
    this.img.get(0).onload = function()
    {
        self.logo.fadeIn("slow");
    }

    //解决body滚动的问题
    document.body.onmousewheel = function(){
        $(document.body).scrollTop(0);
    };

    document.body.onload = function()
    {
        CoreSystem.start(function(){
            self.logo.fadeOut("fast",function(){
                self.destroy();
            });
        });
    }
}

Preloader.prototype.appendTo = function(_parentView)
{
    this.view.appendTo(_parentView);
    this.resizeHandler({data:this});
}

Preloader.prototype.resizeHandler = function(e)
{
    var self = e.data;
    var tx = $(window).width()*0.5;
    var ty = $(window).height()*0.5;
    self.logo.offset({left:tx,top:ty});
}

Preloader.prototype.destroy = function()
{
    $(window).unbind("resize",this.resizeHandler);
    this.view.remove();
    Preloader._instance = null;
}

Preloader._instance = null;
Preloader.instance = function()
{
    if(Preloader._instance == null)
    {
        Preloader._instance = new Preloader();
    }
    return Preloader._instance;
}

Preloader.start = function()
{
    Preloader.instance().appendTo($(document.body));
}

Preloader.start();