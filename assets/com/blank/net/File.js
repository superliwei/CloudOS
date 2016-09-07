/**
 * 文件操作类
 */

CloudOS.File = (function(){
	
	function File(_option)
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
	    $.getJSON(CloudOS.Request.File.getDirectoryListing,{url:this.url},function(_data){
	        self.dispatcher.trigger(File.COMPLETE,[_data]);
	    });
	}
	
	File.prototype.openWithDefaultApplication = function()
	{
	    CloudOS.FileManager.open(this);
	}
	
	File.prototype.destroy = function()
	{
	    delete this.dispatcher;
	}
	
	return File;
	
})();