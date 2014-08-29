/**
 * 顶部条
 */

var TopBar = function()
{
	this.view = $("<div>",{"style":"position:absolute;height:26px;background:url(assets/images/bar.png);"});
	this.view.css("box-shadow","0px 0px 25px rgba(0,0,0,0.5)");

	this.menuBar = new MenuBar();
	this.menuBar.view.appendTo(this.view);
	this.menuBar.view.css("margin-left",5);

	var self = this;
	$(window).resize(function(){
		self.resizeHandler();
	});

	this.updateMenuBar(null);
	
	BroadcastCenter.addEventListener(PopUpManager.CHANGE,function(){
		self.updateMenuBar(PopUpManager.currentPop);
	});

	this.height = this.view.height();
}

TopBar.prototype.updateMenuBar = function(_target)
{
	_target = _target == null?Folder:_target;
	var source = {
		"items":[],
		"height":26
	};
	source.items.push({"img":"assets/images/logo.png","children":[
		{"label":"我是中文"},
		{"label":"我是中文"},
		{"label":"我是中文"},
		{"label":"我是中文"},
		{"type":"separator"},
		{"label":"我是中文"},
		{"label":"我是中文"},
		{"label":"我是中文"}
	]});
	if(_target.menu!=undefined)
	{
		source.items = source.items.concat(_target.menu);
	}
	else
	{
		source.items.push({"label":_target.win.title,"bold":true});
	}
	source.items.push({"label":"窗口"});
	source.items.push({"label":"帮助"});
	this.menuBar.setSource(source);
}

TopBar.prototype.appendTo = function(_parentView)
{
	this.view.appendTo(_parentView);
	this.resizeHandler();
}

TopBar.prototype.resizeHandler = function()
{
	this.view.width($(window).width());
}

TopBar._instance = null;
TopBar.instance = function()
{
	if(TopBar._instance == null)
	{
		TopBar._instance = new TopBar();
	}
	return TopBar._instance;
}