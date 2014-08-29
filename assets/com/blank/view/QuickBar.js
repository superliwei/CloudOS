/**
 * 快捷启动条
 */

var QuickBar = function()
{
	this.init();
	this.test();
}

QuickBar.prototype.init = function()
{
	this.view = $("<div class='QuickBar'>");
	this.data = new QuickBar.Data();
	this.minH = 30;
	this.maxH = 64;
	this.padding = 5;
	this.itemLayer = $("<div>",{"style":"position:absolute"});
	this.iconLayer = $("<div>",{"style":"position:absolute"});
	QuickBar.tip = $("<div>",{"style":"position:absolute;border-radius:15px;background-color:#000;color:#fff;padding-top:5px;padding-bottom:5px;padding-left:8px;padding-right:8px;font-size:14px;font-weight:bold;text-align:center;"});
	this.itemLayer.appendTo(this.view);
	this.iconLayer.appendTo(this.view);
	this.items = [];
	var self = this;
	initItems();

	$(window).resize(function(){
		self.resizeHandler();
	});

	function initItems()
	{
		for(var i=0;i<self.data.items.length;i++)
		{
			self.addItem(self.data.items[i]);
		}
	}
}

QuickBar.prototype.appendTo = function(_parentView)
{
	this.view.appendTo(_parentView);
	this.resizeHandler();
}

QuickBar.prototype.getItemsOf = function(_class)
{
	var arr = [];
	var len = this.items.length;
	for(var i=0;i<len;i++)
	{
		var item = this.items[i];
		if(item instanceof _class)
		{
			arr.push(item);
		}
	}
	return arr;
}

QuickBar.prototype.getGroupIdx = function(_item)//得到item所在的组
{
	var thisIdx = this.items.indexOf(_item);
	var separator = this.getItemsOf(QuickBar.Separator)[0];
	var sepIdx = this.items.indexOf(separator);
	var group = thisIdx<sepIdx?0:1;
	return group;
}

QuickBar.prototype.getSortableItems = function(_group)
{
	var separator = this.getItemsOf(QuickBar.Separator)[0];
	var sepIdx = this.items.indexOf(separator);

	var groups = [[],[]];
	var len = this.items.length;
	for(var i=1;i<len-1;i++) //去掉文件夹和垃圾筒
	{
		var item = this.items[i];
		if(i<=sepIdx)
		{
			groups[0].push(item);
		}
		else if(i>sepIdx)
		{
			groups[1].push(item);
		}

	}
	return groups[_group];
}

QuickBar.prototype.addItem = function(_data)
{
	var item;
	if(_data.type == "separator")	
	{
		item = new QuickBar.Separator();
	}
	else
	{
		item = new QuickBar.Item();
		var icon = new QuickBar.ImageItem(_data);
		icon.view.appendTo(this.iconLayer);
		item.put(icon);

	}
	item.view.appendTo(this.itemLayer);
	this.items.push(item);
}

QuickBar.prototype.addIcon = function(_data)
{
	var self = this;
	var item = new QuickBar.Item();
	var icon = new QuickBar.ImageItem(_data);
	icon.view.appendTo(this.iconLayer);
	item.put(icon);
	item.view.appendTo(this.itemLayer);
	var idx = getIdxOfTrash();
	this.items.splice(idx,0,item);
	this.resizeHandler();

	function getIdxOfTrash()
	{
		return self.items.length-1;
	}
}

QuickBar.prototype.resizeHandler = function()
{
	this.maxW = $(window).width() - 100;
	this.layoutItems();
}

QuickBar.prototype.layoutItems = function()
{
	var iconItems = this.getItemsOf(QuickBar.Item);
	var separators = this.getItemsOf(QuickBar.Separator);
	var separatorWidth = separators.length>0?separators[0].view.width():0;
	var separatorsWidth = separatorWidth*separators.length;
	var maxNeededWidth = this.maxH*iconItems.length + separatorsWidth;
	var th = (maxNeededWidth>this.maxW-this.padding*2)?(this.maxW - this.padding*2 - separatorsWidth)/iconItems.length:this.maxH;
	th = th<this.minH?this.minH:th;
	var len = this.items.length;
	var itemsWidth = 0;
	for(var i=0;i<len;i++)
	{
		var item = this.items[i];
		item.resize(th,th+this.padding);
		item.moveTo(itemsWidth+this.padding,this.padding);
		itemsWidth+=item.view.width();
	}
	this.view.width(itemsWidth+this.padding*2);
	this.view.height(th+this.padding*2);
	this.view.css("left",($(window).width()-this.view.width())*0.5);
	this.view.css("top",$(window).height()-this.view.height()-1);
}

