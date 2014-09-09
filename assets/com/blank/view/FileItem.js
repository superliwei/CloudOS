/**
 * 文件图标组件
 */
var FileItem = function(_option)
{
	var self = this;
	this.option = _option == undefined?{}:_option;
	this.mode = this.option.mode !=undefined?this.option.mode:"A";
	this.view = $("<div>",{
		style:"position:absolute;width:100px;height:100px;"
	});

	this.imgBox = $("<div>",{
		style:"position:absolute;border:solid 1px transparent;"
	});
	var maxSize = 70;
	this.imgBox.css("width",maxSize);
	this.imgBox.css("height",maxSize);
	this.imgBox.css("left",(this.view.width()-maxSize)*0.5);
	this.imgBox.appendTo(this.view);

	this.imgPlaceHolder = $("<div>",{style:"position:absolute"});
	var padding = 5;
	this.imgPlaceHolder.css("width",maxSize-padding*2);
	this.imgPlaceHolder.css("height",maxSize-padding*2);
	this.imgPlaceHolder.css("left",padding);
	this.imgPlaceHolder.css("top",padding);
	this.imgPlaceHolder.css("border","dashed 1px #666666");
	this.imgPlaceHolder.css("border-radius",10);
	this.imgPlaceHolder.appendTo(this.imgBox);

	var img = new Image();
	img.src = "assets/images/icons/64/folder.png";
	img.onload = function()
	{
        $(img).attr("onDragStart","return false;");
		$(img).css("max-width",self.imgPlaceHolder.width());
		$(img).css("max-height",self.imgPlaceHolder.height());
		$(img).appendTo(self.imgPlaceHolder);
		self.imgPlaceHolder.css("border","none");
	}

	this.labelBox = $("<div>",{
		style:"position:absolute;font-size:14px;display:none;padding-top:3px;padding-bottom:3px;padding-left:6px;padding-right:6px;"
	}).appendTo("body");

	this.label = $("<div>",{
		style:"position:absolute;font-size:14px;padding-top:3px;padding-bottom:3px;padding-left:6px;padding-right:6px;text-align:center;"
	});
	this.label.css("color",this.option.color!=undefined?this.option.color:"#ffffff");
	this.label.css("text-shadow",this.option.textShadow!=undefined?this.option.textShadow:"1px 1px 2px #000");
	this.label.text(this.getCurrentLabelStr(this.labelBox,"我是文件名我很长的",this.view.width()));
	this.label.css("left",(this.view.outerWidth()-this.labelBox.outerWidth())*0.5);
	this.label.css("top",maxSize+(this.view.outerHeight()-maxSize-this.labelBox.outerHeight())*0.5);
	this.label.appendTo(this.view);
	this.labelBox.remove();

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

FileItem.prototype.getCurrentLabelStr = function(label,str,maxW)
{
	var result;
	label.text(str);
	if(label.outerWidth()<maxW)
	{
		result = str;
	}
	else
	{
		check(str);
	}
	return result;

	function check(_str)
	{
		label.text(_str+"...");
		if(label.outerWidth()>maxW)
		{
			_str = _str.substr(0,_str.length-1);
			check(_str);
		}
		else
		{
			result = _str+"...";
		}
	}
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
		$(document).trigger(CoreEvent.DOCUMENT_DOWN,self.option.flag);
		var idx = FileItem.selectedItems.indexOf(self);
		if(FileItem.selectedItems.length<2 || idx==-1)
		{
			FileItem.selectItems([self]);
		}
		Dragger.startDrag(selectedItemViews(),e);
		$(document).bind("mouseup",mouseupHandler);
	});

	function mouseupHandler(e)
	{
		Dragger.stopDrag();
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
		trace("双击");
        var cmd = self.option.target == "_parent"?"open /a _parent":"open /a";
        Terminal.run(cmd);
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
			trace("点击");
		}
		mouseupEffect();
		$(document).unbind("mousemove",mousemoveHandler);
		$(document).unbind("mouseup",mouseupHandler);
	}

	function mousedownEffect()
	{
		self.view.css("-webkit-filter","brightness(0.2)");
	}

	function mouseupEffect()
	{
		self.view.css("-webkit-filter","brightness(1)");
	}
}

FileItem.prototype.select = function(value)
{
	if(value)
	{
		this.imgBox.css("background-image","url(assets/images/blackAlphaBg.png)");
		this.imgBox.css("border","solid 1px #000");
		this.imgBox.css("border-radius",5);
		this.label.css("background-color","#333366");
		this.label.css("border-radius",9);
		this.label.css("text-shadow","none");
		this.label.css("color","#fff");
	}
	else
	{
		this.imgBox.css("background-image","none");
		this.imgBox.css("border","solid 1px transparent");
		this.label.css("background","none");
		this.label.css("color",this.option.color!=undefined?this.option.color:"#ffffff");
		this.label.css("text-shadow",this.option.textShadow!=undefined?this.option.textShadow:"1px 1px 2px #000");
	}
}

FileItem.prototype.destroy = function()
{
    this.view.remove();
}

FileItem.prototype.getSelectRect = function()
{
    var target = this.imgBox;
    var rect = new Rect(target.offset().left,target.offset().top,target.width(),target.height());
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