CloudOS.Request = (function(){
	var Request = {};
	Request.login = "api/user/login";
	
	Request.User = {};
	Request.User.config = "api/user/config";
	
	Request.File = {};
	Request.File.getDirectoryListing = "api/fs/readdir";
	Request.File.createDirectory = "api/fs/createdir";
	Request.File.rename = "api/fs/rename";
	Request.File.moveFiles = "api/fs/movefiles";
	Request.File.copy = "api/fs/copy";
	
	return Request;
})();