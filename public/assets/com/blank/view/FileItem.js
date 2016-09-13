/**
 * 文件图标组件
 */

CloudOS.FileItem = (function(){
	function FileItem(_option)
	{
		var self = this;
		this.option = _option || {};
		this.mode = this.option.mode || "A";
	    this.file = new CloudOS.File(this.option);
	    this.view = $("<div>",{'class':"CloudOS FileItem"});
		this.imgBox = $("<div>",{'class':"imgBox"});
		this.imgBox.appendTo(this.view);
		this.imgPlaceHolder = $("<div>",{'class':"imgPlaceHolder"});
		this.imgPlaceHolder.appendTo(this.imgBox);
	
		var img = new Image();
	    img.src = CloudOS.IconMap.getIcon(this.file.type);
		img.onload = function()
		{
	        $(img).attr("onDragStart","return false;");
			$(img).appendTo(self.imgPlaceHolder);
			self.imgPlaceHolder.css("border","none");
		}
		
		this.label = $("<div>",{'class':"label"});
		this.setLabel(this.file.name);
		if(this.option.color!=undefined)this.label.css("color",this.option.color);
		if(this.option.textShadow!=undefined)this.label.css("text-shadow",this.option.textShadow);
		this.label.appendTo(this.view);
	
		switch(this.mode)
		{
			case "A":
				this.initEventsA();
				break;
			case "B":
				this.initEventsB();
				break;
		}
	}
	
	FileItem.prototype.setLabel = function(str)
	{
		this.label.text(str);
		this.label.addClass('CloudOS-FileItem-label');
		this.label.appendTo('body');
		var maxW = 100;
		var w = this.label.outerWidth();
		if(w > maxW)
		{
			this.label.outerWidth(maxW);
			this.label.css("left",0);
			this.label.addClass("multiline");
		}
		else
		{
			this.label.css("left",(maxW-w)*0.5);
		}
		this.label.remove();
		this.label.removeClass('CloudOS-FileItem-label');
	}
	
	FileItem.prototype.moveTo = function(_x,_y)
	{
		this.view.css("left",_x);
		this.view.css("top",_y);
	}
	
	FileItem.prototype.initEventsA = function()
	{
		var self = this;
		this.view.bind("mousedown",function(e){
			e.stopPropagation();
			$(document).trigger(CloudOS.CoreEvent.DOCUMENT_DOWN,self.option.flag);
			var idx = FileItem.selectedItems.indexOf(self);
			if(FileItem.selectedItems.length<2 || idx==-1)
			{
				FileItem.selectItems([self]);
			}
			CloudOS.Dragger.startDrag(selectedItemViews(),e);
			$(document).bind("mouseup",mouseupHandler);
		});
	
		function mouseupHandler(e)
		{
			CloudOS.Dragger.stopDrag();
			$(document).unbind("mouseup",mouseupHandler);
		}
	
		function selectedItemViews()
		{
			var views = [];
			for(var i=0,len=FileItem.selectedItems.length;i<len;i++)
			{
				var item = FileItem.selectedItems[i];
				views.push(item.view);
			}
			return views;
		}
	
		this.view.dblclick(function(){
			//trace("双击");
	        self.file.openWithDefaultApplication();
		});
	}
	
	FileItem.prototype.initEventsB = function()
	{
		var moved;
		var self = this;
		var dp;
		this.view.mousedown(function(e){
			mousedownEffect();
			moved = false;
			dp = {x:e.clientX,y:e.clientY};
			$(document).bind("mousemove",mousemoveHandler);
			$(document).bind("mouseup",mouseupHandler);
		});
	
		function mousemoveHandler(e)
		{
	        if(e.clientX - dp.x == 0 && e.clientY - dp.y == 0)return;
			move = true;
		}
	
		function mouseupHandler(e)
		{
			if(!moved)
			{
				//trace("点击");
	            self.file.openWithDefaultApplication();
			}
			mouseupEffect();
			$(document).unbind("mousemove",mousemoveHandler);
			$(document).unbind("mouseup",mouseupHandler);
		}
	
		function mousedownEffect()
		{
			self.view.addClass("mousedown");
		}
	
		function mouseupEffect()
		{
			self.view.removeClass("mousedown");
		}
	}
	
	FileItem.prototype.select = function(value)
	{
		this.view[value ? "addClass" : "removeClass"]("selected");
		if(this.option.color!=undefined)this.label.css("color",value ? '' : this.option.color);
		if(this.option.textShadow!=undefined)this.label.css("text-shadow",value ? '' : this.option.textShadow);
	}
	
	FileItem.prototype.destroy = function()
	{
	    this.view.remove();
	    this.file.destroy();
	}
	
	FileItem.prototype.getSelectRect = function()
	{
	    var target = this.imgBox;
	    var rect = new CloudOS.Rect(target.offset().left,target.offset().top,target.width(),target.height());
	    return rect;
	}
	
	
	FileItem.selectedItems = [];
	FileItem.selectItems = function(items)
	{
		var item;
		var maxZ = 0;
		while(FileItem.selectedItems.length>0)
		{
			item = FileItem.selectedItems[0];
			var z = item.view.css("z-index");
			maxZ = (z!="auto" && z>maxZ)?z:maxZ;
			maxZ = Number(maxZ);
			item.select(false);
			FileItem.selectedItems.shift();
		}
		for(var i=0;i<items.length;i++)
		{
			item = items[i];
			item.select(true);
			item.view.css("z-index",maxZ+i+1);
		}
		FileItem.selectedItems = items;
	}
	
	return FileItem;
})();