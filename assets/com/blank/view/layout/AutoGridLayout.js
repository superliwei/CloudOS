var AutoGridLayout = function()
{
	this.view = this.view.clone();

	this.itemLayer = this.view.clone();
	this.itemLayer.appendTo(this.view);

	this.view.css("overflow","auto");

    this.loading = new SimulateLoading({color:"#999999"});
    this.loading.view.appendTo(this.view);

	this.items = [];
}

AutoGridLayout.prototype = new BasicLayout();

AutoGridLayout.prototype.resize = function(_w,_h)
{
	GridLayout.prototype.resize.call(this,_w,_h);
	this.layout();
}

AutoGridLayout.prototype.loadStart = function(_url)
{
    GridLayout.prototype.loadStart.call(this,_url);
}

AutoGridLayout.prototype.createItems = function(_ds)
{
    var len = _ds.length;
    for(var i=0;i<len;i++)
    {
        var option = _ds[i];
        option.mode = "B";
        option.flag = "TipBox";
        var item = new FileItem(option);
        item.view.appendTo(this.itemLayer);
        this.items.push(item);
    }
}

AutoGridLayout.prototype.clear = function()
{
    GridLayout.prototype.clear.call(this);
}

AutoGridLayout.prototype.layout = function()
{
	GridLayout.prototype.layout.call(this);
}