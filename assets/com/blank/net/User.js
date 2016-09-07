/**
 * 用户
 */

CloudOS.User = (function(){

	function User(_email,_token)
	{
	    this.email = _email;
	    this.token = _token;
	}
	
	User.prototype.read = function(_onComplete)
	{
	    var self = this;
	    $.getJSON(CloudOS.Request.User.config,{email:this.email,token:this.token},function(_data){
	        self.config = _data;
	        _onComplete();
	    });
	}
	
	User.currentUser = null;
	
	User.login = function(_email,_password,_onSuccess,_onFail)
	{
	    $.getJSON(CloudOS.Request.login,{email:_email,password:_password},function(_data){
	        if(_data.token!=undefined)
	        {
	            User.currentUser = new User(_email,_data.token);
	            _onSuccess();
	        }
	    });
	}
	
	return User;
	
})();