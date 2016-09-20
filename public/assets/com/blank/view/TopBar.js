/**
 * 顶部条
 */

CloudOS.TopBar = (function(){
	function TopBar()
	{
		var self = this;
		
		this.view = $("<div>",{'class':"CloudOS TopBar"});
	
		this.menuBar = new CloudOS.MenuBar();
		this.menuBar.view.appendTo(this.view);
		this.menuBar.view.css("margin-left",5);
		this.menuBar.view.on(CloudOS.Menu.ITEM_CLICK,function(e,item){
	   		if(self.menuManager)self.menuManager.handleItemClick(item);
	   	});
	   	
	   	this.menuBar.view.on(CloudOS.MenuBar.OPEN,function(e,item){
	   		if(self.menuManager)self.menuManager.handleMenuOpen(item);
	   	});
	
		this.updateMenuBar(null);
		
		CloudOS.BroadcastCenter.addEventListener(CloudOS.PopUpManager.CHANGE,function(){
			self.updateMenuBar(CloudOS.PopUpManager.currentPop);
		});
	}
	
	TopBar.prototype.updateMenuBar = function(_target)
	{
		_target = _target || CloudOS.Folder;
		this.menuManager = _target.menuManager;
	   	var source = this.menuManager.getMenuSource();
		this.menuBar.setSource(source);
	}
	
	TopBar.prototype.setWidth = function(width)
	{
		this.view.width(width);
	}
	return TopBar;
})();