/**
 * 选择框
 */

CloudOS.SelectManager = (function(){

	var SelectManager = {};
	
	SelectManager._selectBox = null;
	SelectManager.selectBox = function()
	{
		if(SelectManager._selectBox == null)
		{
			SelectManager._selectBox = $("<div>",{'class':"CloudOS SelectBox"});
		}
		return SelectManager._selectBox;
	}
	SelectManager.regist = function(_layout)
	{
		var layout = _layout;
		var box = SelectManager.selectBox();
		var dp = {};
		var moved = false;
	
		var container = layout.itemLayer;
		container.mousedown(function(e){
			if(e.target !== container.get(0))return;//过滤文件图标拖动
			moved = false;
			dp.x = e.clientX;
			dp.y = e.clientY;
	        dp.scrollLeft = container.scrollLeft();
	        dp.scrollTop = container.scrollTop();
			$(document).bind("mousemove",mousemoveHandler);
			$(document).bind("mouseup",mouseupHandler);
			CloudOS.FileItem.selectItems([]);
		});
	
		function mousemoveHandler(e)
		{
			if(!moved)
			{
				box.appendTo(container);
				box.offset({left:dp.x,top:dp.y});
				moved = true;
			}
			var tw = e.clientX - dp.x + container.scrollLeft() - dp.scrollLeft;
			var th = e.clientY - dp.y + container.scrollTop() - dp.scrollTop;
			if(tw>=0)
			{
				box.width(tw);
			}
			else
			{
				tw = Math.abs(tw);
				box.width(tw);
				box.offset({left: e.clientX});
			}
			if(th>=0)
			{
				box.height(th);
			}
			else
			{
				th = Math.abs(th);
				box.height(th);
	            box.offset({top: e.clientY});
			}
			selectItem();
		}
	
		function mouseupHandler(e)
		{
			$(document).unbind("mousemove",mousemoveHandler);
			$(document).unbind("mouseup",mouseupHandler);
			box.width(0);
			box.height(0);
			box.remove();
		}
	
		function selectItem()
		{
			var items = layout.items;
			for(var i=0,len=items.length;i<len;i++)
			{
	            var item = items[i];
	            var rect0 = item.getSelectRect();
	            var rect1 = new CloudOS.Rect(box.offset().left,box.offset().top,box.width(),box.height());
	            var idx = CloudOS.FileItem.selectedItems.indexOf(item);
	            var crossed = CloudOS.Rect.testRectCross(rect0,rect1);
	            if(crossed)
	            {
	                if(idx == -1)
	                {
	                    item.select(true);
	                    CloudOS.FileItem.selectedItems.push(item);
	                }
	            }
	            else
	            {
	                if(idx>-1)
	                {
	                    item.select(false);
	                    CloudOS.FileItem.selectedItems.splice(idx,1);
	                }
	            }
			}
		}
	}
	
	return SelectManager;
	
})();