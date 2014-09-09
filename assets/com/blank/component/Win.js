/**
 * 窗体
 */

var Win = function(_option)
{
	this.option = _option;
	this.parentView = null;
	this.width = 500;
	this.height = 400;
	this.minWidth = 150;
	this.minHeight = 100;
	this.x = 0;
	this.y = 0;
	this.thick = 5;
	this.barHeight = 25;
	this.minimizeAble = true;
	this.maximizeAble = true;
	this.resizeAble = true;
	this.dragAble = true;
	this.title = "窗体标题";
	this.icon = "assets/images/icons/16/app.png";
	this.maximizing = false;
	this.init();
}

Win.RESIZE = "win_onResize";
Win.ADD = "win_onAdd";
Win.CLOSE = "win_onClose";
Win.MINIMIZE = "win_minimize";
Win.SELECT = "win_select";
Win.DRAG_START = "win_dragStart";
Win.DRAG_END = "win_dragEnd";
Win.RESIZE_START = "win_resizeStart";
Win.RESIZE_END = "win_resizeEnd";
Win.ACTIVE = "win_active";
Win.DISACTIVE = "win_disactive";

Win.prototype.init = function()
{
	if(this.option!=undefined)
	{
		if(this.option.parentView!=undefined)this.parentView = this.option.parentView;
		if(this.option.width!=undefined)this.width = this.option.width;
		if(this.option.height!=undefined)this.height = this.option.height;
		if(this.option.thick!=undefined)this.thick = this.option.thick;
		if(this.option.barHeight!=undefined)this.barHeight = this.option.barHeight;
		if(this.option.minWidth!=undefined)this.minWidth = this.option.minWidth;
		if(this.option.minHeight!=undefined)this.minHeight = this.option.minHeight;
		if(this.option.minimizeAble!=undefined)this.minimizeAble = this.option.minimizeAble;
		if(this.option.maximizeAble!=undefined)this.maximizeAble = this.option.maximizeAble;
		if(this.option.resizeAble!=undefined)this.resizeAble = this.option.resizeAble;
		if(this.option.dragAble!=undefined)this.dragAble = this.option.dragAble;
		if(this.option.title!=undefined)this.title = this.option.title;
		if(this.option.icon!=undefined)this.icon = this.option.icon;
	}

	this.view = $("<div class='Win'>");

	this.content = $("<div class='content'>");
	this.content.appendTo(this.view);

	this.titleTf = new Win.TitleField(this);
	this.titleTf.view.appendTo(this.view);

	this.dragFrame = new Win.DragFrame(this);
	this.dragFrame.view.appendTo(this.view);

	this.closeBt = new Win.CloseBt(this);
	this.minBt = new Win.MinBt(this);
	this.maxBt = new Win.MaxBt(this);
	this.closeBt.view.appendTo(this.view);
	this.minBt.view.appendTo(this.view);
	this.maxBt.view.appendTo(this.view);

	this.iconCt = $("<div class='winIcon'>");
	this.iconCt.appendTo(this.view);
	this.setIcon(this.icon);
}

Win.prototype.resizeHandler = function()
{
	if(this.maximizing)
	{
		this.width = $(window).width();
		this.height = $(window).height() - 26;
		this.moveTo(0,26);
	}
	this.view.width(this.width);
	this.view.height(this.height);
	this.content.width(this.width-this.thick*2);
	this.content.height(this.height-this.thick*2 - this.barHeight);
	this.content.css("left",this.thick);
	this.content.css("top",this.thick+this.barHeight);
	this.closeBt.view.css("left",this.width-this.closeBt.view.width()-this.thick);
	this.maxBt.view.css("left",this.closeBt.view.position().left - this.maxBt.view.width());
	this.minBt.view.css("left",this.maxBt.view.position().left - this.minBt.view.width());
	this.dragFrame.resize();
	this.titleTf.resize();
	this.view.trigger(new Event(Win.RESIZE));
}

