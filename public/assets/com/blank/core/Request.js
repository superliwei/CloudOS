CloudOS.Request = (function(){
	var Request = {};
	Request.login = "api/user/login";
	
	Request.User = {};
	Request.User.config = "api/user/config";
	
	Request.File = {};
	Request.File.getDirectoryListing = "api/fs/readdir";
	Request.File.createDirectory = "api/fs/createdir";
	
	return Request;
})();