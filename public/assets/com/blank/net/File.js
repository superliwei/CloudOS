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

	File.prototype.rename = function(newName,onComplete)
	{
		var newUrl = CloudOS.PathUtil.getNewFileUrl(this,newName);

		var vars = {
	    	oldurl:this.url,
	    	newurl:newUrl,
	    	user:{
	    		name:CloudOS.User.currentUser.name,
	    		token:CloudOS.User.currentUser.token
	    	}
	    };

	    var self = this;

	    return new CloudOS.Loader(CloudOS.Request.File.rename,vars,function(err){
	    	if(err) return onComplete(err);
	    	self.url = newUrl;
	    	self.name = newName;
	    	onComplete();
	    });
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

	/**
	 * 删除多个文件或文件夹
	 */
	File.moveToTrash = function(urls,onComplete)
	{
		this.moveFiles(urls,"/trash",onComplete);
	}
	
	/**
	 * 移动文件到其它的文件夹
	 */
	File.moveFiles = function(urls,dir,onComplete)
	{
		var vars = {
	    	oldurls:urls,
	    	newurls:getNewUrls(),
	    	user:{
	    		name:CloudOS.User.currentUser.name,
	    		token:CloudOS.User.currentUser.token
	    	}
	  	};
	  	return new CloudOS.Loader(CloudOS.Request.File.moveFiles,vars,onComplete);

	  	function getNewUrls()
	  	{
	  		var arr = [];
	  		$.each(urls,function(){
	  			arr.push(dir + "/" + CloudOS.PathUtil.getFullFileName(this));
	  		});
	  		return arr;
	  	}
	}
	
	/**
	 * 复制文件
	 */
	File.copyFiles = function(urls,dir,onComplete)
	{
		var vars = {
	    	oldurls:urls,
	    	newurls:getNewUrls(),
	    	user:{
	    		name:CloudOS.User.currentUser.name,
	    		token:CloudOS.User.currentUser.token
	    	}
	  	};
	  	return new CloudOS.Loader(CloudOS.Request.File.copy,vars,onComplete);
	  	
	  	function getNewUrls()
	  	{
	  		var arr = [];
	  		$.each(urls,function(){
	  			arr.push(dir + "/" + CloudOS.PathUtil.getFullFileName(this));
	  		});
	  		return arr;
	  	}
	}
	
	return File;
	
})();