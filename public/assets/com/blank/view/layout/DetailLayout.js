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
	        var item = this.newItem(option);
        	this.items.push(item);
	    }
	}
	
	DetailLayout.prototype.newItem = function(option)
	{
		option.color = "#000";
        option.textShadow = "1px 1px 2px #fff";
        option.target = "_parent";
        var item = new CloudOS.FileItemTypeC(option);
        item.view.appendTo(this.itemLayer);
        return item;
	}
	
	DetailLayout.prototype.layout = function()
	{
	    //donothing...
	}

	DetailLayout.prototype.getArrangeAble = function()
	{
		return false;
	}
	
	return DetailLayout;

})();