var Button =  function(_option)
{
	this.option = _option;
	this.icon = null;
	this.init();
}

Button.CLICK = "Button_click";
Button.MOUSE_DOWN = "Button_mousedown";

Button.prototype.init = function()
{
	this.view = $("<div>",{
		style:"position:absolute"
	});
    if(this.option.text!=undefined)
    {
        this.view.css("word-break","keep-all");
        this.view.css("white-space","nowrap");
        this.view.css("font-size",14);
        this.view.css("padding-left",5);
        this.view.css("padding-right",5);
        this.view.text(this.option.text);
    }
	if(this.option.icon!=undefined)
	{
        this.setIcon(this.option.icon);
	}
	if(this.option.width!=undefined)
	{
		this.view.width(this.option.width);
	}
	if(this.option.height!=undefined)
	{
		this.view.height(this.option.height);
        this.view.css("line-height",this.option.height+"px");
	}
    this.view.css("background-color","#ffffff");
    this.view.css("border-radius",3);

    this.bt = $("<div>",{
        style:"position:absolute;border-radius:3;"
    });
    this.bt.width(this.view.width());
    this.bt.height(this.view.height());
    this.bt.appendTo(this.view);

    this.mask = this.bt.clone();

    if(this.option.enabled!=undefined)
    {
        this.enable(this.option.enabled);
    }
    else
    {
        this.enable(true);
    }

    this.bt.bind("click",this,this.clickHandler);
    this.bt.bind("mousedown",this,this.mousedownHandler);
}

Button.prototype.setIcon = function(_url)
{
    if(this.icon!=undefined)
    {
        this.icon.remove();
    }
    this.icon = $("<img>",{
        src:_url,
        style:"position:absolute",
        onDragStart:"return false;"
    });
    this.icon.prependTo(this.view);
}

Button.prototype.clickHandler = function(e)
{
    var self = e.data;
    self.view.trigger(Button.CLICK,self);
}

Button.prototype.mousedownHandler = function(e)
{
    var self = e.data;
    self.view.css("-webkit-filter","brightness(0.5)");
    self.view.trigger(Button.MOUSE_DOWN,self);
    $(document).bind("mouseup",mouseupHandler);

    function mouseupHandler()
    {
        self.view.css("-webkit-filter","brightness(1)");
        $(document).unbind("mouseup",mouseupHandler);
    }
}

Button.prototype.moveTo = function(_x,_y)
{
	this.view.css("left",_x);
	this.view.css("top",_y);
}

Button.prototype.enable = function (value)
{
    this.view.css("opacity",value?1:0.5);
    if(value)
    {
        this.mask.remove();
    }
    else
    {
        this.mask.appendTo(this.view);
    }
}