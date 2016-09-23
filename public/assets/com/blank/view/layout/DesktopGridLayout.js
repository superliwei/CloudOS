/**
 * 桌面图标布局
 */

CloudOS.DesktopGridLayout = (function(){
	DesktopGridLayout.prototype = new CloudOS.GridLayout();
	function DesktopGridLayout()
	{
		CloudOS.GridLayout.call(this);
		this.view.css("overflow","hidden");
	}

	DesktopGridLayout.prototype.resize = function(_w,_h)
	{
		CloudOS.GridLayout.prototype.resize.call(this,_w,_h);
		this.layout();
	}
	
	DesktopGridLayout.prototype.createItems = function(_ds)
	{
	    var len = _ds.length;
	    for(var i=0;i<len;i++)
	    {
	        var option = _ds[i];
	        var item = this.newItem(option);
        	this.items.push(item);
	    }
	}
	
	DesktopGridLayout.prototype.newItem = function(option)
	{
		var item = new CloudOS.FileItem(option);
        item.view.appendTo(this.itemLayer);
        return item;
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
	
	return DesktopGridLayout;
})();