QuickBar._instance = null;
QuickBar.tip = null;
QuickBar.instance = function()
{
	if(QuickBar._instance == null)
	{
		QuickBar._instance = new QuickBar();
	}
	return QuickBar._instance;
}

/**
 * 快捷图标位置
 */

QuickBar.Item = function()
{
	this.icon = null;
	this.view = $("<div>",{
		"style":"position:absolute;"
	});
	this.light = $("<div class='light'>");
	this.lightState = "off";
}

QuickBar.Item.prototype.resize = function(_w,_h)
{
	this.view.width(_w);
	this.view.height(_h);
	this.light.css("top",_w-2);
	this.light.css("left",(_w-this.light.width())*0.5);
	if(this.icon!=null)
	{
		this.icon.resize(_w,_w);
	}
}

QuickBar.Item.prototype.moveTo = function(_x,_y)
{
	this.view.css("left",_x);
	this.view.css("top",_y);
	if(this.icon!=null)
	{
		this.icon.view.offset(this.view.offset());
	}
}

QuickBar.Item.prototype.put = function(_icon)
{
	this.icon = _icon;
	_icon.item = this;
}

QuickBar.Item.prototype.lightOn = function()
{
	this.light.appendTo(this.view);
	this.lightState = "on";
}

QuickBar.Item.prototype.lightOff = function()
{
	this.light.remove();
	this.lightState = "off";
}

/**
 * 分割符
 */

QuickBar.Separator = function()
{
	this.view = $("<div>",{
		"style":"position:absolute;width:10px"
	});
	this.line = $("<div>",{"style":"position:absolute;background-color:#000000;width:1px;opacity:0.5;"});
	this.line.appendTo(this.view);
}

QuickBar.Separator.prototype.resize = function(_w,_h)
{
	this.view.height(_h);
	this.line.height(_h-10);
	this.line.css("top",5);
	this.line.css("left",this.view.width()*0.5);
}

QuickBar.Separator.prototype.moveTo = function(_x,_y)
{
	this.view.css("left",_x);
	this.view.css("top",_y);
}

/**
 * 图片图标
 */
QuickBar.ImageItem = function(_data)
{
	this.data = _data;
	this.item = null;
	this.view = $("<div>",{
		"style":"position:absolute"
	});
	this.imgMask = this.view.clone();
	this.imgPlaceHolder = $("<div>",{"style":"position:absolute"});
	this.imgPlaceHolder.css("border","dashed 1px #666666");
	this.imgPlaceHolder.css("border-radius",10);
	this.imgPlaceHolder.appendTo(this.view);
	this.imgMask.appendTo(this.view);

	this.img = null;
	this.icon = null;

	var self = this;
	if(this.data.img!=undefined) //图片
	{
		var imgLoader = new ImageLoader(this.data.img,{
			"onComplete":function(){
				self.img= $(imgLoader.image);
				self.updateImg();
				self.img.appendTo(self.imgPlaceHolder);
				self.imgPlaceHolder.css("border","none");
			}
		});
	}

	if(this.data.app!=undefined)
	{
		var iconLoader = new ImageLoader(this.data.app.win.icon,{
			"onComplete":function(){
				self.icon = $(iconLoader.image);
				self.icon.appendTo(self.imgPlaceHolder);
				self.icon.css("position","absolute");
				self.updateIcon();
			}
		});
	}

	this.initEvents();

	QuickBar.ImageItem.depth++;
}

QuickBar.ImageItem.depth = 0;

QuickBar.ImageItem.prototype.resize = function(_w,_h)
{
	this.view.width(_w);
	this.view.height(_h);
	var ts = 0.9;
	this.imgPlaceHolder.css("width",_w*ts);
	this.imgPlaceHolder.css("height",_h*ts);
	this.imgPlaceHolder.css("left",_w*(1-ts)*0.5);
	this.imgPlaceHolder.css("top",0);
	this.imgMask.width(_w);
	this.imgMask.height(_h);
	this.updateImg();
	this.updateIcon();
}

