/**
 * 应用程序加载器
 */

var AppLoader = function(_option)
{
	this.option = _option;
	this.url = this.option.url;
	var configURL = this.url+"/config.json";
	var self = this;
	$.getJSON(configURL,function(data){
		self.config = data;
		self.init();
	});
}

AppLoader.prototype.init = function()
{
	this.config.win.parentView = this.option.parentView;
	this.win = new Win(this.config.win);
	this.frame = $("<iframe>",{
		src:this.config.index,
		style:"border:none;position:absolute;"
	});
	this.frame.appendTo(this.win.content);

	this.frameMask = $("<div>",{style:"position:absolute;"});
	this.frameMask.appendTo(this.win.content);
	this.frameMask.hide();

	var self = this;
	this.win.view.bind(Win.ADD,function(){
		self.resizeHandler();
	});
	this.win.view.bind(Win.RESIZE,function(){
		self.resizeHandler();
	})
	this.win.view.bind(Win.DRAG_START,function(){
		self.frameMask.show();
	});
	this.win.view.bind(Win.DRAG_END,function(){
		self.frameMask.hide();
	});
	this.win.view.bind(Win.RESIZE_START,function(){
		self.frameMask.show();
	});
	this.win.view.bind(Win.RESIZE_END,function(){
		self.frameMask.hide();
	});
	this.win.view.bind(Win.DISACTIVE,function(){
		self.frameMask.show();
	});
	this.win.view.bind(Win.ACTIVE,function(){
		self.frameMask.hide();
	});
	this.status = new AppStatus(this,AppLoader);
	PopUpManager.popup(this);
}

AppLoader.prototype.resizeHandler = function()
{
	this.frame.width(this.win.content.width());
	this.frame.height(this.win.content.height());
	this.frameMask.width(this.win.content.width());
	this.frameMask.height(this.win.content.height());
}


AppLoader.loaders = [];
AppLoader.newLoader = function(_url)
{
	var loader = new AppLoader({
		url:_url,
		parentView:Desktop.instance().winLayer
	});
	AppLoader.loaders.push(loader);
}

AppLoader.getLoaderByName = function(_name)
{
	var target = null;
	if(AppLoader.instances!=undefined)
	{
		var len = AppLoader.instances.length;
		for(var i=0;i<len;i++)
		{
			var loader = AppLoader.instances[i];
			if(loader.config.name == _name)
			{
				target = loader;
				break;
			}
		}
	}
	return target;
}