Win.prototype.open = function()
{
	this.view.appendTo(this.parentView);
	this.resizeHandler();
	this.view.trigger(new Event(Win.ADD));
}

Win.prototype.moveTo = function(_x,_y)
{
	if(_x!=undefined)this.x = _x;
	if(_y!=undefined)this.y = _y;
	this.view.offset({left:this.x,top:this.y});
}

Win.prototype.close = function()
{
	this.destroy();
	this.view.trigger(new Event(Win.CLOSE));
}

Win.prototype.maximize = function()
{
	this.maximizing = true;
	this.maxBt.icon.css("background-image","url(assets/images/max_b0.png)");
	this.tmp = {
		x:this.x,
		y:this.y,
		width:this.width,
		height:this.height
	};
	this.resizeHandler();
	$(window).bind("resize",this,this.windowResizeHandler);
	this.dragFrame.enableResize(false);
}

Win.prototype.windowResizeHandler = function(e)
{
	var self = e.data;
	self.resizeHandler();
}

Win.prototype.restore = function()
{
	this.maximizing = false;
	this.maxBt.icon.css("background-image","url(assets/images/max_b.png)");
	this.width = this.tmp.width;
	this.height = this.tmp.height;
	this.dragFrame.enableResize(true);
	this.resizeHandler();
	this.moveTo(this.tmp.x,this.tmp.y);
	$(window).unbind("resize",this.windowResizeHandler);
	delete this.tmp;

}

Win.prototype.minimize = function()
{
	this.view.hide();
	this.view.trigger(new Event(Win.MINIMIZE));
}

Win.prototype.destroy = function()
{
	$(window).unbind("resize",this.windowResizeHandler);
}

Win.prototype.active = function(value)
{
	if(value!=undefined)
	{
		if(value)
		{
			this.view.css("background-image","url(assets/images/blueAlphaBg.png)");
			this.view.unbind("mousedown",this.mousedownHandler);
			this.view.trigger(new Event(Win.ACTIVE));
		}
		else
		{
			this.view.css("background-image","url(assets/images/whiteAlphaBg.png)");
			this.view.bind("mousedown",this.mousedownHandler);
			this.view.trigger(new Event(Win.DISACTIVE));
		}
	}
}

Win.prototype.mousedownHandler = function(e)
{
	$(this).trigger(new Event(Win.SELECT));
}

Win.prototype.setTitle = function(_title)
{
	this.title = _title;
	this.titleTf.setTitle(this.title);
}

Win.prototype.setIcon = function(_icon)
{
	this.iconCt.empty();
	if(_icon!=null)
	{
		var img = $("<img>",{
			src:_icon
		});
		img.appendTo(this.iconCt);
	}
	this.icon = _icon;
}


/**
 * 关闭按钮，最小化按钮，最大化按钮
 */

Win.CloseBt = function(_win)
{
	this.win = _win;
	this.view = $("<div class='closeBt'><div class='icon'></div></div>");
	this.view.mouseover(function()
	{
		$(this).addClass("closeBt_over");
	});
	this.view.mouseout(function(){
		$(this).removeClass("closeBt_over");
		$(this).removeClass("closeBt_down");
	});
	this.view.mousedown(function(){
		$(this).addClass("closeBt_down");
	});
	this.view.mouseup(function(){
		$(this).removeClass("closeBt_down");
	});
	var self = this;
	this.view.click(function(){
		self.win.close();
	});
}

Win.MinBt = function(_win)
{
	this.win = _win;
	this.view = $("<div class='minBt'><div class='icon'></div></div>");

	if(!this.win.minimizeAble)
	{
		this.view.addClass("minBt_disable");
		return;
	}

	this.view.mouseover(function()
	{
		$(this).addClass("minBt_over");
		$(this).children(".icon").addClass("icon_over");
	});
	this.view.mouseout(function(){
		$(this).removeClass("minBt_over");
		$(this).removeClass("minBt_down");
		$(this).children(".icon").removeClass("icon_over");
	});
	this.view.mousedown(function(){
		$(this).addClass("minBt_down");
	});
	this.view.mouseup(function(){
		$(this).removeClass("minBt_down");
	});

	var self = this;
	this.view.click(function(){
		self.win.minimize();
	});
}

