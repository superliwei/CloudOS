CloudOS.AutoGridLayout = (function(){
	
	function AutoGridLayout()
	{
		this.view = this.view.clone();
	
		this.itemLayer = this.view.clone();
		this.itemLayer.appendTo(this.view);
	
		this.view.css("overflow","auto");
	
	    this.loading = new CloudOS.SimulateLoading({color:"#999999"});
	    this.loading.view.appendTo(this.view);
	
		this.items = [];
	}
	
	AutoGridLayout.prototype = new CloudOS.BasicLayout();
	
	AutoGridLayout.prototype.resize = function(_w,_h)
	{
		CloudOS.GridLayout.prototype.resize.call(this,_w,_h);
		this.layout();
	}
	
	AutoGridLayout.prototype.loadStart = function(_url)
	{
	    CloudOS.GridLayout.prototype.loadStart.call(this,_url);
	}
	
	AutoGridLayout.prototype.createItems = function(_ds)
	{
	    var len = _ds.length;
	    for(var i=0;i<len;i++)
	    {
	        var option = _ds[i];
	        option.mode = "B";
	        option.flag = "TipBox";
	        var item = new CloudOS.FileItem(option);
	        item.view.appendTo(this.itemLayer);
	        this.items.push(item);
	    }
	}
	
	AutoGridLayout.prototype.clear = function()
	{
	    CloudOS.GridLayout.prototype.clear.call(this);
	}
	
	AutoGridLayout.prototype.layout = function()
	{
		CloudOS.GridLayout.prototype.layout.call(this);
	}
	
	return AutoGridLayout;

})();