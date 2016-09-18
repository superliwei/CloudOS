/**
 * 底部工具条的提示盒子
 */

CloudOS.TipBox = (function(){
	
	function TipBox(_option)
	{
		this.option = _option;
		this.init();
	}
	
	TipBox.prototype.init = function()
	{
		var self = this;
		this.option = this.option || {};
		this.width = 100;
		this.height = 50;
		
		this.target = this.option.target;
		this.parentView = this.option.parentView;
		
		this.view = $("<div>",{'class':"CloudOS TipBox"});
		this.view.appendTo(this.parentView);
		this.view.css("z-index",Number(this.target.view.css("z-index")+1));
		
		this.titleTf = $("<div>",{'class':"title"});
		this.titleTf.appendTo(this.view);
		this.titleTf.text(this.target.data.title);
	
		this.ct = $("<div>",{'class':"body"});
		this.ct.appendTo(this.view);
	
		this.arrow = $("<div>",{'class':"arrow"});
		this.arrow.appendTo(this.view);
		
	
		this.gridLayout = new CloudOS.AutoGridLayout();
		this.gridLayout.view.appendTo(this.ct);
		this.gridLayout.view.css("overflow-x","hidden");
		
		this.targetMask = $("<div>",{'class':"targetMask"});
		this.targetMask.appendTo(this.view);
		this.target.hideTip();
		CloudOS.QuickBar.ImageItem.showTipAble = false;
		this.target.view.css("opacity",0);
	
		this.resize();
	    this.gridLayout.loadStart(this.option.target.data.list,function(_data){
	    	if(_data.length == 0)return;
	    	var size = (function(len){
	    		var _w,_h;
	    		if(len <= 2)
	    		{
	    			_w = 120*len + 10;
	    			_h = 120 + 40;
	    		}
	    		else if(len <= 4)
	    		{
	    			_w = 120*2 + 10;
	    			_h = 120*2 + 40;
	    		}
	    		else if(len <= 9)
	    		{
	    			_w = 120*3 + 10;
	    			_h = 120*Math.ceil(len/3) + 40;
	    		}
	    		else if(len <= 12)
	    		{
	    			_w = 120*4 + 10;
	    			_h = 120*Math.ceil(len/4) + 40;
	    		}
	    		else
	    		{
	    			_w = 120*4 + 10;
	    			_h = 120*3 + 40;
	    		}
	    		return {width:_w,height:_h};
	    	})(_data.length);
	    	self.width = size.width;
	    	self.height = size.height;
	    	self.resize();
	    });
		
		$(window).bind("resize",this,this.resizeHandler);
		$(document).bind("mousedown",this,this.destroy);
		$(document).bind(CloudOS.CoreEvent.DOCUMENT_DOWN,this,this.destroy);
		this.view.mousedown(function(e){
			e.stopPropagation();
		});
		this.targetMask.mousedown(function(){
			$(this).css("-webkit-filter","brightness(0.5)");
			$(document).bind("mouseup",mouseupHandler);
		});
		
		function mouseupHandler()
		{
			$(document).unbind("mouseup",mouseupHandler);
			self.targetMask.css("-webkit-filter","brightness(1)");
		}
		
		this.targetMask.bind("click",this,function(e){
			e.showTip = true;
			self.destroy(e);
		});
	}
	
	TipBox.prototype.resizeHandler = function(e)
	{
		var self = e.data;
		self.resize();
	}
	
	TipBox.prototype.resize = function()
	{
		this.view.width(this.width);
		this.view.height(this.height);
		
		var tx = this.target.view.offset().left - (this.width-this.target.view.width())*0.5;
		var ty = this.target.view.offset().top - this.height - 25;
		this.view.offset({left:tx,top:ty});
		
		var arrowWidth = parseInt(this.arrow.css("border-left-width"))*2;
		var arrowHeight = parseInt(this.arrow.css("border-top-width"));
		var ax = this.target.view.offset().left + (this.target.view.width()-arrowWidth)*0.5;
		var ay = this.target.view.offset().top - 25;
		this.arrow.offset({left:ax,top:ay});
	
		this.gridLayout.resize(this.ct.width(),this.ct.height());
		this.targetMask.width(this.target.view.width());
		this.targetMask.height(this.target.view.height());
		this.targetMask.offset(this.target.view.offset());
	}
	
	TipBox.prototype.destroy = function(e,flag)
	{
		if(flag == "TipBox")return;
		var self = e.data;
		self.target.view.css("opacity",1);
		self.view.remove();
		$(document).unbind("mousedown",self.destroy);
		$(document).unbind(CloudOS.CoreEvent.DOCUMENT_DOWN,self.destroy);
		$(window).unbind("resize",self.resizeHandler);
		CloudOS.QuickBar.ImageItem.showTipAble = true;
		if(e.showTip)self.target.showTip();
		self.target = null;
		self.parentView = null;
	}
	
	return TipBox;

})();