Win.MaxBt = function(_win)
{
	this.win = _win;
	this.view = $("<div class='maxBt'>");
	this.icon = $("<div class='icon'>");
	this.icon.appendTo(this.view);

	var self = this;

	if(!this.win.maximizeAble)
	{
		this.view.addClass("maxBt_disable");
		return;
	}

	this.view.mouseover(function()
	{
		$(this).addClass("maxBt_over");
		self.icon.css("background-image",self.win.maximizing?"url(assets/images/max_w0.png)":"url(assets/images/max_w.png)");
	});
	this.view.mouseout(function(){
		$(this).removeClass("maxBt_over");
		self.icon.css("background-image",self.win.maximizing?"url(assets/images/max_b0.png)":"url(assets/images/max_b.png)");
	});
	this.view.mousedown(function(){
		$(this).addClass("maxBt_down");
	});
	this.view.mouseup(function(){
		$(this).removeClass("maxBt_down");
	});
	this.view.mouseout(function(){
		$(this).removeClass("maxBt_down");
	});

	var self = this;
	this.view.click(function(){
		if(!self.win.maximizing)
		{
			self.win.maximize();
			self.icon.css("background-image","url(assets/images/max_w0.png)");
		}
		else
		{
			self.win.restore();
			self.icon.css("background-image","url(assets/images/max_w.png)");
		}
	});
}

/**
 * 标题
 */

Win.TitleField = function(_win)
{
	this.win = _win;
	this.view = $("<div class='title'>");
	this.view.text(this.win.title);
	this.temp = null;
}

Win.TitleField.prototype.setTitle = function(_title)
{
	this.view.css("width","auto");
	this.view.text(_title);
	this.temp = null;
	this.resize();
}

Win.TitleField.prototype.resize = function()
{
	if(this.temp == null)
	{
		this.temp = {};
		this.temp.width = this.view.width();
		this.temp.height = this.view.height();
	}
	this.view.css("top",this.win.thick);
	this.view.css("left",(this.win.width-this.view.width())*0.5);
	if(this.view.position().left+this.temp.width >= this.win.minBt.view.position().left - this.win.thick)
	{
		this.view.width(this.win.minBt.view.position().left - this.win.thick - this.view.position().left);
	}
	else
	{
		this.view.width(this.temp.width);
	}
	this.view.height(this.temp.height);
}

/**
 * 拖动框
 */

Win.DragFrame = function(_win)
{
	this.win = _win;
	this.thick = this.win.thick;
	this.dragBarHeight = this.win.barHeight;
	this._enableResize = true;
	this.init();
}

