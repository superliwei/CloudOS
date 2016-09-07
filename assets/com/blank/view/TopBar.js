/**
 * 顶部条
 */

CloudOS.TopBar = (function(){
	function TopBar()
	{
		this.view = $("<div>",{style:"position:absolute;height:26px;background:url(assets/images/bar.png);"});
		this.view.css("box-shadow","0px 0px 25px rgba(0,0,0,0.5)");
	
		this.menuBar = new CloudOS.MenuBar();
		this.menuBar.view.appendTo(this.view);
		this.menuBar.view.css("margin-left",5);
	    this.menuBar.view.bind(CloudOS.Menu.ITEM_CLICK,this,function(e,item){
	        trace(item.data);
	    });
	
		this.updateMenuBar(null);
		
		var self = this;
		CloudOS.BroadcastCenter.addEventListener(CloudOS.PopUpManager.CHANGE,function(){
			self.updateMenuBar(CloudOS.PopUpManager.currentPop);
		});
	
		this.height = this.view.height();
	}
	
	TopBar.prototype.updateMenuBar = function(_target)
	{
		_target = _target == null?CloudOS.Folder:_target;
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
	
	TopBar.prototype.setWidth = function(width)
	{
		this.view.width(width);
	}
	return TopBar;
})();