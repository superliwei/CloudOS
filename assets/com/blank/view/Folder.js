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

	this.toolBar = $("<div>",{style:"position:absolute;overflow:hidden"});
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

	this.viewTab = new NavTab({
		tabs:[
			{icon:"assets/images/gridView.png",width:24,height:24},
			{icon:"assets/images/listView.png",width:24,height:24}
		],
        selectedIdx:0
	});
	this.viewTab.moveTo(56,0);
    this.viewTab.view.bind(NavTab.CHANGE,this,this.layoutChangeHandler);

	this.settingCb = new ComboBox({
		icon:"assets/images/setting.png",
		width:24,
		height:24,
        menu:[
            {label:"整理"},
            {type:"separator"},
            {label:"全选"},
            {label:"取消选择"},
            {type:"separator"},
            {label:"复制"},
            {label:"剪切"},
            {label:"粘贴"},
            {label:"删除"},
            {label:"重命名"},
            {type:"separator"},
            {label:"排序方式",children:[
                {label:"名称"},
                {label:"修改日期"},
                {label:"类型"},
                {label:"大小"},
            ]}
        ]
	});
	this.settingCb.moveTo(110,0);

	this.layout = new GridLayout();
	this.layout.view.appendTo(this.win.content);

	this.settingCb.view.appendTo(this.toolBar);
	this.viewTab.view.appendTo(this.toolBar);
	this.leftBt.view.appendTo(this.toolBar);
	this.rightBt.view.appendTo(this.toolBar);
	this.searchBar.view.appendTo(this.win.view);
	this.toolBar.appendTo(this.win.view);

	this.status = new AppStatus(this,Folder);

	this.menu = Folder.menu;

    var self = this;
    this.historyManager = new HistoryManager({
        controlBts:[this.leftBt,this.rightBt],
        handler:function(){
            self.layout.loadStart();
        }
    });

	this.win.view.bind(Win.ADD,function(){
		self.load();
	});
	this.win.view.bind(Win.RESIZE,function(){
		self.resizeHandler();
	});
}

Folder.prototype.load = function(_url)
{
    this.historyManager.add(_url);
}

Folder.prototype.open = function()
{
    PopUpManager.popup(this);
}

Folder.prototype.resizeHandler = function()
{
    var tw = this.settingCb.view.position().left + this.settingCb.width;
    this.toolBar.width(tw+this.win.thick*2>this.win.width?this.win.width-this.win.thick*2:tw);
    this.searchBar.moveTo(this.win.width-this.searchBar.view.width() - this.win.thick,30);
    this.layout.resize(this.win.content.width(),this.win.content.height());
}

Folder.prototype.layoutChangeHandler = function(e)
{
    var self = e.data;
    self.switchLayout(self.viewTab.selectedIdx);
}

/**
 * 切换视图
 */
Folder.prototype.switchLayout = function(_idx)
{
    if(this.viewTab.selectedIdx!=_idx)
    {
        this.viewTab.selectIdx(_idx);
    }
    var layouts = [GridLayout,DetailLayout];
    this.layout.destroy();
    this.layout = new layouts[_idx]();
    this.layout.view.appendTo(this.win.content);
    this.resizeHandler();
    this.layout.loadStart();
}

/**
 * 整理
 */
Folder.prototype.arrange = function()
{
    this.layout.layout();
}

/**
 * 排序
 */
Folder.prototype.sortBy = function(_option)
{

}

Folder.menu = [
	{label:"Finder",bold:"true",children:[
		{label:"关于Finder"},
	]},
	{label:"文件",children:[
        {label:"新建"},
        {type:"separator"},
        {label:"关闭当前"},
        {label:"关闭所有"},
        {type:"separator"},
        {label:"偏好设置"}
    ]},
	{label:"编辑",children:[
        {label:"全选"},
        {label:"取消选择"},
        {type:"separator"},
        {label:"复制"},
        {label:"剪切"},
        {label:"粘贴"},
        {label:"删除"},
        {label:"重命名"},
    ]},
	{label:"显示",children:[
        {label:"整理"},
        {type:"separator"},
        {label:"排序方式",children:[
            {label:"名称"},
            {label:"修改日期"},
            {label:"类型"},
            {label:"大小"},
        ]}
    ]},
	{label:"前往",children:[
        {label:"根目录"},
        {label:"应用程序"},
        {type:"separator"},
        {label:"路径"}
    ]}
];

Folder.run = function(cmd)
{
    var arr = cmd.split(" ");
    if(arr.length<3)
    {
        Folder.newOpen(arr[1]);
    }
    else
    {
        if(arr[2] == "_parent" && PopUpManager.currentPop instanceof Folder)
        {
            PopUpManager.currentPop.load(arr[1]);
        }
    }
}

Folder.newOpen = function(_url)
{
	var folder = new Folder({
		win:{
			parentView:Desktop.instance().winLayer,
			title:_url
		}
	});
	folder.open();
}