QuickBar.ImageItem.prototype.updateImg = function()
{
	if(this.img!=null)
	{
		this.img.css("max-width",this.imgPlaceHolder.width());
		this.img.css("max-height",this.imgPlaceHolder.height());
	}
}

QuickBar.ImageItem.prototype.updateIcon = function()
{
	if(this.icon!=null)
	{
		this.icon.css("left",this.imgPlaceHolder.width()-16);
		this.icon.css("top",this.imgPlaceHolder.height()-16);
	}
}

QuickBar.ImageItem.prototype.initEvents = function()
{
	if(this.data.fixed==undefined || !this.data.fixed)
	{
		this.initDragAction();
	}
	else
	{
		this.initClickAction();
	}
	this.initOverAction();
	this.initLightUpdate();
}

QuickBar.ImageItem.prototype.initDragAction = function()
{
	var self = this;
	var dp = {};
	var moved,thisGroup,sortableItems;

	this.view.mousedown(function(e){
		thisGroup = QuickBar.instance().getGroupIdx(self.item);
		self.mousedownEffect();
		dp.offset = $(this).offset();
		$(this).appendTo("body");
		$(this).offset(dp.offset);

		moved = false;
		Dragger.startDrag($(this),e);
		$(document).bind("mousemove",mousemoveHandler);
		$(document).bind("mouseup",mouseupHandler);
		$(this).css("z-index",QuickBar.ImageItem.depth++);
	});

	function mousemoveHandler(e)
	{
		moved = true;
		self.hideTip();
		if(self.item!=null)self.item.lightOff();
		var ty = self.view.offset().top;
		var tx = self.view.offset().left;
		var minY = QuickBar.instance().view.offset().top - self.view.height()*0.6;
		if(ty<minY) //移出区域
		{
			if(self.item == null)return;
			var items = QuickBar.instance().items;
			self.data.lastIdx = items.indexOf(self.item);
			items.splice(self.data.lastIdx,1);
			self.item.icon = null;
			self.item.view.remove();
			self.item = null;
			QuickBar.instance().resizeHandler();
		}
		else 
		{
			var sortableItems = QuickBar.instance().getSortableItems(thisGroup);
			var centerX = self.view.offset().left + self.view.width()*0.5;
			if(self.item == null)//移进了区域
			{
				var insertIdx = -1;
				for(var i=0;i<sortableItems.length;i++)
				{
					var item = sortableItems[i];
					if(centerX<item.view.offset().left+item.view.width()*0.5)
					{
						insertIdx = i;
						break;
					}
				}
				if(insertIdx == -1)
				{
					insertIdx = thisGroup == 0?sortableItems.length-1:QuickBar.instance().items.length-1;
				}
				if(insertIdx>-1) //找到位置插入
				{
					var newItem = new QuickBar.Item();
					newItem.view.appendTo(QuickBar.instance().itemLayer);
					var findItem = sortableItems[insertIdx];
					var findIdx = QuickBar.instance().items.indexOf(findItem);
					QuickBar.instance().items.splice(findIdx,0,newItem);
					newItem.put(self);
					QuickBar.instance().resizeHandler();
				}
			}
			else//平移
			{
				if(thisGroup == 0)sortableItems.pop();//移除分割线
				var _thisIdx = sortableItems.indexOf(self.item);
				var switchItem = null;
				for(var i=_thisIdx;i<sortableItems.length;i++)
				{
					var item = sortableItems[i];
					if(item!=self.item && centerX>item.view.offset().left+item.view.width()*0.5)
					{
						switchItem = item;
						break;
					}
				}
				if(switchItem == null)
				{
					for(i=_thisIdx;i>-1;i--)
					{
						item = sortableItems[i];
						if(item!=self.item && centerX<item.view.offset().left+item.view.width()*0.5)
						{
							switchItem = item;
							break;
						}
					}
				}
				if(switchItem!=null)
				{
					switchItem.icon.view.offset(self.item.view.offset());
					self.item.put(switchItem.icon);
					self.item.icon.updataLightState();
					switchItem.put(self);
				}
			}
		}
	}

	function mouseupHandler(e)
	{
		self.mouseupEffect();
		$(document).unbind("mousemove",mousemoveHandler);
		$(document).unbind("mouseup",mouseupHandler);
		Dragger.stopDrag();
		var offset = self.view.offset();
		self.view.appendTo(QuickBar.instance().iconLayer);
		self.view.offset(offset);
		if(moved)
		{
			
			var ty = self.view.offset().top;
			var minY = QuickBar.instance().view.offset().top - self.view.height()*0.6;
			if(ty<minY)//在外面放开
			{
				trace("在外面放开");
				if(self.data.app!=undefined)
				{
					var newItem = new QuickBar.Item();
					newItem.view.appendTo(QuickBar.instance().itemLayer);
					QuickBar.instance().items.splice(self.data.lastIdx,0,newItem);
					delete self.data.lastIdx;
					newItem.put(self);
					QuickBar.instance().resizeHandler();
				}
				else
				{
					self.destroy();
				}
			}
			else
			{
				if(self.item!=null)
				{
					self.view.offset(self.item.view.offset());
					self.showTip();
					self.updataLightState();
				}
			}
		}
		else
		{
			self.clickHandler();
		}
	}
}

