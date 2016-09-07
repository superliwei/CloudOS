/**
 * 桌面图标布局
 */

CloudOS.DesktopGridLayout = (function(){
	function DesktopGridLayout()
	{
		this.view = this.view.clone();
	
		this.itemLayer = this.view.clone();
		this.itemLayer.appendTo(this.view);
		
		this.loading = new CloudOS.SimulateLoading();
	    this.loading.view.appendTo(this.view);
	
		this.items = [];
	
		CloudOS.SelectManager.regist(this);
	}
	
	DesktopGridLayout.prototype = new CloudOS.BasicLayout();
	
	DesktopGridLayout.prototype.resize = function(_w,_h)
	{
		var lastSize = {width:this.view.width(),height:this.view.height()};
		CloudOS.BasicLayout.prototype.resize.call(this,_w,_h);
		this.fixLayout(lastSize);
	}
	
	DesktopGridLayout.prototype.loadStart = function(_url)
	{
	    CloudOS.GridLayout.prototype.clear.call(this);
	    var self = this;
	    var file = new CloudOS.File({url:_url});
	    this.loading.show();
	    file.dispatcher.bind(CloudOS.File.COMPLETE,function(e,_data){
	        self.createItems(_data);
	        self.layout();
	        file.destroy();
	        self.loading.hide();
	    });
	    file.getDirectoryListing();
	}
	
	DesktopGridLayout.prototype.createItems = function(_ds)
	{
	    var len = _ds.length;
	    for(var i=0;i<len;i++)
	    {
	        var item = new CloudOS.FileItem(_ds[i]);
	        item.view.appendTo(this.itemLayer);
	        this.items.push(item);
	    }
	}
	
	DesktopGridLayout.prototype.layout = function()
	{
		var mw = this.view.width();
		var mh = this.view.height();
		var w = 120;
		var h = 120;
		var row = mh/h;
		row = Math.floor(row);
		var len = this.items.length;
		for(i=0;i<len;i++)
		{
			var item = this.items[i];
			var tx = Math.floor(i/row)*w;
			var ty = (i-Math.floor(i/row)*row)*h;
			tx = mw - tx -w;
			item.view.css("left",tx+(w-item.view.width())*0.5);
			item.view.css("top",ty+(h-item.view.height())*0.5);
		}
	}
	
	DesktopGridLayout.prototype.fixLayout = function(lastSize)
	{
		var disX = this.view.width() - lastSize.width;
		var len = this.items.length;
		for(i=0;i<len;i++)
		{
			var item = this.items[i];
			var tx = item.view.position().left + disX;
			item.view.css("left",tx);
		}
	}
	
	return DesktopGridLayout;
})();