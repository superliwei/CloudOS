/**
 * 顶部条
 */

CloudOS.TopBar = (function(){
	function TopBar()
	{
		this.view = $("<div>",{'class':"CloudOS TopBar"});
	
		this.menuBar = new CloudOS.MenuBar();
		this.menuBar.view.appendTo(this.view);
		this.menuBar.view.css("margin-left",5);
		this.menuBar.view.on(CloudOS.Menu.ITEM_CLICK,function(e,item){
	   		trace(item.data);
	    });
	
		this.updateMenuBar(null);
		
		var self = this;
		CloudOS.BroadcastCenter.addEventListener(CloudOS.PopUpManager.CHANGE,function(){
			self.updateMenuBar(CloudOS.PopUpManager.currentPop);
		});
	}
	
	TopBar.prototype.updateMenuBar = function(_target)
	{
		_target = _target || CloudOS.Folder;
		var source = {
			items:[],
			height:26
		};
		source.items.push({img:"assets/images/logo.png",children:[
			{label:"关于CloudOS"},
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
	
	TopBar.prototype.setWidth = function(width)
	{
		this.view.width(width);
	}
	return TopBar;
})();