QuickBar.ImageItem.prototype.initClickAction = function()
{
	var moved;
	var self = this;
	var dp;
	this.view.mousedown(function(e){
		self.mousedownEffect();
		moved = false;
		dp = {"x":e.clientX,"y":e.clientY};
		$(document).bind("mousemove",mousemoveHandler);
		$(document).bind("mouseup",mouseupHandler);
	});

	function mousemoveHandler(e)
	{
		if(Math.abs(e.clientX - dp.x)>0 || Math.abs(e.clientY - dp.y)>0)
		{
			move = true;
		}
	}

	function mouseupHandler(e)
	{
		if(!moved)
		{
			self.clickHandler();
		}
		self.mouseupEffect();
		$(document).unbind("mousemove",mousemoveHandler);
		$(document).unbind("mouseup",mouseupHandler);
		delete dp;
	}
}

QuickBar.ImageItem.prototype.initOverAction = function()
{
	var self = this;
	this.view.mouseover(function(e){
		self.showTip();
	});
	this.view.mouseout(function(e){
		self.hideTip();
	});
}

QuickBar.ImageItem.prototype.initLightUpdate = function()
{
	var self = this;
	BroadcastCenter.addEventListener(AppStatus.UPDATE,updateHandler);

	function updateHandler()
	{
		if(self.item == null)return;
		if(self.data.class != undefined)
		{
			var _on = false;
			if(self.data.class == AppLoader)
			{
				_on = AppLoader.getLoaderByName(self.data.name) == null?false:true;
			}
			else
			{
				_on = (self.data.class.instances == undefined || self.data.class.instances.length == 0)?false:true;
			}

			_on?self.item.lightOn():self.item.lightOff();
		}
	}

	this.updataLightState = updateHandler;
}

