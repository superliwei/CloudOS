/**
 * 顶部条
 */

var TopBar = function()
{
	this.view = $("<div>",{style:"position:absolute;height:26px;background:url(assets/images/bar.png);"});
	this.view.css("box-shadow","0px 0px 25px rgba(0,0,0,0.5)");

	this.menuBar = new MenuBar();
	this.menuBar.view.appendTo(this.view);
	this.menuBar.view.css("margin-left",5);
    this.menuBar.view.bind(Menu.ITEM_CLICK,this,function(e,item){
        trace(item.data);
    });

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
		items:[],
		height:26
	};
	source.items.push({img:"assets/images/logo.png",children:[
		{label:"关于Zoolon CloudOS"},
        {type:"separator"},
		{label:"终端",icon:"assets/images/icons/16/Terminal.png"},
        {label:"系统偏好设置",icon:"assets/images/icons/16/setting.png"},
        {type:"separator"},
        {label:"清空废纸篓"}
	]});
	if(_target.menu!=undefined)
	{
		source.items = source.items.concat(_target.menu);
	}
	else
	{
		source.items.push({label:_target.win.title,bold:true,children:[
            {label:"关于"+_target.win.title}
        ]});
	}
	source.items.push({label:"窗口",children:[
        {label:"最小化"},
        {label:"最大化"},
        {label:"关闭"}
    ]});
	source.items.push({label:"帮助",children:[
        {label:"使用说明"}
    ]});
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