/**
 * 详细布局
 */

CloudOS.DetailLayout = (function(){
	DetailLayout.prototype = new CloudOS.GridLayout();
	function DetailLayout()
	{
		CloudOS.GridLayout.call(this);
	}
	
	DetailLayout.prototype.createItems = function(_ds)
	{
	    var len = _ds.length;
	    for(var i=0;i<len;i++)
	    {
	        var option = _ds[i];
	        option.color = "#000";
	        option.textShadow = "1px 1px 2px #fff";
	        option.target = "_parent";
	        var item = new CloudOS.FileItemTypeC(option);
	        item.view.appendTo(this.itemLayer);
	        this.items.push(item);
	    }
	}
	
	DetailLayout.prototype.layout = function()
	{
	    var len = this.items.length;
	    for(i=0;i<len;i++)
	    {
	        var item = this.items[i];
	        item.view.get(0).style.left = null;
	        item.view.get(0).style.top = null;
	        item.view.get(0).style.position = null;
	    }
	}
	
	return DetailLayout;

})();