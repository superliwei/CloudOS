/**
 * 选择框
 */

var SelectManager = {};

SelectManager._selectBox = null;
SelectManager.selectBox = function()
{
	if(SelectManager._selectBox == null)
	{
		SelectManager._selectBox = $("<div>",{
			style:"position:absolute;border:solid 1px;"
		});
		SelectManager._selectBox.css("background-image","url(assets/images/blueAlphaBg0.png)");
	}
	return SelectManager._selectBox;
}
SelectManager.regist = function(_layout)
{
	var layout = _layout;
	var box = SelectManager.selectBox();
	var dp = {};

	layout.view.mousedown(function(e){
		dp.x = e.clientX;
		dp.y = e.clientY;
        dp.scrollLeft = layout.view.scrollLeft();
        dp.scrollTop = layout.view.scrollTop();
		box.appendTo(layout.view);
		box.offset({left:dp.x,top:dp.y});
		$(document).bind("mousemove",mousemoveHandler);
		$(document).bind("mouseup",mouseupHandler);
		FileItem.selectItems([]);
	});

	function mousemoveHandler(e)
	{
		var tw = e.clientX - dp.x + layout.view.scrollLeft() - dp.scrollLeft;
		var th = e.clientY - dp.y + layout.view.scrollTop() - dp.scrollTop;
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
            var rect1 = new Rect(box.offset().left,box.offset().top,box.width(),box.height());
            var idx = FileItem.selectedItems.indexOf(item);
            var crossed = Rect.testRectCross(rect0,rect1);
            if(crossed)
            {
                if(idx == -1)
                {
                    item.select(true);
                    FileItem.selectedItems.push(item);
                }
            }
            else
            {
                if(idx>-1)
                {
                    item.select(false);
                    FileItem.selectedItems.splice(idx,1);
                }
            }
		}
	}
}