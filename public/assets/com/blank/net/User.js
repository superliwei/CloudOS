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
	    $.getJSON(CloudOS.Request.User.config,{name:this.name,token:this.token},function(_data){
	        if(_data.status == "success")
	        {
	        	self.config = _data.result;
	        	_onComplete();
	        }
	    });
	}
	
	User.currentUser = null;
	
	User.login = function(_name,_password,_onSuccess,_onFail)
	{
	    $.getJSON(CloudOS.Request.login,{name:_name,password:_password},function(_data){
	    	if(_data.status == "success")
	        {
	            User.currentUser = new User(_name,_data.result.token);
	            _onSuccess();
	        }
	    });
	}
	
	return User;
	
})();