/**
 * 底部工具条的提示盒子
 */

var TipBox = function(_option)
{
	this.option = _option;
	this.init();
}

TipBox.prototype.init = function()
{
	this.option = this.option == undefined?{}:this.option;
	this.width = this.option.width == undefined?620:this.option.width;
	this.height = this.option.height == undefined?380:this.option.height;
	this.target = this.option.target;
	this.parentView = this.option.parentView;
	
	this.view = $("<div>",{"style":"position:absolute;border:solid 1px #fff;border-radius:10px;"});
	this.view.css("background-image","url(assets/images/blackAlphaBg0.png)");
	this.view.css("box-shadow","2px 2px 10px #000");
	this.view.appendTo(this.parentView);
	this.view.css("z-index",Number(this.target.view.css("z-index")+1));
	
	this.titleTf = $("<div>",{"style":"position:absolute;text-align:center;font-size:14px;color:#fff;"});
	this.titleTf.appendTo(this.view);
	this.titleTf.text(this.target.data.title);

	this.ct = $("<div>",{"style":"position:absolute;overflow-X:hidden;overflow-Y:auto"});
	this.ct.appendTo(this.view);

	this.arrow = $("<div>",{"style":"position:absolute;background-image:url(assets/images/arrowDown.png);width:48px;height:21px;"});
	this.arrow.appendTo(this.view);

	this.gridLayout = new AutoGridLayout();
	this.gridLayout.view.appendTo(this.ct);
	
	this.targetMask = $("<div>",{"style":"position:absolute;"});
	this.targetMaskIcon = $("<img>",{
		"src":"assets/images/arrowPlaceHolder.png",
		"onDragStart":"return false"
	});
	this.targetMaskIcon.appendTo(this.targetMask);
	this.targetMask.appendTo(this.view);
	this.target.hideTip();
	QuickBar.ImageItem.showTipAble = false;
	this.target.view.css("opacity",0);

	this.resize();
	this.gridLayout.loadStart();
	
	$(window).bind("resize",this,this.resizeHandler);
	$(document).bind("mousedown",this,this.destroy);
	$(document).bind(CoreEvent.DOCUMENT_DOWN,this,this.destroy);
	this.view.mousedown(function(e){
		e.stopPropagation();
	});
	var self = this;
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
	this.titleTf.width(this.width-10);
	this.titleTf.css("top",5);
	this.titleTf.css("left",5);
	this.ct.width(this.width - 10);
	this.ct.height(this.height - 15 - this.titleTf.height());
	this.ct.css("left",5);
	this.ct.css("top",10+this.titleTf.height());
	var tx = this.target.view.offset().left - (this.width-this.target.view.width())*0.5;
	var ty = this.target.view.offset().top - this.height - 25;
	this.view.offset({"left":tx,"top":ty});
	
	var ax = this.target.view.offset().left + (this.target.view.width() - this.arrow.width())*0.5;
	var ay = this.target.view.offset().top - this.arrow.height() - 3;
	this.arrow.offset({"left":ax,"top":ay});

	this.gridLayout.resize(this.ct.width(),this.ct.height());
	this.targetMask.width(this.target.view.width());
	this.targetMask.height(this.target.view.height());
	this.targetMask.offset(this.target.view.offset());
	this.targetMaskIcon.css("max-width",this.targetMask.width());
	this.targetMaskIcon.css("max-height",this.targetMask.height());
}

TipBox.prototype.destroy = function(e,flag)
{
	if(flag == "TipBox")return;
	var self = e.data;
	self.target.view.css("opacity",1);
	self.view.remove();
	$(document).unbind("mousedown",self.destroy);
	$(document).unbind(CoreEvent.DOCUMENT_DOWN,self.destroy);
	$(window).unbind("resize",self.resizeHandler);
	QuickBar.ImageItem.showTipAble = true;
	if(e.showTip)self.target.showTip();
	self.target = null;
	self.parentView = null;
}