Win.DragFrame.prototype.init = function()
{
	this.view = $("<div>",{style:"position:absolute;"});
	this.frame = $("<div>",{style:"position:absolute;"});
	this.frame.appendTo(this.view);
	this.leftBar = $("<div>",{style:"position:absolute;"});
	this.rightBar = $("<div>",{style:"position:absolute;"});
	this.topBar = $("<div>",{style:"position:absolute;"});
	this.downBar = $("<div>",{style:"position:absolute;"});
	this.topLeftBox = $("<div>",{style:"position:absolute;"});
	this.topRightBox = $("<div>",{style:"position:absolute;"});
	this.downLeftBox = $("<div>",{style:"position:absolute;"});
	this.downRightBox = $("<div>",{style:"position:absolute;"});
	this.leftBar.appendTo(this.frame);
	this.rightBar.appendTo(this.frame);
	this.topBar.appendTo(this.frame);
	this.downBar.appendTo(this.frame);
	this.topLeftBox.appendTo(this.frame);
	this.topRightBox.appendTo(this.frame);
	this.downLeftBox.appendTo(this.frame);
	this.downRightBox.appendTo(this.frame);
	this.topLeftBox.width(this.thick);
	this.topLeftBox.height(this.thick);
	this.topBar.height(this.thick);
	this.topRightBox.width(this.thick);
	this.topRightBox.height(this.thick);
	this.rightBar.width(this.thick);
	this.leftBar.width(this.thick);
	this.downLeftBox.width(this.thick);
	this.downLeftBox.height(this.thick);
	this.downBar.height(this.thick);
	this.downRightBox.width(this.thick);
	this.downRightBox.height(this.thick);
	
	this.dragBar = $("<div>",{style:"position:absolute;"});
	this.dragBar.appendTo(this.view);
	this.dragBar.height(this.dragBarHeight);

	var self = this;
	if(this.win.resizeAble)
	{
		this.leftBar.mouseover(function(){
			$(this).css("cursor","w-resize");
		});
		this.rightBar.mouseover(function(){
			$(this).css("cursor","e-resize");
		});
		this.topBar.mouseover(function(){
			$(this).css("cursor","n-resize");
		});
		this.downBar.mouseover(function(){
			$(this).css("cursor","s-resize");
		});
		this.topLeftBox.mouseover(function(){
			$(this).css("cursor","nw-resize");
		});
		this.downRightBox.mouseover(function(){
			$(this).css("cursor","se-resize");
		});
		this.topRightBox.mouseover(function(){
			$(this).css("cursor","ne-resize");
		});
		this.downLeftBox.mouseover(function(){
			$(this).css("cursor","sw-resize");
		});
		this.initResizeAction();
	}

	if(this.win.dragAble)
	{
		this.initDragAction();
	}
}

Win.DragFrame.prototype.initDragAction = function()
{
	var self = this;
	var dp = {};
	var moved;
	this.dragBar.mousedown(function(e){
		moved = false;
		dp.x = e.clientX;
		dp.y = e.clientY;
		dp.initX = self.win.x;
		dp.initY = self.win.y;
		$(document).bind("mousemove",mousemoveHandler);
		$(document).bind("mouseup",mouseupHandler);
	});
	function mousemoveHandler(e)
	{
		if(!moved)
		{
			moved = true;
			self.win.view.trigger(new Event(Win.DRAG_START));
			if(self.win.maximizing)
			{
				if(dp.x<=self.win.tmp.width/2)
				{
					dp.initX = 0;
				}
				else if(dp.x>self.win.width - self.win.tmp.width/2)
				{
					dp.initX = dp.x - self.win.tmp.width + (self.win.width-dp.x);
				}
				else
				{
					dp.initX = dp.x - dp.x/self.win.width*self.win.tmp.width;
				}
				dp.initY = self.win.y;
				self.win.restore();
			}
		}
		var tx = dp.initX + e.clientX - dp.x;
		var ty = dp.initY + e.clientY - dp.y;
		self.win.moveTo(tx,ty);
	}
	function mouseupHandler(e)
	{
		$(document).unbind("mousemove",mousemoveHandler);
		$(document).unbind("mouseup",mouseupHandler);
		self.win.view.trigger(new Event(Win.DRAG_END));
	}
}

Win.DragFrame.prototype.enableResize = function(value)
{
	if(value)
	{
		this.frame.show();
	}
	else
	{
		this.frame.hide();
	}
	this._enableResize = value;
}

