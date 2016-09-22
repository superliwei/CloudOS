/**
 * 快捷启动条
 */

CloudOS.QuickBar = (function(){
	function QuickBar()
	{
		QuickBar.tip = $("<div>",{'class':"tip"});
		this.init();
	}
	
	QuickBar.prototype.init = function()
	{
		var self = this;
		this.view = $("<div class='CloudOS QuickBar'>");
		this.data = new QuickBar.Data();
		this.minH = 30;
		this.maxH = 64;
		this.padding = 5;
		this.itemLayer = $("<div>",{style:"position:absolute"});
		this.iconLayer = $("<div>",{style:"position:absolute"});
		this.itemLayer.appendTo(this.view);
		this.iconLayer.appendTo(this.view);
		this.items = [];
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
		
		var super_appendTo = this.view.appendTo;
		this.view.appendTo = function(container)
		{
			super_appendTo.call(this,container);
			self.resizeHandler();
		}
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
		this.view = $("<div>",{'class':"Item"});
	}
	
	QuickBar.Item.prototype.resize = function(_w,_h)
	{
		this.view.width(_w);
		this.view.height(_h);
		if(this.icon!=null)
		{
			this.icon.resize(_w,_w);
		}
	}
	
	QuickBar.Item.prototype.moveTo = function(_x,_y)
	{
		this.view.css("left",_x);
		this.view.css("top",_y);
		if(this.icon!=null && !CloudOS.Dragger.isDragging(this.icon.view))
		{
	        TweenLite.killTweensOf(this.icon.view);
			this.icon.view.offset(this.view.offset());
		}
	}
	
	QuickBar.Item.prototype.put = function(_icon)
	{
		this.icon = _icon;
		_icon.item = this;
	}
	
	/**
	 * 分割符
	 */
	
	QuickBar.Separator = function()
	{
		this.view = $("<div>",{'class':"Separator"});
		this.line = $("<div>",{'class':"vline"});
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
		this.view = $("<div>",{'class':"ImageItem"});
		this.imgPlaceHolder = $("<div>",{'class':"imgPlaceHolder"});
		this.imgPlaceHolder.appendTo(this.view);
	
		this.img = null;
		this.icon = null;
	
		var self = this;
		if(this.data.img!=undefined) //图片
		{
			var imgLoader = new CloudOS.ImageLoader(this.data.img,{
				onComplete:function(){
					self.img= $(imgLoader.image);
					self.updateImg();
					self.img.appendTo(self.imgPlaceHolder);
					self.imgPlaceHolder.css("border-color","transparent");
				}
			});
		}
	
		if(this.data.app!=undefined)
		{
			var iconLoader = new CloudOS.ImageLoader(this.data.app.win.icon,{
				onComplete:function(){
					self.icon = $(iconLoader.image);
					self.icon.appendTo(self.imgPlaceHolder);
					self.icon.css("position","absolute");
					self.updateIcon();
				}
			});
		}
	
	    this.light = $("<div class='light'>");
	    this.lightState = "off";
	
		QuickBar.ImageItem.depth++;
	
		this.initEvents();
	}
	
	QuickBar.ImageItem.prototype.lightOn = function()
	{
	    this.light.appendTo(this.view);
	    this.lightState = "on";
	}
	
	QuickBar.ImageItem.prototype.lightOff = function()
	{
	    this.light.remove();
	    this.lightState = "off";
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
		this.light.css("top",_h-2);
	    this.light.css("left",_w*0.5-2);
		this.updateImg();
		this.updateIcon();
	}
	
	QuickBar.ImageItem.prototype.updateImg = function()
	{
		if(this.img!=null)
		{
			this.img.attr("ondragstart","return false");
			this.img.css("max-width",this.imgPlaceHolder.width());
			this.img.css("max-height",this.imgPlaceHolder.height());
		}
	}
	
	QuickBar.ImageItem.prototype.updateIcon = function()
	{
		if(this.icon!=null)
		{
			this.icon.attr("ondragstart","return false");
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
	        dp = {x:e.clientX,y:e.clientY};
			thisGroup = QuickBar.instance().getGroupIdx(self.item);
			self.mousedownEffect();
	        var offset = $(this).offset();
	        $(this).addClass("CloudOS-QuickBar-ImageItem");
			$(this).appendTo("body");
			$(this).offset(offset);
	
			moved = false;
			CloudOS.Dragger.startDrag($(this),e);
			$(document).bind("mousemove",mousemoveHandler);
			$(document).bind("mouseup",mouseupHandler);
			$(this).css("z-index",QuickBar.ImageItem.depth++);
		});
	
		function mousemoveHandler(e)
		{
	        if(e.clientX - dp.x == 0 && e.clientY - dp.y == 0)return;
	        moved = true;
			self.hideTip();
	        self.lightOff();
	        var p = {
	        	x:self.imgPlaceHolder.offset().left + self.imgPlaceHolder.width()*0.5,
	        	y:self.imgPlaceHolder.offset().top + self.imgPlaceHolder.height()*0.5
	        };
	        var rect = new CloudOS.Rect(
	        	QuickBar.instance().view.offset().left,
	        	QuickBar.instance().view.offset().top,
	        	QuickBar.instance().view.width(),
	        	QuickBar.instance().view.height()
	        );
	        if(rect.contains(p))
	        {
	        	var sortableItems = QuickBar.instance().getSortableItems(thisGroup);
	        	if(self.item == null)//移进了区域
	        	{
	        		var insertIdx = -1;
					for(var i=0;i<sortableItems.length;i++)
					{
						var item = sortableItems[i];
						if(p.x<item.view.offset().left+item.view.width()*0.5)
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
						if(item!=self.item && p.x>item.view.offset().left+item.view.width()*0.5)
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
							if(item!=self.item && p.x<item.view.offset().left+item.view.width()*0.5)
							{
								switchItem = item;
								break;
							}
						}
					}
					if(switchItem!=null)
					{
	                    var switchView = switchItem.icon.view;
	                    var tx = self.item.view.css("left");
	                    TweenLite.to(switchView,0.5,{left:tx,ease:Cubic.easeOut});
	
						self.item.put(switchItem.icon);
						self.item.icon.updataLightState();
						switchItem.put(self);
					}
	        	}
	        }
	        else //移出区域
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
		}
	
		function mouseupHandler(e)
		{
			self.mouseupEffect();
			$(document).unbind("mousemove",mousemoveHandler);
			$(document).unbind("mouseup",mouseupHandler);
			CloudOS.Dragger.stopDrag();
			var offset = self.view.offset();
			self.view.removeClass("CloudOS-QuickBar-ImageItem");
			self.view.appendTo(QuickBar.instance().iconLayer);
			self.view.offset(offset);
			if(moved)
			{
				var p = {
		        	x:self.imgPlaceHolder.offset().left + self.imgPlaceHolder.width()*0.5,
		        	y:self.imgPlaceHolder.offset().top + self.imgPlaceHolder.height()*0.5
		        };
		        var rect = new CloudOS.Rect(
		        	QuickBar.instance().view.offset().left,
		        	QuickBar.instance().view.offset().top,
		        	QuickBar.instance().view.width(),
		        	QuickBar.instance().view.height()
		        );
		        if(rect.contains(p))
		        {
		        	if(self.item!=null)
					{
						self.view.offset(self.item.view.offset());
						self.showTip();
						self.updataLightState();
					}
		        }
		        else//在外面放开
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
			}
			else
			{
	            self.clickHandler();
			}
		}
	}
	
	QuickBar.ImageItem.prototype.initClickAction = function()
	{
		var self = this;
		var moved,dp;
		this.view.mousedown(function(e){
			self.mousedownEffect();
			moved = false;
			dp = {x:e.clientX,y:e.clientY};
			$(document).bind("mousemove",mousemoveHandler);
			$(document).bind("mouseup",mouseupHandler);
		});
	
		function mousemoveHandler(e)
		{
			if(e.clientX - dp.x == 0 && e.clientY - dp.y == 0)return;
			moved = true;
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
		this.view.mouseenter(function(e){
			self.showTip();
		});
		this.view.mouseleave(function(e){
			self.hideTip();
		});
	}
	
	QuickBar.ImageItem.prototype.initLightUpdate = function()
	{
		var self = this;
		CloudOS.BroadcastCenter.addEventListener(CloudOS.AppStatus.UPDATE,updateHandler);
	
		function updateHandler()
		{
			if(self.item == null)return;
			if(self.data.type == "tipBox")return;
			if(self.data.type == "folder" && self.data.target == "/trash")return;
			var AppClass = self.getAppClass();
			if(AppClass == undefined)return;
			var _on = false;
			if(AppClass == CloudOS.AppLoader)
			{
				_on = CloudOS.AppLoader.getLoaderByName(CloudOS.PathUtil.getFileName(self.data.target)) == null?false:true;
			}
			else
			{
				_on = (AppClass.instances == undefined || AppClass.instances.length == 0)?false:true;
			}
			_on?self.lightOn():self.lightOff();
		}
	
		this.updataLightState = updateHandler;
	}
	
	/**
	 * 获取对应的类
	 */
	QuickBar.ImageItem.prototype.getAppClass = function()
	{
		var AppClass;
		if(this.data.type == "folder")
		{
			AppClass = CloudOS.Folder;
		}
		else if(this.data.type == "sysApp")
		{
			var sysAppName = this.data.target.split(".")[0];
			AppClass = CloudOS[sysAppName];
		}
		else if(this.data.type == "customApp")
		{
			AppClass = CloudOS.AppLoader;
		}
		return AppClass;
	}
	
	QuickBar.ImageItem.prototype.clickHandler = function()//点击运行
	{
		if(this.data.type == "tipBox")
		{
			this.popFolder();
			return;
		}
		this.showTip();
		if(this.data.app!=undefined)
		{
			showMinimizedWin(this);
			return;
		}
		if(this.lightState == "off")
		{
			if(this.data.type == "folder")
			{
				//1.废纸篓不能重复打开
				//2.如果废纸篓已经打开，选中
				//3.如果已经打开并最小化,选中并显示
				var trash = getFolderByTitle("/trash");
				if(trash != null)
				{
					var arr = QuickBar.instance().getSortableItems(1);
					for(var i=0,len=arr.length;i<len;i++)
					{
						var _item = arr[i];
						if(_item.icon.data.title == "/trash")
						{
							showMinimizedWin(_item.icon);
							break;
						}
					}
					if(CloudOS.PopUpManager.currentPop !== trash)CloudOS.PopUpManager.selectPop(trash);
				}
				else
				{
					CloudOS.Folder.newOpen(this.data.target);
				}
			}
			else if(this.data.type == "sysApp")
			{
				var sysAppName = this.data.target.split(".")[0];
				switch(sysAppName)
				{
					case "Terminal":
					CloudOS.Terminal.newTerminal();
					break;
					case "SettingPannel":
					CloudOS.SettingPannel.newSettingPannel();
					break;
				}
			}
			else if(this.data.type == "customApp")
			{
				CloudOS.AppLoader.newLoader(this.data.target);
			}
			
		}
		else
		{
			var AppClass = this.getAppClass();
			if(AppClass == undefined)return;
			var arr = CloudOS.PopUpManager.pops;
			for(var i=0,len=arr.length;i<len;i++)
			{
				var _app = CloudOS.PopUpManager.pops[i];
				if(_app instanceof AppClass)
				{
					if(AppClass != CloudOS.AppLoader || (AppClass == CloudOS.AppLoader && _app.config.name == CloudOS.PathUtil.getFileName(this.data.target)))
					{
						CloudOS.PopUpManager.selectPop(_app);
					}
				}
			}
			var arr = QuickBar.instance().getSortableItems(1);
			for(var i=0,len=arr.length;i<len;i++)
			{
				var _item = arr[i];
				if(_item.icon.data.app != undefined && _item.icon.data.app instanceof AppClass)
				{
					if(AppClass != CloudOS.AppLoader || (AppClass == CloudOS.AppLoader && _item.icon.data.app.config.name == CloudOS.PathUtil.getFileName(this.data.target)))
					{
						showMinimizedWin(_item.icon);
					}
				}
			}
		}
	
		function getFolderByTitle(_title)
		{
			var target = null;
			var folders = CloudOS.Folder.instances || [];
			for(var i=0,len=folders.length;i<len;i++)
			{
				var folder = folders[i];
				if(folder.win.title == _title)
				{
					target = folder;
					break;
				}
			}
			return target;
		}
	
		function showMinimizedWin(_imageItem)
		{
			_imageItem.hideTip();
	        _imageItem.data.app.win.normalize();
			CloudOS.PopUpManager.selectPop(_imageItem.data.app);
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
	    tip.appendTo(QuickBar.instance().view);
		tip.text(String(this.data.title));
		var w = tip.outerWidth() + 4;
		var h = tip.outerHeight();
		tip.outerWidth(w);
		tip.outerHeight(h);
		var tx = this.view.offset().left + (this.view.outerWidth() - w)*0.5;
		var ty = QuickBar.instance().view.offset().top - h - 5;
		tip.offset({left:tx,top:ty});
	    TweenLite.to(tip,0.3,{alpha:1});
	}
	
	QuickBar.ImageItem.prototype.hideTip = function()
	{
	    TweenLite.to(QuickBar.tip,0.3,{alpha:0,onComplete:function(){
	        QuickBar.tip.remove();
	    }});
	}
	
	QuickBar.ImageItem.prototype.mousedownEffect = function()
	{
	    this.view.addClass("mousedown");
	}
	
	QuickBar.ImageItem.prototype.mouseupEffect = function()
	{
	    this.view.removeClass("mousedown");
	}
	
	QuickBar.ImageItem.prototype.destroy = function()
	{
		this.view.remove();
		CloudOS.BroadcastCenter.removeEventListener(CloudOS.AppStatus.UPDATE,this.updataLightState);
	}
	
	QuickBar.ImageItem.prototype.popFolder = function()
	{
		new CloudOS.TipBox({
			parentView:CloudOS.CoreSystem.desktop.barLayer,
			target:this
		});
	}
	
	/**
	 * 快捷启动条数据
	 */
	
	QuickBar.Data = function()
	{
	    this.items = [];
	    var folder = {
	        title:"Folder",
	        img:"assets/images/icons/128/folder.png",
	        fixed:true,
	        type:"folder",
	        target:"/"
	    };
	    this.items.push(folder);
	   	this.items = this.items.concat(CloudOS.User.currentUser.config.quickBar.items);
	    var trash = {
	        title:"废纸篓",
	        img:"assets/images/icons/128/trash0.png",
	        fixed:true,
	        type:"folder",
	        target:"/trash"
	    };
	    this.items.push(trash);
	}
	 
	 return QuickBar;
})();