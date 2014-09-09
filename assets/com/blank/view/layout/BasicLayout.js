/**
 * 基本图标布局
 */

var BasicLayout = function()
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