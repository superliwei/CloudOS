var NavTab = function(_option)
{
	this.option = _option;
	this.init();
}

NavTab.prototype.init = function()
{
	this.view = $("<div>",{"style":"position:absolute"});

	for(i=0,len=this.option.tabs.length;i<len;i++)
	{
		var bt = new Button(this.option.tabs[i]);
		bt.view.appendTo(this.view);
		bt.moveTo(bt.view.width()*i,0);
		if(i == 0)
		{
			bt.view.css("border-top-right-radius",0);
			bt.view.css("border-bottom-right-radius",0);
		}
		else if(i == len-1)
		{
			bt.view.css("border-top-left-radius",0);
			bt.view.css("border-bottom-left-radius",0);
		}
		else
		{
			bt.view.css("border-radius",0);
		}
	}
}

NavTab.prototype.moveTo = function(_x,_y)
{
	this.view.css("left",_x);
	this.view.css("top",_y);
}