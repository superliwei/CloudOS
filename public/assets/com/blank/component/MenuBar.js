/**
 * 菜单条
 */

CloudOS.MenuBar = (function(){
	
	function MenuBar()
	{
		this.init();
	}
	
	MenuBar.prototype.init = function()
	{
		this.view = $("<div>",{'class':"CloudOS MenuBar"});
		this.items = [];
		this.selectedItem = null;
		$(document).mousedown(this,mousedownHandler);
		$(document).bind(CloudOS.CoreEvent.DOCUMENT_DOWN,this,mousedownHandler);
	
		function mousedownHandler(e,from)
		{
	        if(from == "Menu")return;
			if(e.data.selectedItem!=null)
			{
				e.data.selectItem(null);
			}
		}
	
	    this.view.bind(CloudOS.Menu.ITEM_CLICK,this,function(e,item){
	        e.data.selectItem(null);
	    });
	}
	
	MenuBar.prototype.selectItem = function(_item)
	{
		if(this.selectedItem!=null)
		{
			if(this.selectedItem === _item)return;
			this.selectedItem.select(false);
		}
		if(_item!=null)_item.select(true);
		this.selectedItem = _item;
	}
	
	MenuBar.prototype.setSource = function(_source)
	{
		this.clear();
		this.source = _source;
		var len = this.source.items.length;
		for(var i=0;i<len;i++)
		{
			var item = MenuBar.createItem(this.source.items[i],this);
			item.view.appendTo(this.view);
			this.items.push(item);
			this.initItem(item);
		}
	}
	
	MenuBar.prototype.initItem = function(_item)
	{
		var self = this;
		_item.view.mousedown(function(e){
			e.stopPropagation();
			$(document).trigger(CloudOS.CoreEvent.DOCUMENT_DOWN,"MenuBar");
			self.selectItem(_item);
		});
		_item.view.mouseover(function(){
			if(self.selectedItem!=null)self.selectItem(_item);
		});
	}
	
	MenuBar.prototype.clear = function()
	{
		this.selectedItem = null;
		while(this.items.length>0)
		{
			var item = this.items[0];
			item.destroy();
			this.items.shift();
		}
	}
	
	MenuBar.createItem = function(_data,_menuBar)
	{
		var item;
		if(_data.img!=undefined)
		{
			item = new MenuBar.IconItem(_data,_menuBar);
		}
		else if(_data.label!=undefined)
		{
			item = new MenuBar.LabelItem(_data,_menuBar);
		}
		return item;
	}
	
	/**
	 * 菜单项
	 */
	
	MenuBar.IconItem = function(_data,_menuBar)
	{
		this.data = _data;
		this.menuBar = _menuBar;
		this.view = $("<div>",{'class':"IconItem"});
		this.view.height(this.menuBar.source.height);
		var span = $("<span>");
		span.appendTo(this.view);
		this.icon = $("<img>",{
			src:this.data.img,
			onDragStart:"return false;"
		}).appendTo(span);
	}
	
	MenuBar.IconItem.prototype.select = function(value)
	{
		MenuBar.BasicItem.prototype.select.call(this,value);
	}
	
	MenuBar.IconItem.prototype.destroy = function()
	{
		MenuBar.BasicItem.prototype.destroy.call(this);
	}
	
	//---------------------------------------------------
	
	MenuBar.LabelItem = function(_data,_menuBar)
	{
		this.data = _data;
		this.menuBar = _menuBar;
		this.view = $("<div>",{'class':"LabelItem"});
		this.view.text(this.data.label);
		this.view.css("line-height",this.menuBar.source.height+"px");
		if(this.data.bold)this.view.css("font-weight","bold");
	}
	
	MenuBar.LabelItem.prototype.select = function(value)
	{
		MenuBar.BasicItem.prototype.select.call(this,value);
	}
	
	MenuBar.LabelItem.prototype.destroy = function()
	{
		MenuBar.BasicItem.prototype.destroy.call(this);
	}
	
	MenuBar.BasicItem = function(){}
	
	MenuBar.BasicItem.prototype.select = function(value)
	{
		this.view[value ? "addClass" : "removeClass"]("selected");
		if(this.data.children!=undefined)
		{
			if(value)
			{
				this.menuBar.view.trigger(CloudOS.Menu.OPEN,this);
				this.submenu = new CloudOS.Menu(this.data.children);
				this.submenu.view.data("owner",this.menuBar);
				this.submenu.view.css("border-top-left-radius",0);
				this.submenu.view.css("border-top-right-radius",0);
				this.submenu.show();
				var tx = this.view.offset().left;
				var ty = this.view.offset().top+this.view.height();
				this.submenu.moveTo(tx,ty);
	            this.submenu.view.bind(CloudOS.Menu.ITEM_CLICK,this,function(e,item){
	                e.data.menuBar.view.trigger(CloudOS.Menu.ITEM_CLICK,item);
	            });
			}
			else
			{
				this.submenu.destroy();
			}
		}
	}
	
	MenuBar.BasicItem.prototype.destroy = function()
	{
		this.view.remove();
		this.menuBar = null;
		this.data = null;
	}
	
	return MenuBar;

})();