/**
 * 详细布局
 */

var DetailLayout = function()
{
    this.view = this.view.clone();

    this.itemLayer = this.view.clone();
    this.itemLayer.appendTo(this.view);

    this.view.css("overflow","auto");

    this.items = [];

    SelectManager.regist(this);
}

DetailLayout.prototype = new BasicLayout();

DetailLayout.prototype.loadStart = function()
{
    this.clear();
    var len = Math.ceil(Math.random()*50);
    for(i=0;i<len;i++)
    {
        var item = new FileItemTypeC({color:"#000",textShadow:"1px 1px 2px #fff",target:"_parent"});
        item.view.appendTo(this.itemLayer);
        this.items.push(item);
    }
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
    while(this.items.length>0)
    {
        var item = this.items[0];
        item.destroy();
        this.items.shift();
    }
}

DetailLayout.prototype.destroy = function()
{
    this.clear();
    this.view.remove();
}