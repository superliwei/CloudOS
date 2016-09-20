CloudOS.ComboBox = (function(){
	function ComboBox(_option)
	{
		this.option = _option;
		this.init();
	}
	
	ComboBox.OPEN = "ComboBox_open";
	
	ComboBox.prototype.init = function()
	{
		this.view = $("<div>",{'class':"CloudOS ComboBox"});
	
		this.bt = new CloudOS.Button(this.option);
		this.bt.view.appendTo(this.view);
		this.arrowBt = new CloudOS.Button({
			icon:"assets/images/arrowD.png",
			width:14,
			height:24
		});
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
	    this.arrowBt.view.bind('click',this,this.downHandler);
	}
	
	ComboBox.prototype.downHandler = function(e)
	{
	    var self = e.data;
		self.view.trigger(ComboBox.OPEN);
		
	    var menu = new CloudOS.Menu(self.option.menu);
	    menu.view.bind(CloudOS.Menu.ITEM_CLICK,itemClickHandler);
	    menu.show();
	    var tx = self.view.offset().left-1;
	    var ty = self.arrowBt.view.offset().top + self.arrowBt.view.height();
	    menu.moveTo(tx,ty);
	    self.arrowBt.enable(false);
	    self.arrowBt.view.css("opacity",1);
	    self.arrowBt.view.css("background-image","url(assets/images/blueAlphaBg1.png)");
	    self.arrowBt.setIcon("assets/images/arrowD0.png");
	
	    $(document).bind("mousedown",this,mousedownHandler);
	    $(document).bind(CloudOS.CoreEvent.DOCUMENT_DOWN,this,mousedownHandler);
	
	    function mousedownHandler(e,from)
	    {
	        if(from == "Menu")return;
	        menu.destroy();
	        self.arrowBt.enable(true);
	        self.arrowBt.view.css("background-image","none");
	        self.arrowBt.setIcon("assets/images/arrowD.png");
	        $(document).unbind("mousedown",mousedownHandler);
	        $(document).unbind(CloudOS.CoreEvent.DOCUMENT_DOWN,mousedownHandler);
	    }
	
	    function itemClickHandler(e,item)
	    {
	        self.view.trigger(CloudOS.Menu.ITEM_CLICK,item);
	        mousedownHandler();
	    }
	}
	
	return ComboBox;
})();