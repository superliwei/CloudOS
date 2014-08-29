/**
 * 文件夹
 */

var Folder = function(_option)
{
	this.option = _option;
	this.init();
}

Folder.prototype.init = function()
{
	this.option.win = this.option.win == undefined?{}:this.option.win;
	if(this.option.win.icon == undefined)
	{
		this.option.win.icon = "assets/images/icons/16/folder.png";
	}
	this.option.win.barHeight = 55;

	this.win = new Win(this.option.win);

	this.toolBar = $("<div>",{"style":"position:absolute;overflow:hidden"});
	this.toolBar.css("left",this.win.thick);
	this.toolBar.css("top",30);
	this.toolBar.height(24);
	
	this.leftBt = new Button({
		"icon":"assets/images/arrowL.png",
		"width":24,
		"height":24
	});

	this.rightBt = new Button({
		"icon":"assets/images/arrowR.png",
		"width":24,
		"height":24
	});
	this.rightBt.moveTo(26,0);

	this.searchBar = new SearchBar();

	this.viewTab = new NavTab({
		"tabs":[
			{"icon":"assets/images/gridView.png","width":24,"height":24},
			{"icon":"assets/images/listView.png","width":24,"height":24}
		]
	});
	this.viewTab.moveTo(56,0);

	this.settingCb = new ComboBox({
		"icon":"assets/images/setting.png",
		"width":24,
		"height":24
	});
	this.settingCb.moveTo(110,0);

	this.gridLayout = new GridLayout();
	this.gridLayout.view.appendTo(this.win.content);

	this.settingCb.view.appendTo(this.toolBar);
	this.viewTab.view.appendTo(this.toolBar);
	this.leftBt.view.appendTo(this.toolBar);
	this.rightBt.view.appendTo(this.toolBar);
	this.searchBar.view.appendTo(this.win.view);
	this.toolBar.appendTo(this.win.view);

	this.status = new AppStatus(this,Folder);

	this.menu = Folder.menu;

	var self = this;
	this.win.view.bind(Win.ADD,function(){
		self.gridLayout.loadStart();
	});
	this.win.view.bind(Win.RESIZE,function(){
		self.resizeHandler();
	});
}

Folder.menu = [
	{"label":"Finder","bold":"true","children":[
		{"label":"hello world !"},
		{"label":"我是中文"},
		{"type":"separator"},
		{"label":"hello world !","children":[
			{"label":"hello world !"},
			{"label":"我是中文"},
			{"type":"separator"},
			{"label":"我是中文","children":[
				{"label":"我是中文"},
				{"label":"我是中文"},
				{"label":"我是中文"},
				{"type":"separator"},
				{"label":"我是中文"},
				{"label":"我是中文"},
				{"type":"separator"},
				{"label":"我是中文"}
			]},
			{"label":"我是中文"}
		]}
	]},
	{"label":"文件"},
	{"label":"编辑"},
	{"label":"显示"},
	{"label":"前往"}
];

Folder.prototype.open = function()
{
	PopUpManager.popup(this);
}

Folder.prototype.resizeHandler = function()
{
	var tw = this.settingCb.view.position().left + this.settingCb.width;
	this.toolBar.width(tw+this.win.thick*2>this.win.width?this.win.width-this.win.thick*2:tw);
	this.searchBar.moveTo(this.win.width-this.searchBar.view.width() - this.win.thick,30);
	this.gridLayout.resize(this.win.content.width(),this.win.content.height());
}

Folder.newOpen = function(_url)
{
	var folder = new Folder({
		"win":{
			"parentView":Desktop.instance().winLayer,
			"title":_url
		}
	});
	folder.open();
}