Win.DragFrame.prototype.initResizeAction = function()
{
	resizeHandle(this.rightBar,"right");
	resizeHandle(this.leftBar,"left");
	resizeHandle(this.downBar,"down");
	resizeHandle(this.topBar,"top");
	resizeHandle(this.downRightBox,"downRight");
	resizeHandle(this.downLeftBox,"downLeft");
	resizeHandle(this.topLeftBox,"topLeft");
	resizeHandle(this.topRightBox,"topRight");
	var self = this;
	function resizeHandle(bar,direction)
	{
		var dp = {};
		bar.mousedown(function(e){
			dp.x = e.clientX;
			dp.y = e.clientY;
			dp.initX = self.win.x;
			dp.initY = self.win.y;
			dp.initW = self.win.width;
			dp.initH = self.win.height;
			$(document).bind("mousemove",mousemoveHandler);
			$(document).bind("mouseup",mouseupHandler);
			self.win.view.trigger(new Event(Win.RESIZE_START));
		});
		function mousemoveHandler(e)
		{
			var tw,th,tx,ty;
			var disX = e.clientX - dp.x;
			var disY = e.clientY - dp.y;
			switch(direction)
			{
				case "right":
				tw = dp.initW + disX;
				fixW();
				self.win.width = tw;
				break;
				case "left":
				tw = dp.initW - disX;
				fixW();
				self.win.width = tw;
				tx = dp.initX + disX;
				ty = dp.initY;
				self.win.moveTo(tx,ty);
				break;
				case "down":
				th = dp.initH + disY;
				fixH();
				self.win.height = th;
				break;
				case "top":
				th = dp.initH - disY;
				fixH();
				self.win.height = th;
				tx = dp.initX;
				ty = dp.initY + disY;
				self.win.moveTo(tx,ty);
				break;
				case "downRight":
				tw = dp.initW + disX;
				th = dp.initH + disY;
				fixW();
				fixH();
				self.win.width = tw;
				self.win.height = th;
				break;
				case "downLeft":
				tw = dp.initW - disX;
				th = dp.initH + disY;
				fixW();
				fixH();
				tx = dp.initX + disX;
				ty = dp.initY;
				self.win.width = tw;
				self.win.height = th;
				self.win.moveTo(tx,ty);
				break;
				case "topLeft":
				tw = dp.initW - disX;
				th = dp.initH - disY;
				fixW();
				fixH();
				tx = dp.initX + disX;
				ty = dp.initY + disY;
				self.win.width = tw;
				self.win.height = th;
				self.win.moveTo(tx,ty);
				break;
				case "topRight":
				tw = dp.initW + disX;
				th = dp.initH - disY;
				fixW();
				fixH();
				tx = dp.initX;
				ty = dp.initY + disY;
				self.win.width = tw;
				self.win.height = th;
				self.win.moveTo(tx,ty);
				break;
			}
			self.win.resizeHandler();

			//限制缩放范围
			function fixW()
			{
				if(tw<self.win.minWidth)
				{
					disX-=self.win.minWidth-tw;
					tw = self.win.minWidth;
				}
			}

			function fixH()
			{
				if(th<self.win.minHeight)
				{
					disY-=self.win.minHeight-th;
					th = self.win.minHeight;
				}
			}
		}
		function mouseupHandler(e)
		{
			$(document).unbind("mousemove",mousemoveHandler);
			$(document).unbind("mouseup",mouseupHandler);
			self.win.view.trigger(new Event(Win.RESIZE_END));
		}
	}
}

Win.DragFrame.prototype.resize = function()
{
	this.width = this.win.width;
	this.height = this.win.height;
	this.topBar.width(this.width-this.thick*2);
	this.topRightBox.css("left",this.width-this.thick);
	this.rightBar.height(this.height-this.thick*2);
	this.rightBar.css("top",this.thick);
	this.rightBar.css("left",this.width-this.thick);
	this.leftBar.height(this.height-this.thick*2);
	this.leftBar.css("top",this.thick);
	this.downLeftBox.css("top",this.height-this.thick);
	this.downBar.width(this.width-this.thick*2);
	this.downBar.css("top",this.height-this.thick);
	this.downBar.css("left",this.thick);
	this.downRightBox.css("top",this.height-this.thick);
	this.downRightBox.css("left",this.width-this.thick);
	this.dragBar.width(this.width-this.thick*2);
	this.dragBar.css("top",this.thick);
	this.dragBar.css("left",this.thick);
}