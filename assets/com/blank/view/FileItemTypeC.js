/**
 * 文件图标组件C
 */
CloudOS.FileItemTypeC = (function(){
	function FileItemTypeC(_option)
	{
	    var self = this;
	    this.option = _option == undefined?{}:_option;
	    this.file = new CloudOS.File(this.option);
	    this.view = $("<div>",{
	        style:"padding:3px;"
	    });
	
	    this.imgBox = $("<div>",{
	        style:"border:solid 1px #ff0000;"
	    });
	
	    var maxSize = 22;
	    this.imgBox.css("width",maxSize);
	    this.imgBox.css("height",maxSize);
	    this.imgBox.css("border","dashed 1px #666666");
	    this.imgBox.css("border-radius",5);
	    this.imgBox.appendTo(this.view);
	
	    var img = new Image();
	    img.src = CloudOS.IconMap.getIcon(this.file.type);
	    img.onload = function()
	    {
	        $(img).attr("onDragStart","return false;");
	        $(img).css("max-width",self.imgBox.width());
	        $(img).css("max-height",self.imgBox.height());
	        $(img).appendTo(self.imgBox);
	        self.imgBox.css("border","none");
	    }
	
	    this.label = $("<div>",{
	        style:"font-size:14px;line-height:22px;word-break:keep-all;white-space:nowrap;margin-top:-21px;margin-left:25px;"
	    });
	    this.label.css("color",this.option.color!=undefined?this.option.color:"#ffffff");
	    this.label.css("text-shadow",this.option.textShadow!=undefined?this.option.textShadow:"1px 1px 2px #000");
	    this.label.text(this.file.name);
	    this.label.appendTo(this.view);
	
	    $("<div>",{style:"clear:both;"}).appendTo(this.view);
	
	    this.initEvents();
	}
	
	FileItemTypeC.prototype.initEvents = function()
	{
	    CloudOS.FileItem.prototype.initEventsA.call(this);
	}
	
	FileItemTypeC.prototype.select = function(value)
	{
	    if(value)
	    {
	        this.view.css("background-color","#333366");
	        this.label.css("text-shadow","none");
	        this.label.css("color","#fff");
	    }
	    else
	    {
	        this.view.css("background","none");
	        this.label.css("color",this.option.color!=undefined?this.option.color:"#ffffff");
	        this.label.css("text-shadow",this.option.textShadow!=undefined?this.option.textShadow:"1px 1px 2px #000");
	    }
	}
	
	FileItemTypeC.prototype.getSelectRect = function()
	{
	    var target = this.view;
	    var rect = new CloudOS.Rect(target.offset().left,target.offset().top,target.width(),target.height());
	    return rect;
	}
	
	FileItemTypeC.prototype.destroy = function()
	{
	    this.view.remove();
	}
	return FileItemTypeC;
})();