QuickBar.ImageItem.prototype.clickHandler = function()//点击运行
{
	this.showTip();
	if(this.data.list!=undefined)
	{
		this.popFolder();
		return;
	}
	if(this.data.app!=undefined)
	{
		showMinimizedWin(this);
		return;
	}
	if(this.data.cmd == undefined)return;
	if(this.item.lightState == "off")
	{
		var trash = getFolderByTitle(this.data.title);
		if(trash == null) //废纸篓不能重复打开
		{
			Terminal.run(this.data.cmd);
		}
		else
		{
			var arr = PopUpManager.pops;
			for(var i=0,len=arr.length;i<len;i++)
			{
				var _app = PopUpManager.pops[i];
				if(_app == trash)
				{
					PopUpManager.selectPop(_app);
					break;
				}
			}
			var arr = QuickBar.instance().getSortableItems(1);
			for(var i=0,len=arr.length;i<len;i++)
			{
				var _item = arr[i];
				if(_item.icon.data.title == this.data.title)
				{
					showMinimizedWin(_item.icon);
				}
			}
		}
	}
	else
	{
		if(this.data.class == undefined)return;
		var arr = PopUpManager.pops;
		for(var i=0,len=arr.length;i<len;i++)
		{
			var _app = PopUpManager.pops[i];
			if(_app instanceof this.data.class)
			{
				if(this.data.class!=AppLoader || (this.data.class == AppLoader && _app.config.name == this.data.name))
				{
					PopUpManager.selectPop(_app);
				}
			}
		}
		var arr = QuickBar.instance().getSortableItems(1);
		for(var i=0,len=arr.length;i<len;i++)
		{
			var _item = arr[i];
			if(_item.icon.data.app!=undefined && _item.icon.data.app instanceof this.data.class)
			{
				if(this.data.class!=AppLoader || (this.data.class == AppLoader && _item.icon.data.app.config.name == this.data.name))
				{
					showMinimizedWin(_item.icon);
				}
			}
		}
	}

	function getFolderByTitle(_title)
	{
		var target = null;
		var folders = Folder.instances == undefined?[]:Folder.instances;
		for(var i=0,len=folders.length;i<len;i++)
		{
			var folder = folders[i];
			if(folder.win.title == _title)
			{
				target = folder;
			}
		}
		return target;
	}

	function showMinimizedWin(_imageItem)
	{
		_imageItem.hideTip();
		_imageItem.data.app.win.view.show();
		_imageItem.data.app.win.resizeHandler();
		PopUpManager.selectPop(_imageItem.data.app);
		var items = QuickBar.instance().items;
		var idx = items.indexOf(_imageItem.item);
		items.splice(idx,1);
		_imageItem.item.icon = null;
		_imageItem.item.view.remove();
		_imageItem.item = null;
		_imageItem.destroy();
		QuickBar.instance().resizeHandler();
	}
}

QuickBar.ImageItem.showTipAble = true;

QuickBar.ImageItem.prototype.showTip = function()
{
	if(!QuickBar.ImageItem.showTipAble)return;
	var tip = QuickBar.tip;
	tip.css("width","auto");
	tip.css("height","auto");
	tip.appendTo("body");
	tip.text(String(this.data.title));
	var w = tip.outerWidth() + 4;
	var h = tip.outerHeight();
	tip.appendTo(QuickBar.instance().view);
	tip.outerWidth(w);
	tip.outerHeight(h);
	var tx = this.view.offset().left + (this.view.outerWidth() - w)*0.5;
	var ty = QuickBar.instance().view.offset().top - h - 5;
	tip.offset({"left":tx,"top":ty});
}

QuickBar.ImageItem.prototype.hideTip = function()
{
	QuickBar.tip.remove();
}

QuickBar.ImageItem.prototype.mousedownEffect = function()
{
	this.view.css("-webkit-filter","brightness(0.5)");
}

QuickBar.ImageItem.prototype.mouseupEffect = function()
{
	this.view.css("-webkit-filter","brightness(1)");
}

QuickBar.ImageItem.prototype.destroy = function()
{
	this.view.remove();
	BroadcastCenter.removeEventListener(AppStatus.UPDATE,this.updataLightState);
}

QuickBar.ImageItem.prototype.popFolder = function()
{
	new TipBox({
		"parentView":Desktop.instance().barLayer,
		"target":this
	});
}

/**
 * 快捷启动条数据
 */

QuickBar.Data = function()
{
	this.items = [
		{
			"title":"Folder",
			"img":"assets/images/icons/128/folder.png",
			"fixed":true,
			"cmd":"open Root",
			"class":Folder
		},
		{
			"title":"终端",
			"img":"assets/images/icons/128/terminal.png",
			"cmd":"open Terminal",
			"class":Terminal
		},
		{
			"title":"图片查看器",
			"img":"assets/apps/ImageViewer.app/icon.png",
			"cmd":"load assets/apps/ImageViewer.app",
			"class":AppLoader,
			"name":"ImageViewer"
		},
		{
			"title":"偏好设置",
			"img":"assets/images/icons/128/setting.png",
			"cmd":"open SettingPannel",
			"class":SettingPannel
		},
		{
			"type":"separator"
		},
		{
			"title":"我的音乐",
			"img":"assets/images/icons/128/musicFolder.png",
			"list":"/music"
		},
		{
			"title":"应用程序",
			"img":"assets/images/icons/128/app.png",
			"list":"/apps"
		},
		{
			"title":"废纸篓",
			"img":"assets/images/icons/128/trash0.png",
			"fixed":true,
			"cmd":"open 废纸篓"
		}
	];
}

/**
 * 测试
 */

 QuickBar.prototype.test = function()
 {
	
 }