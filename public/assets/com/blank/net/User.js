/**
 * 用户
 */

CloudOS.User = (function(){

	function User(_name,_token)
	{
	    this.name = _name;
	    this.token = _token;
	}
	
	User.prototype.read = function(_onComplete)
	{
		var self = this;
	    return new CloudOS.Loader(CloudOS.Request.User.config,{name:this.name,token:this.token},function(err,_data){
	    	if(err) return _onComplete(err);
	    	self.config = _data;
	    	_onComplete();
	    });
	}
	
	User.currentUser = null;
	
	User.login = function(_name,_password,_onComplete)
	{
		return new CloudOS.Loader(CloudOS.Request.login,{name:_name,password:_password},function(err,_data){
	   		if(err) return _onComplete(err);
	   		User.currentUser = new User(_name,_data.token);
	   		_onComplete();
	   	});
	}
	
	return User;
	
})();