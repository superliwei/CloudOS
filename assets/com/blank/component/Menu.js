CloudOS.Menu = (function(){
	function Menu(_data)
	{
		this.data = _data;
		this.view = $("<div>",{'class':"CloudOS Menu"})
		this.init();
	}
	
	Menu.prototype.init = function()
	{
		this.selectedItem = null;
		this.ct = $("<div>");
		this.ct.appendTo(this.view);
		var len = this.data.length;
		for(var i=0;i<len;i++)
		{
			var item = Menu.createItem(this.data[i],this);
			item.view.appendTo(this.ct);
		}
		this.view.mousedown(function(e){
			e.stopPropagation();
			$(document).trigger(CloudOS.CoreEvent.DOCUMENT_DOWN,"Menu");
		});
	}
	
	Menu.prototype.selectItem = function(_item)
	{
		if(this.selectedItem!=null)
		{
			this.selectedItem.select(false);
		}
		if(_item!=null)_item.select(true);
		this.selectedItem = _item;
	}
	
	Menu.prototype.show = function()
	{
		this.view.appendTo(CloudOS.CoreSystem.desktop.menuLayer);
	}
	
	Menu.prototype.moveTo = function(_x,_y)
	{
		this.view.offset({left:_x,top:_y});
	}
	
	Menu.prototype.destroy = function()
	{
		this.selectItem(null);
		this.view.remove();
	}
	
	Menu.createItem = function(_data,_menu)
	{
		var item;
		var type = _data.type;
		switch(type)
		{
			case "separator":
				item = new Menu.Separator();
				break;
			default:
				item = new Menu.LabelItem(_data,_menu);
		}
		return item;
	}
	
	Menu.ITEM_CLICK = "Menu_itemClick";
	
	/**
	 * 菜单子项
	 */
	
	Menu.Separator = function()
	{
		this.view = $("<div>",{'class':"Separator"});
	}
	
	Menu.LabelItem = function(_data,_menu)
	{
		this.data = _data;
		this.menu = _menu;
		this.view = $("<div>",{'class':"LabelItem"});
		this.view.text(this.data.label);
	    if(this.data.icon!=undefined)
	    {
	        this.setIcon(this.data.icon);
	    }
		if(this.data.children!=undefined)
		{
			this.arrow = $("<div>",{'class':"arrow"});
			this.arrow.appendTo(this.view);
		}
		this.initEvents();
	}
	
	Menu.LabelItem.prototype.setIcon = function(_url)
	{
	    if(this.icon!=undefined)
	    {
	        this.icon.remove();
	    }
	    this.icon = $("<img>",{
	   		src:_url,
	   		onDragStart:"return false;"
	   	});
	    this.icon.appendTo(this.view);
	}
	
	Menu.LabelItem.prototype.initEvents = function()
	{
		this.view.mouseover(this,function(e){
			e.data.menu.selectItem(e.data);
		});
		if(this.data.children == undefined)
		{
			this.view.click(this,function(e){
	            e.data.menu.view.trigger(Menu.ITEM_CLICK, e.data);
			});
		}
	}
	
	Menu.LabelItem.prototype.select = function(value)
	{
		Menu.BasicItem.prototype.select.call(this,value);
	}
	
	Menu.BasicItem = function(){}
	
	Menu.BasicItem.prototype.select = function(value)
	{
		this.view[value ? "addClass" : "removeClass"]("selected");
		
		if(this.data.children!=undefined)
		{
			if(value)
			{
				this.submenu = new Menu(this.data.children);
				this.submenu.show();
				var tx = this.view.offset().left + this.menu.ct.width();
				var ty = this.view.offset().top;
				this.submenu.moveTo(tx,ty);
	            this.submenu.view.bind(Menu.ITEM_CLICK,this,function(e,item){
	                e.data.menu.view.trigger(Menu.ITEM_CLICK,item);
	            });
			}
			else
			{
				this.submenu.destroy();
			}
		}
	}
	
	return Menu;
})();