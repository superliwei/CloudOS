/**
 * 文件操作类
 */

var File = function(_option)
{
    this.option = _option;
    this.url = this.option.url;
    this.name = this.option.name;
    this.type = this.option.type;
    this.dispatcher = $("<div>");
}

File.COMPLETE = "File_complete";

File.prototype.getDirectoryListing = function()
{
    var self = this;
    $.getJSON(Request.File.getDirectoryListing,{url:this.url},function(_data){
        self.dispatcher.trigger(File.COMPLETE,[_data]);
    });
}

File.prototype.openWithDefaultApplication = function()
{
    if(this.type == "directory")
    {
        var cmd = "open "+this.url;
        if(this.option.target != undefined)
        {
            cmd += " "+this.option.target;
        }
        Terminal.run(cmd);
    }
    else
    {
        alert("暂时无法打开.");
    }
}

File.prototype.destroy = function()
{
    delete this.dispatcher;
}