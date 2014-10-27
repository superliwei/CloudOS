/**
 * 详细布局
 */

var DetailLayout = function()
{
    this.view = this.view.clone();

    this.itemLayer = this.view.clone();
    this.itemLayer.appendTo(this.view);

    this.view.css("overflow","auto");

    this.loading = new SimulateLoading();
    this.loading.view.appendTo(this.view);

    this.items = [];

    SelectManager.regist(this);
}

DetailLayout.prototype = new BasicLayout();

DetailLayout.prototype.loadStart = function(_url)
{
    GridLayout.prototype.loadStart.call(this,_url);
}

DetailLayout.prototype.createItems = function(_ds)
{
    var len = _ds.length;
    for(var i=0;i<len;i++)
    {
        var option = _ds[i];
        option.color = "#000";
        option.textShadow = "1px 1px 2px #fff";
        option.target = "_parent";
        var item = new FileItemTypeC(option);
        item.view.appendTo(this.itemLayer);
        this.items.push(item);
    }
}

DetailLayout.prototype.resize = function(_w,_h)
{
    GridLayout.prototype.resize.call(this,_w,_h);
}

DetailLayout.prototype.layout = function()
{
    var len = this.items.length;
    for(i=0;i<len;i++)
    {
        var item = this.items[i];
        item.view.get(0).style.left = null;
        item.view.get(0).style.top = null;
        item.view.get(0).style.position = null;
    }
}

DetailLayout.prototype.clear = function()
{
    GridLayout.prototype.clear.call(this);
}

DetailLayout.prototype.destroy = function()
{
    this.clear();
    this.view.remove();
}