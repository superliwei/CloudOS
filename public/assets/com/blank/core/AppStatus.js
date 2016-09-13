CloudOS.AppStatus = (function(){
	function AppStatus(_app,_class)
	{
		this.app = _app;
		this.class = _class;
		this.class.instances = this.class.instances || [];
		var self = this;
		var win = _app.win;
		win.view.bind(CloudOS.Win.ADD,function(){
			self.class.instances.push(self.app);
			self.change();
		});
		win.view.bind(CloudOS.Win.CLOSE,function(){
			CloudOS.PopUpManager.removePop(self.app);
			var idx = self.class.instances.indexOf(self.app);
			self.class.instances.splice(idx,1);
			self.change();
		});
		win.view.bind(CloudOS.Win.MINIMIZE,function(){
			CloudOS.QuickBar.instance().addIcon({
				title:win.title,
				img:"assets/images/icons/128/minWin.png",
				app:self.app
			});
		});
		win.view.bind(CloudOS.Win.SELECT,function(){
			CloudOS.PopUpManager.selectPop(self.app);
		});
	}
	
	AppStatus.prototype.change = function()
	{
		CloudOS.BroadcastCenter.dispatchEvent(new CloudOS.Event(AppStatus.UPDATE));
	}
	
	AppStatus.UPDATE = "AppStatus_update";
	
	return AppStatus;
})();