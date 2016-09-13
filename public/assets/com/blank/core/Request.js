CloudOS.Request = (function(){
	var Request = {};
	Request.login = "api/user/login";
	
	Request.User = {};
	Request.User.config = "api/user/config";
	
	Request.File = {};
	Request.File.getDirectoryListing = "api/fs/readdir";
	
	return Request;
})();