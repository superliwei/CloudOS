/**
 * 桌面图标布局
 */

var DesktopGridLayout = function()
{
	this.view = this.view.clone();

	this.itemLayer = this.view.clone();
	this.itemLayer.appendTo(this.view);

	this.items = [];

	SelectManager.regist(this);
}

DesktopGridLayout.prototype = new BasicLayout();

DesktopGridLayout.prototype.resize = function(_w,_h)
{
	var lastSize = {width:this.view.width(),height:this.view.height()};
	BasicLayout.prototype.resize.call(this,_w,_h);
	this.fixLayout(lastSize);
}

DesktopGridLayout.prototype.setSource = function(_source)
{
    GridLayout.prototype.clear.call(this);
    var len = _source.length;
    for(i=0;i<len;i++)
    {
        var item = new FileItem(_source[i]);
        item.view.appendTo(this.itemLayer);
        this.items.push(item);
    }
    this.layout();
}

DesktopGridLayout.prototype.layout = function()
{
	var mw = this.view.width();
	var mh = this.view.height();
	var w = 120;
	var h = 120;
	var row = mh/h;
	row = Math.floor(row);
	var len = this.items.length;
	for(i=0;i<len;i++)
	{
		var item = this.items[i];
		var tx = Math.floor(i/row)*w;
		var ty = (i-Math.floor(i/row)*row)*h;
		tx = mw - tx -w;
		item.view.css("left",tx+(w-item.view.width())*0.5);
		item.view.css("top",ty+(h-item.view.height())*0.5);
	}
}

DesktopGridLayout.prototype.fixLayout = function(lastSize)
{
	var disX = this.view.width() - lastSize.width;
	var len = this.items.length;
	for(i=0;i<len;i++)
	{
		var item = this.items[i];
		var tx = item.view.position().left + disX;
		item.view.css("left",tx);
	}
}