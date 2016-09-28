/**
 * 格子布局
 */

CloudOS.GridLayout = (function(){

	GridLayout.prototype = new CloudOS.BasicLayout();
	function GridLayout()
	{
		CloudOS.BasicLayout.call(this);

		this.itemLayer = $("<div>",{style:"position:absolute;width:100%;height:100%;overflow:auto;"});
		this.itemLayer.appendTo(this.view);
	
		this.initLoading();
	
		this.items = [];
		this.initSelection();
	}

	GridLayout.prototype.initLoading = function()
	{
		this.loading = new CloudOS.SimulateLoading();
	    this.loading.view.appendTo(this.view);
	}

	GridLayout.prototype.initSelection = function()
	{
		CloudOS.SelectManager.regist(this);
	}

	GridLayout.prototype.loadStart = function(_url,onComplete)
	{
	    this.clear();
	    var self = this;
	    this.loading.show();
	    var file = new CloudOS.File({url:_url});
	    if(this.loader != undefined)this.loader.abort();
	    this.loader = file.getDirectoryListing(function(err,_data){
	    	self.loading.hide();
	    	if(err)
	    	{
		        trace(err);
		        return;
	    	}
	    	self.createItems(_data);
	        self.layout();
	        if(onComplete!=undefined)onComplete(_data);
	    });
	}
	
	GridLayout.prototype.createItems = function(_ds)
	{
	    var len = _ds.length;
	    for(var i=0;i<len;i++)
	    {
	        var option = _ds[i];
	        var item = this.newItem(option);
        	this.items.push(item);
	    }
	}
	
	GridLayout.prototype.newItem = function(option)
	{
		option.color = "#000";
        option.textShadow = "1px 1px 2px #fff";
        option.target = "_parent";
        var item = new CloudOS.FileItem(option);
        item.view.appendTo(this.itemLayer);
        return item;
	}
	
	GridLayout.prototype.resize = function(_w,_h)
	{
	    CloudOS.BasicLayout.prototype.resize.call(this,_w,_h);
	    this.loading.resize(_w);
	}
	
	GridLayout.prototype.clear = function()
	{
	    while(this.items.length>0)
	    {
	        var item = this.items[0];
	        removeSelectedItem(item);
	        item.destroy();
	        this.items.shift();
	    }
	    
	    function removeSelectedItem(item)
	    {
	    	var idx = CloudOS.FileItem.selectedItems.indexOf(item);
	    	CloudOS.FileItem.selectedItems.splice(idx,1);
	    }
	}
	
	GridLayout.prototype.layout = function()
	{
		var mw = this.view.width();
		var mh = this.view.height();
		var w = 120;
		var h = 120;
		var col = mw/w;
		col = Math.floor(col);
		var len = this.items.length;
		for(i=0;i<len;i++)
		{
			var item = this.items[i];
			var tx = (i-Math.floor(i/col)*col)*w;
			var ty = Math.floor(i/col)*h;
			item.view.css("left",tx+(w-item.view.width())*0.5);
			item.view.css("top",ty+(h-item.view.height())*0.5);
		}
	}

	GridLayout.prototype.getArrangeAble = function()
	{
		return this.items.length > 0;
	}
	
	GridLayout.prototype.destroy = function()
	{
	    this.clear();
	    this.view.remove();
	}
	
	return GridLayout;
})();