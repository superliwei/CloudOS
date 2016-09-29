/**
 * 桌面
 */
CloudOS.Desktop = function()
{
	var self = this;
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
	
	var super_appendTo = this.view.appendTo;
	this.view.appendTo = function(container)
	{
		super_appendTo.call(this,container);
		self.init();
		//test();
	}
	
	this.init = function()
	{
		this.bg = new CloudOS.Background();
		this.bg.view.appendTo(this.bgLayer);
		
		this.topBar = new CloudOS.TopBar();
		this.topBar.view.appendTo(this.barLayer);
		
		this.quickBar = CloudOS.QuickBar.instance();
		this.quickBar.view.appendTo(this.barLayer);
		
		this.gridLayout = new CloudOS.DesktopGridLayout();
		this.gridLayout.view.appendTo(this.bgLayer);
		this.gridLayout.moveTo(0,this.topBar.view.height());
		this.gridLayout.loadStart("/desktop");

		this.gridLayout.view.mouseup(function(){
			CloudOS.PopUpManager.selectPop(null);
		});
		
		resizeHandler();
		$(window).resize(resizeHandler);
	}
	
	function resizeHandler(e)
	{
		var w = $(window).width();
		var h = $(window).height();
		self.bg.setSize(w,h);
		self.topBar.setWidth(w);
		self.gridLayout.resize(w,h - self.topBar.view.height());
	}
	
	function test()
	{
		$(window).keydown(function(e){
			if(e.keyCode == 32)
			{
				CloudOS.Folder.newOpen("/");
			}
		});
	}
}