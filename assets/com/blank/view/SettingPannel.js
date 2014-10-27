var SettingPannel = function(_option)
{
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
	this.win = new Win(this.option.win);

	this.toolBar = $("<div>",{style:"position:absolute;overflow:hidden;"});
	this.toolBar.css("left",this.win.thick);
	this.toolBar.css("top",30);
	this.toolBar.height(24);
	
	this.leftBt = new Button({
		icon:"assets/images/arrowL.png",
		width:24,
		height:24
	});

	this.rightBt = new Button({
		icon:"assets/images/arrowR.png",
		width:24,
		height:24
	});
	this.rightBt.moveTo(26,0);

	this.searchBar = new SearchBar();

    this.showAllBt = new Button({
        text:"显示所有",
        height:24
    });
    this.showAllBt.moveTo(60,0)

	this.leftBt.view.appendTo(this.toolBar);
	this.rightBt.view.appendTo(this.toolBar);
    this.showAllBt.view.appendTo(this.toolBar);
	this.searchBar.view.appendTo(this.win.view);
	this.toolBar.appendTo(this.win.view);

	this.status = new AppStatus(this,SettingPannel);

    this.module = new Module();
    this.module.view.appendTo(this.win.content);

    this.loading = new SimulateLoading();
    this.loading.view.appendTo(this.win.content);
    this.loading.view.offset({top:0});

	var self = this;

    this.historyManager = new HistoryManager({
        controlBts:[this.leftBt,this.rightBt],
        handler:function(_url)
        {
            self.load(_url);
        }
    });

    this.win.view.bind(Win.ADD,function(){
        self.historyManager.add("assets/com/blank/module/setting/all.html");
    });

	this.win.view.bind(Win.RESIZE,function(){
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
	PopUpManager.popup(this);
}

SettingPannel.newSettingPannel = function()
{
	var settingPannel = new SettingPannel({
		win:{
			parentView:Desktop.instance().winLayer,
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