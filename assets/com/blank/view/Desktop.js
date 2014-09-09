/**
 * 桌面
 */

var Desktop = function()
{
	this.view = $("<div>",{
		style:"position:absolute;"
	});
	this.bgLayer = $("<div>",{
		style:"position:absolute;z-index:0;"
	});
	this.winLayer = $("<div>",{
		style:"position:absolute;z-index:1;"
	});
	this.barLayer = $("<div>",{
		style:"position:absolute;z-index:2;"
	});
	this.menuLayer = $("<div>",{
		style:"position:absolute;z-index:3;"
	});
	this.bgLayer.appendTo(this.view);
	this.winLayer.appendTo(this.view);
	this.barLayer.appendTo(this.view);
	this.menuLayer.appendTo(this.view);
}

Desktop.prototype.ready = function(_onReady)
{
	var self = this;
	//开始读取桌面必须数据
	setTimeout(function(){
		_onReady();
	},2000);
}

Desktop.prototype.appendTo = function(_parentView)
{
	this.view.appendTo(_parentView);
	this.init();
	this.test();
}

Desktop.prototype.init = function()
{
	Background.instance().appendTo(this.bgLayer);
	TopBar.instance().appendTo(this.barLayer);
	QuickBar.instance().appendTo(this.barLayer);

	this.gridLayout = new DesktopGridLayout();
	this.gridLayout.view.appendTo(this.bgLayer);
	this.gridLayout.moveTo(0,TopBar.instance().height);

	this.resizeHandler();
	this.gridLayout.loadStart();
	this.show();
	
	$(window).resize(this,function(e){
		e.data.resizeHandler();
	});
}

Desktop.prototype.show = function()
{
	var ty = TopBar.instance().view.offset().top - TopBar.instance().view.height();
	TweenLite.from(TopBar.instance().view,1,{top:ty,ease:Cubic.easeInOut});
	ty = QuickBar.instance().view.offset().top + QuickBar.instance().view.outerHeight();
	TweenLite.from(QuickBar.instance().view,1,{top:ty,ease:Cubic.easeInOut});
}

Desktop.prototype.resizeHandler = function()
{
	this.gridLayout.resize($(window).width(),$(window).height() - TopBar.instance().height);
	this.menuLayer.width($(window).width());
}

Desktop._instance = null;

Desktop.instance = function()
{
	if(Desktop._instance == null)
	{
		Desktop._instance = new Desktop();
	}
	return Desktop._instance;
}

/**
 * 测试----------------------------------------------------------------------------------------
 */
Desktop.prototype.test = function()
{
    //this.test_folder();
}

Desktop.prototype.test_folder = function()
{
    Folder.newOpen("/");
}