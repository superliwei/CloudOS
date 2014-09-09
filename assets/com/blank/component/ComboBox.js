var ComboBox = function(_option)
{
	this.option = _option;
	this.init();
}

ComboBox.prototype.init = function()
{
	this.view = $("<div>",{
		style:"position:absolute"
	});

	this.bt = new Button(this.option);
	this.bt.view.appendTo(this.view);
	this.bt.view.css("border-top-right-radius",0);
	this.bt.view.css("border-bottom-right-radius",0);
	this.arrowBt = new Button({
		icon:"assets/images/arrowD.png",
		width:14,
		height:24
	});
	this.arrowBt.view.css("border-top-left-radius",0);
	this.arrowBt.view.css("border-bottom-left-radius",0);
	this.arrowBt.view.appendTo(this.view);
	this.arrowBt.moveTo(this.bt.view.width(),0);
	
	this.width = this.bt.view.width()+this.arrowBt.view.width();
	this.height = this.bt.view.height();

    this.initEvents();
}

ComboBox.prototype.moveTo = function(_x,_y)
{
	this.view.css("left",_x);
	this.view.css("top",_y);
}

ComboBox.prototype.initEvents = function()
{
    this.arrowBt.view.bind(Button.CLICK,this,this.downHandler);
}

ComboBox.prototype.downHandler = function(e)
{
    var self = e.data;
    var menu = new Menu(self.option.menu);
    menu.view.bind(Menu.ITEM_CLICK,itemClickHandler);
    menu.show();
    var tx = self.view.offset().left-1;
    var ty = self.arrowBt.view.offset().top + self.arrowBt.view.height();
    menu.moveTo(tx,ty);
    self.arrowBt.enable(false);
    self.arrowBt.view.css("opacity",1);
    self.arrowBt.view.css("background-image","url(assets/images/blueAlphaBg1.png)");
    self.arrowBt.setIcon("assets/images/arrowD0.png");

    $(document).bind("mousedown",this,mousedownHandler);
    $(document).bind(CoreEvent.DOCUMENT_DOWN,this,mousedownHandler);

    function mousedownHandler(e,from)
    {
        if(from == "Menu")return;
        menu.destroy();
        self.arrowBt.enable(true);
        self.arrowBt.view.css("background-image","none");
        self.arrowBt.setIcon("assets/images/arrowD.png");
        $(document).unbind("mousedown",mousedownHandler);
        $(document).unbind(CoreEvent.DOCUMENT_DOWN,mousedownHandler);
    }

    function itemClickHandler(e,item)
    {
        self.view.trigger(Menu.ITEM_CLICK,item);
        mousedownHandler();
    }
}