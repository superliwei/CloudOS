var AutoGridLayout = function()
{
	this.view = this.view.clone();

	this.itemLayer = this.view.clone();
	this.itemLayer.appendTo(this.view);

	this.view.css("overflow","auto");

	this.items = [];
}

AutoGridLayout.prototype = new BasicLayout();

AutoGridLayout.prototype.resize = function(_w,_h)
{
	BasicLayout.prototype.resize.call(this,_w,_h);
	this.layout();
}

AutoGridLayout.prototype.loadStart = function()
{
	for(i=0;i<30;i++)
	{
		var item = new FileItem({"mode":"B","flag":"TipBox"});
		item.view.appendTo(this.itemLayer);
		this.items.push(item);
	}
	this.layout();
}

AutoGridLayout.prototype.layout = function()
{
	GridLayout.prototype.layout.call(this);
}