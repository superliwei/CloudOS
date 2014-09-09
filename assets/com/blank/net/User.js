/**
 * 用户
 */

var User = function()
{

}

User.login = function(_email,_password,_onSuccess,_onFail)
{
	setTimeout(function(){
		//_onFail();
		_onSuccess();
	},2000);
}