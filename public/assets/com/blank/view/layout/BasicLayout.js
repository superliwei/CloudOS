/**
 * 基本图标布局
 */

CloudOS.BasicLayout = (function(){
	function BasicLayout()
	{
		this.view = $("<div>",{
			style:"position:absolute"
		});
	}
	
	BasicLayout.prototype.moveTo = function(_x,_y)
	{
		this.view.css("left",_x);
		this.view.css("top",_y);
	}
	
	BasicLayout.prototype.resize = function(_w,_h)
	{
		this.view.width(_w);
		this.view.height(_h);
	}
	
	/**
	 * 使图标居中.
	 */
	BasicLayout.prototype.makeItemCenter = function(item)
	{
		var tx = (this.view.width() - item.view.width())*0.5;
		var ty = (this.view.height() - item.view.height())*0.5;
		item.view.css("position","absolute");
		item.view.css("left",tx);
		item.view.css("top",ty);
	}
	
	return BasicLayout;
	
})();