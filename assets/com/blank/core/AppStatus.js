var AppStatus = function(_app,_class)
{
	this.app = _app;
	this.class = _class;
	this.class.instances = this.class.instances==undefined?[]:this.class.instances;
	var self = this;
	var win = _app.win;
	win.view.bind(Win.ADD,function(){
		self.class.instances.push(self.app);
		self.change();
	});
	win.view.bind(Win.CLOSE,function(){
		PopUpManager.removePop(self.app);
		var idx = self.class.instances.indexOf(self.app);
		self.class.instances.splice(idx,1);
		self.change();
	});
	win.view.bind(Win.MINIMIZE,function(){
		QuickBar.instance().addIcon({
			"title":win.title,
			"img":"assets/images/icons/128/minWin.png",
			"app":self.app
		});
	});
	win.view.bind(Win.SELECT,function(){
		PopUpManager.selectPop(self.app);
	});
}

AppStatus.prototype.change = function()
{
	BroadcastCenter.dispatchEvent(new Event(AppStatus.UPDATE));
}

AppStatus.UPDATE = "AppStatus_update";