/**
 * 文件图标组件列表样式
 */
CloudOS.FileItemTypeC = (function(){
	
	FileItemTypeC.prototype.select = CloudOS.FileItem.prototype.select;
	FileItemTypeC.prototype.destroy = CloudOS.FileItem.prototype.destroy;
	FileItemTypeC.prototype.getSelectRect = CloudOS.FileItem.prototype.getSelectRect;
	FileItemTypeC.prototype.enterToEditMode = CloudOS.FileItem.prototype.enterToEditMode;
	
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
		this.setLabel(this.file.name);
		if(this.option.color!=undefined)this.label.css("color",this.option.color);
		if(this.option.textShadow!=undefined)this.label.css("text-shadow",this.option.textShadow);
		this.label.appendTo(this.view);

		//添加编辑框
		this.isRenaming = false;
		this.renameInput = $("<input>");
		this.renameInput.appendTo(this.view);
	
	    this.initEvents();
	}

	FileItemTypeC.prototype.setLabel = function(str)
	{
		this.label.text(str);
	}
	
	FileItemTypeC.prototype.initEvents = function()
	{
	    var self = this;
		this.view.bind("mousedown",function(e){
			var idx = CloudOS.FileItem.selectedItems.indexOf(self);
			if(CloudOS.FileItem.selectedItems.length<2 || idx==-1)
			{
				CloudOS.FileItem.selectItems([self]);
			}
		});
	
		this.view.dblclick(function(){
			self.file.openWithDefaultApplication();
		});
	}
	
	return FileItemTypeC;
})();