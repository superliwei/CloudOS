/**
 * 窗体
 */

CloudOS.Win = (function(){
	function Win(_option)
	{
		this.option = _option || {};
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
		this.parentView = this.option.parentView || null;
		this.width = this.option.width != undefined ? this.option.width : 500;
		this.height = this.option.height != undefined ? this.option.height : 400;
		this.thick = this.option.thick != undefined ? this.option.thick : 5;
		this.barHeight = this.option.barHeight != undefined ? this.option.barHeight : 25;
		this.minWidth = this.option.minWidth != undefined ? this.option.minWidth : 150;
		this.minHeight = this.option.minHeight != undefined ? this.option.minHeight : 100;
		this.minimizeAble = this.option.minimizeAble != undefined ? this.option.minimizeAble : true;
		this.maximizeAble = this.option.maximizeAble != undefined ? this.option.maximizeAble : true;
		this.resizeAble = this.option.resizeAble != undefined ? this.option.resizeAble : true;
		this.dragAble = this.option.dragAble != undefined ? this.option.dragAble : true;
		this.title = this.option.title || "窗体标题";
		this.icon = this.option.icon || "assets/images/icons/16/app.png";
		this.maximizing = false;
	
		this.view = $("<div class='CloudOS Win'>");
	
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
		this.view.trigger(new CloudOS.Event(Win.RESIZE));
	}
	
	Win.prototype.open = function()
	{
		this.view.appendTo(this.parentView);
		this.resizeHandler();
		var self = this;
		TweenLite.from(this.view,0.5,{alpha:0,rotationX:30,z:-300,ease:Cubic.easeInOut,onStart:function(){
	        self.mouseEnable(false);
	    },onComplete:function(){
	        self.mouseEnable(true);
	        self.view.get(0).style.transform = null;
	    }});
		this.view.trigger(new CloudOS.Event(Win.ADD));
	}
	
	Win.prototype.mouseEnable = function(value)
	{
		this.view.css("pointer-events",value?"":"none");
	}
	
	Win.prototype.moveTo = function(_x,_y)
	{
		if(_x!=undefined)this.x = _x;
		if(_y!=undefined)this.y = _y;
		this.view.offset({left:this.x,top:this.y});
	}
	
	Win.prototype.close = function()
	{
		var self = this;
	    TweenLite.to(this.view,0.5,{alpha:0,rotationX:30,z:-300,ease:Cubic.easeInOut,onStart:function(){
	        self.mouseEnable(false);
	    },onComplete:function(){
	        self.mouseEnable(true);
	        self.destroy();
	        self.view.trigger(new CloudOS.Event(Win.CLOSE));
	    }});
	}
	
	Win.prototype.maximize = function()
	{
	    var self = this;
		this.maxBt.icon.css("background-position-x","-44px");
		this.tmp = {
			x:this.x,
			y:this.y,
			width:this.width,
			height:this.height
		};
		var obj = {x:this.tmp.x,y:this.tmp.y,width:this.tmp.width,height:this.tmp.height};
	    TweenLite.to(obj,0.5,{x:0,y:26,width:$(window).width(),height:$(window).height()-26,onStart:function(){
	        self.mouseEnable(false);
	    },onUpdate:function(){
	        self.width = obj.width;
	        self.height = obj.height;
	        self.moveTo(obj.x,obj.y);
	        self.resizeHandler();
	    },onComplete:function(){
	        self.mouseEnable(true);
	        self.maximizing = true;
	        $(window).bind("resize",self,self.windowResizeHandler);
	        self.dragFrame.enableResize(false);
	    },ease:Cubic.easeInOut});
	}
	
	Win.prototype.windowResizeHandler = function(e)
	{
		var self = e.data;
		self.resizeHandler();
	}
	
	Win.prototype.restore = function(drag)
	{
	    var self = this;
		this.maximizing = false;
		this.maxBt.icon.css("background-position-x","-22px");
		$(window).unbind("resize",this.windowResizeHandler);
	
	    var time = drag == undefined?0.5:0;
	
	    var obj = {x:0,y:26,width:$(window).width(),height:$(window).height()-26};
	    TweenLite.to(obj,time,{x:this.tmp.x,y:this.tmp.y,width:this.tmp.width,height:this.tmp.height,onStart:function(){
	        self.mouseEnable(false);
	    },onUpdate:function(){
	        self.width = obj.width;
	        self.height = obj.height;
	        if(drag == undefined)self.moveTo(obj.x,obj.y);
	        self.resizeHandler();
	    },onComplete:function(){
	        self.dragFrame.enableResize(true);
	        self.mouseEnable(true);
	    },ease:Cubic.easeInOut});
	
		delete this.tmp;
	
	}
	
	Win.prototype.minimize = function()
	{
	    this.tmp0 = {
	        x:this.x,
	        y:this.y
	    };
	    var self = this;
	    var items = CloudOS.QuickBar.instance().items;
	    var trash = items[items.length-1];
	    var tx = trash.view.offset().left - this.width*0.5;
	    var ty = trash.view.offset().top - this.height*0.5;
	    TweenLite.to(this.view,0.5,{left:tx,top:ty,scaleX:0.1,scaleY:0.1,alpha:0,onStart:function(){
	        self.mouseEnable(false);
	    },onComplete:function(){
	        self.view.hide();
	        self.mouseEnable(true);
	        self.view.trigger(new CloudOS.Event(Win.MINIMIZE));
	    },ease:Cubic.easeInOut});
	}
	
	Win.prototype.normalize = function()
	{
	    var items = CloudOS.QuickBar.instance().getSortableItems(1);
	    var tx,ty;
	    for(var i=0;i<items.length;i++)
	    {
	        var item = items[i];
	        if(item.icon.data.app!=undefined && item.icon.data.app.win == this)
	        {
	            this.view.show();
	            tx = item.view.offset().left + item.view.width()*0.5 - this.width*0.5;
	            ty = item.view.offset().top - this.height*0.5;
	            TweenLite.to(this.view,0,{left:tx,top:ty});
	            break;
	        }
	    }
	    var self = this;
	    tx = this.tmp0.x;
	    ty = this.tmp0.y;
	    delete this.tmp0;
	    TweenLite.to(this.view,0.5,{left:tx,top:ty,alpha:1,scaleX:1,scaleY:1,onStart:function(){
	        self.mouseEnable(false);
	    },onComplete:function(){
	        self.mouseEnable(true);
	        self.view.get(0).style.transform = null;
	        self.resizeHandler();
	    },ease:Cubic.easeInOut});
	}
	
	Win.prototype.destroy = function()
	{
		$(window).unbind("resize",this.windowResizeHandler);
	}
	
	Win.prototype.active = function(value)
	{
		if(value!=undefined)
		{
			this.view[value ? "addClass" : "removeClass"]("active");
			if(value)
			{
				this.view.unbind("mousedown",this.mousedownHandler);
				this.view.trigger(new CloudOS.Event(Win.ACTIVE));
			}
			else
			{
				this.view.bind("mousedown",this.mousedownHandler);
				this.view.trigger(new CloudOS.Event(Win.DISACTIVE));
			}
		}
	}
	
	Win.prototype.mousedownHandler = function(e)
	{
		$(this).trigger(new CloudOS.Event(Win.SELECT));
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
	    var self = this;
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
		this.view.mouseout(mouseoutHandler);
	    function mouseoutHandler()
	    {
	        self.view.removeClass("minBt_over");
	        self.view.removeClass("minBt_down");
	        self.view.children(".icon").removeClass("icon_over");
	    }
		this.view.mousedown(function(){
			$(this).addClass("minBt_down");
		});
		this.view.mouseup(function(){
			$(this).removeClass("minBt_down");
		});
		this.view.click(function(){
	        mouseoutHandler();
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
			self.icon.css("background-position-x",self.win.maximizing ? "-88px" : "-66px");
	        self.view.unbind("mouseout");
	        self.view.bind("mouseout",mouseoutHandler);
		});
	
	    function mouseoutHandler()
	    {
	    	self.view.removeClass("maxBt_over");
	        self.view.removeClass("maxBt_down");
	        self.icon.css("background-position-x",self.win.maximizing ? "-44px" : "-22px");
	    }
		this.view.mousedown(function(){
			$(this).addClass("maxBt_down");
		});
		this.view.mouseup(function(){
			$(this).removeClass("maxBt_down");
		});
	
		var self = this;
		this.view.click(function(){
	        mouseoutHandler();
			if(!self.win.maximizing)
			{
	            self.view.unbind("mouseout");
	            self.win.maximize();
			}
			else
			{
	            self.win.restore();
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
		this.label = $("<div class='label'>");
		this.label.appendTo(this.view);
		this.label.text(this.win.title);
		this.view.css("top",this.win.thick);
	}
	
	Win.TitleField.prototype.setTitle = function(_title)
	{
		this.label.text(_title);
		this.resize();
	}
	
	Win.TitleField.prototype.resize = function()
	{
		var tx = (this.view.width() - this.label.width())*0.5+25;
		this.label.css("left",tx);
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
				self.win.view.trigger(new CloudOS.Event(Win.DRAG_START));
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
					self.win.restore(true);
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
			self.win.view.trigger(new CloudOS.Event(Win.DRAG_END));
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
				self.win.view.trigger(new CloudOS.Event(Win.RESIZE_START));
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
				self.win.view.trigger(new CloudOS.Event(Win.RESIZE_END));
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
	
	return Win;
})();