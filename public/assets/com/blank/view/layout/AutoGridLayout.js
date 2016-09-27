/**
 * 自动格子布局(用于TipBox显示文件夹)
 */
CloudOS.AutoGridLayout = (function(){

	AutoGridLayout.prototype = new CloudOS.GridLayout();
	
	function AutoGridLayout()
	{
		CloudOS.GridLayout.call(this);
	}

	AutoGridLayout.prototype.initLoading = function()
	{
		this.loading = new CloudOS.SimulateLoading({color:"#999999"});
	    this.loading.view.appendTo(this.view);
	}

	AutoGridLayout.prototype.initSelection = function(){}
	
	AutoGridLayout.prototype.resize = function(_w,_h)
	{
		CloudOS.GridLayout.prototype.resize.call(this,_w,_h);
		this.layout();
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
	
	return AutoGridLayout;

})();