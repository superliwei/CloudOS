CloudOS.Menu = (function(){
	function Menu(_data)
	{
		this.data = _data;
		this.view = $("<div>",{'class':"CloudOS Menu"})
		this.init();
	}
	
	Menu.OPEN = "Menu_open";
	Menu.ITEM_CLICK = "Menu_itemClick";
	
	Menu.prototype.init = function()
	{
		this.selectedItem = null;
		this.ct = $("<div>",{'class':"itemContainter"});
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
		//图标
		this.iconDiv = $("<div>",{'class':"iconContainer"});
		this.iconDiv.appendTo(this.view);
		//文字
		this.labelDiv = $("<div>");
		this.labelDiv.appendTo(this.view);
		this.labelDiv.text(this.data.label);
		//快捷键
		this.rightDiv = $("<div>",{'class':"cmdContainer"});
		this.rightDiv.appendTo(this.view);
		this.rightDiv.text(this.data.cmd);
		//箭头
		this.arrowDiv = $("<div>",{'class':"iconContainer"});
		this.arrowDiv.appendTo(this.view);
		
	    if(this.data.icon!=undefined)
	    {
	        this.setIcon(this.data.icon);
	    }
		if(this.data.children!=undefined)
		{
			this.arrow = $("<div>",{'class':"arrow"});
			this.arrow.appendTo(this.arrowDiv);
		}
		var enabled = this.data.enabled != undefined ? this.data.enabled : true;
		this.setEnabled(enabled);
		this.initEvents();
	}
	
	Menu.LabelItem.prototype.setEnabled = function(value)
	{
		this.view[value ? "removeClass" : "addClass"]("disabled");
	}
	
	Menu.LabelItem.prototype.setIcon = function(_url)
	{
	    if(this.icon!=undefined)
	    {
	        this.icon.remove();
	    }
	    this.icon = $("<div>",{'class':"icon"});
	   	this.icon.css("background-image","url("+_url+")");
	    this.icon.appendTo(this.iconDiv);
	}
	
	Menu.LabelItem.prototype.initEvents = function()
	{
		this.view.mouseover(this,function(e){
			e.data.menu.selectItem(e.data.view.hasClass("disabled") ? null : e.data);
		});
		if(this.data.children == undefined)
		{
			this.view.click(this,function(e){
				if(e.data.view.hasClass("disabled"))return;
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
				this.menu.view.data("owner").view.trigger(Menu.OPEN,this);
				this.submenu = new Menu(this.data.children);
				this.submenu.view.data("owner",this.menu.view.data("owner"));
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