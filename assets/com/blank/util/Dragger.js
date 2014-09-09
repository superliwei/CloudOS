/**
 * 拖动工具
 */

var Dragger = {};

Dragger.dps = null;
Dragger.target = null;
Dragger.startDrag = function(target,e)
{
	Dragger.dps = [];
	target = (target instanceof Array)?target:[target];
	for(var i=0,len=target.length;i<len;i++)
	{
		var dp = {};
		dp.x = e.clientX;
		dp.y = e.clientY;
		dp.offset = target[i].offset();
		Dragger.dps.push(dp);
	}
	Dragger.target = target;
	$(document).bind("mousemove",Dragger.mousemoveHandler);
}

Dragger.mousemoveHandler = function(e)
{
	for(var i=0,len=Dragger.target.length;i<len;i++)
	{
		var tx = Dragger.dps[i].offset.left + e.clientX - Dragger.dps[i].x;
		var ty = Dragger.dps[i].offset.top + e.clientY - Dragger.dps[i].y;
		Dragger.target[i].offset({left:tx,top:ty});
	}
}

Dragger.stopDrag = function()
{
	$(document).unbind("mousemove",Dragger.mousemoveHandler);
	Dragger.dps = null;
	Dragger.target = null;
}