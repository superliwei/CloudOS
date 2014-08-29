var ComboBox = function(_option)
{
	this.option = _option;
	this.init();
}

ComboBox.prototype.init = function()
{
	this.view = $("<div>",{
		"style":"position:absolute"
	});

	this.bt = new Button(this.option);
	this.bt.view.appendTo(this.view);
	this.bt.view.css("border-top-right-radius",0);
	this.bt.view.css("border-bottom-right-radius",0);
	this.arrowBt = new Button({
		"icon":"assets/images/arrowD.png",
		"width":14,
		"height":24
	});
	this.arrowBt.view.css("border-top-left-radius",0);
	this.arrowBt.view.css("border-bottom-left-radius",0);
	this.arrowBt.view.appendTo(this.view);
	this.arrowBt.moveTo(this.bt.view.width(),0);
	
	this.width = this.bt.view.width()+this.arrowBt.view.width();
	this.height = this.bt.view.height();
}

ComboBox.prototype.moveTo = function(_x,_y)
{
	this.view.css("left",_x);
	this.view.css("top",_y);
}