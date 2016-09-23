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
	}
	
	File.prototype.getDirectoryListing = function(onComplete)
	{
	    var vars = {
	    	url:this.url,
	    	user:{
	    		name:CloudOS.User.currentUser.name,
	    		token:CloudOS.User.currentUser.token
	    	}
	    };
	    return new CloudOS.Loader(CloudOS.Request.File.getDirectoryListing,vars,onComplete);
	}
	
	File.prototype.openWithDefaultApplication = function()
	{
	    CloudOS.FileManager.open(this);
	}
	
	File.createDirectory = function(url,onComplete)
	{
		var vars = {
	    	url:url,
	    	user:{
	    		name:CloudOS.User.currentUser.name,
	    		token:CloudOS.User.currentUser.token
	    	}
	  	};
		return new CloudOS.Loader(CloudOS.Request.File.createDirectory,vars,onComplete);
	}
	
	return File;
	
})();