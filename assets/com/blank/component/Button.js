var Button =  function(_option)
{
	this.option = _option;
	this.icon = null;
	this.init();
}

Button.prototype.init = function()
{
	this.view = $("<div>",{
		"style":"position:absolute"
	});

	if(this.option.icon!=undefined)
	{
		this.icon = $("<img>",{
			"src":this.option.icon,
			"style":"position:absolute"
		});
		this.icon.appendTo(this.view);
	}
	if(this.option.width!=undefined)
	{
		this.view.width(this.option.width);
	}
	if(this.option.height!=undefined)
	{
		this.view.height(this.option.height);
	}
	this.view.css("background-color","#ffffff");
	this.view.css("border-radius",3);
}

Button.prototype.moveTo = function(_x,_y)
{
	this.view.css("left",_x);
	this.view.css("top",_y);
}