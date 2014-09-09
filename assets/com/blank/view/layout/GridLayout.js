/**
 * 格子布局
 */

var GridLayout = function()
{
	this.view = this.view.clone();

	this.itemLayer = this.view.clone();
	this.itemLayer.appendTo(this.view);

	this.view.css("overflow","auto");

	this.items = [];

	SelectManager.regist(this);
}

GridLayout.prototype = new BasicLayout();

GridLayout.prototype.loadStart = function()
{
    this.clear();
    var len = Math.ceil(Math.random()*50);
	for(i=0;i<len;i++)
	{
		var item = new FileItem({color:"#000",textShadow:"1px 1px 2px #fff",target:"_parent"});
		item.view.appendTo(this.itemLayer);
		this.items.push(item);
	}
	this.layout();
}

GridLayout.prototype.clear = function()
{
    while(this.items.length>0)
    {
        var item = this.items[0];
        item.destroy();
        this.items.shift();
    }
}

GridLayout.prototype.layout = function()
{
	var mw = this.view.width();
	var mh = this.view.height();
	var w = 120;
	var h = 120;
	var col = mw/w;
	col = Math.floor(col);
	var len = this.items.length;
	for(i=0;i<len;i++)
	{
		var item = this.items[i];
		var tx = (i-Math.floor(i/col)*col)*w;
		var ty = Math.floor(i/col)*h;
		item.view.css("left",tx+(w-item.view.width())*0.5);
		item.view.css("top",ty+(h-item.view.height())*0.5);
	}
}

GridLayout.prototype.destroy = function()
{
    this.clear();
    this.view.remove();
}