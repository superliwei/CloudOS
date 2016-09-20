CloudOS.SettingPannel = (function(){
	function SettingPannel(_option)
	{
		this.menuManager = new SettingPannel.MenuManager();
		
		this.option = _option;
		this.option.win = this.option.win == undefined?{}:this.option.win;
		if(this.option.win.icon == undefined)
		{
			this.option.win.icon = "assets/images/icons/16/setting.png";
		}
		this.option.win.barHeight = 55;
		if(this.option.win.title == undefined)
		{
			this.option.win.title = "偏好设置";
		}
		this.win = new CloudOS.Win(this.option.win);
	
		this.toolBar = $("<div>",{style:"position:absolute;overflow:hidden;"});
		this.toolBar.css("left",this.win.thick);
		this.toolBar.css("top",30);
		this.toolBar.height(24);
		
		this.leftBt = new CloudOS.Button({
			icon:"assets/images/arrowL.png",
			width:24,
			height:24
		});
	
		this.rightBt = new CloudOS.Button({
			icon:"assets/images/arrowR.png",
			width:24,
			height:24
		});
		this.rightBt.moveTo(26,0);
	
		this.searchBar = new CloudOS.SearchBar();
	
	    this.showAllBt = new CloudOS.Button({
	        text:"显示所有",
	        height:24
	    });
	    this.showAllBt.moveTo(60,0)
	
		this.leftBt.view.appendTo(this.toolBar);
		this.rightBt.view.appendTo(this.toolBar);
	    this.showAllBt.view.appendTo(this.toolBar);
		this.searchBar.view.appendTo(this.win.view);
		this.toolBar.appendTo(this.win.view);
	
		this.status = new CloudOS.AppStatus(this,SettingPannel);
	
	    this.module = new CloudOS.Module();
	    this.module.view.appendTo(this.win.content);
	
	    this.loading = new CloudOS.SimulateLoading();
	    this.loading.view.appendTo(this.win.content);
	    this.loading.view.offset({top:0});
	
		var self = this;
	
	    this.historyManager = new CloudOS.HistoryManager({
	        controlBts:[this.leftBt,this.rightBt],
	        handler:function(_url)
	        {
	            self.load(_url);
	        }
	    });
	
	    this.win.view.bind(CloudOS.Win.ADD,function(){
	        self.historyManager.add("assets/com/blank/module/setting/all.html");
	    });
	
		this.win.view.bind(CloudOS.Win.RESIZE,function(){
			self.resizeHandler();
		});
	}
	
	SettingPannel.prototype.load = function(_url)
	{
	    var self = this;
	    this.loading.show();
	    this.module.load(_url,function(){
	        self.loading.hide();
	    });
	}
	
	SettingPannel.prototype.open = function()
	{
		CloudOS.PopUpManager.popup(this);
	}
	
	SettingPannel.newSettingPannel = function()
	{
		var settingPannel = new SettingPannel({
			win:{
				parentView:CloudOS.CoreSystem.desktop.winLayer,
				maximizeAble:false,
				resizeAble:false
			}
		});
		settingPannel.open();
	}
	
	SettingPannel.prototype.resizeHandler = function()
	{
		var tw = this.showAllBt.view.position().left + this.showAllBt.view.outerWidth();
		this.toolBar.width(tw+this.win.thick*2>this.win.width?this.win.width-this.win.thick*2:tw);
		this.searchBar.moveTo(this.win.width-this.searchBar.view.width() - this.win.thick,30);
	    this.loading.resize(this.win.content.width());
	}
	
	/**
	 * 菜单
	 */
	SettingPannel.MenuManager = function()
	{
		CloudOS.MenuManager.call(this);
		
		this.getCustomMenuSource = function()
		{
			return [
				{label:"偏好设置",bold:"true",children:[
					{label:"关于偏好设置"}
				]}
			];
		}
	}
	
	return SettingPannel;

})();