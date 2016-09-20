/**
 * 文件图标组件列表样式
 */
CloudOS.FileItemTypeC = (function(){
	
	FileItemTypeC.prototype.select = CloudOS.FileItem.prototype.select;
	FileItemTypeC.prototype.destroy = CloudOS.FileItem.prototype.destroy;
	FileItemTypeC.prototype.getSelectRect = CloudOS.FileItem.prototype.getSelectRect;
	
	function FileItemTypeC(_option)
	{
		var self = this;
	    this.option = _option || {};
	    this.file = new CloudOS.File(this.option);
	    this.view = $("<div>",{'class':"CloudOS FileItemTypeC"});
	   	this.imgBox = $("<div>",{'class':"imgBox"});
	    this.imgBox.appendTo(this.view);
	
	    var img = new Image();
	    img.src = CloudOS.IconMap.getIcon(this.file.type);
	    img.onload = function()
	    {
	        $(img).attr("onDragStart","return false;");
	        $(img).appendTo(self.imgBox);
	        self.imgBox.css("border-color","transparent");
	    }
	    
	   	this.label = $("<div>",{'class':"label"});
		this.label.text(this.file.name);
		if(this.option.color!=undefined)this.label.css("color",this.option.color);
		if(this.option.textShadow!=undefined)this.label.css("text-shadow",this.option.textShadow);
		this.label.appendTo(this.view);
	
	    $("<div>",{style:"clear:both;"}).appendTo(this.view);
	
	    this.initEvents();
	}
	
	FileItemTypeC.prototype.initEvents = function()
	{
	    CloudOS.FileItem.prototype.initEventsA.call(this);
	}
	
	return FileItemTypeC;
})();