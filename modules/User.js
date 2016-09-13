/**
 * 用户
 */
const fs = require('fs');
const Error = require('./Error');
const Settings = require('./Settings');

function User(){}

User.login = function(name,password,onComplete)
{
	onComplete(undefined,{token:"LKSDFJSLKDJFKLSJDLKFJSDLKJF"});
}

User.isTokenOk = function(user,onComplete)
{
	onComplete();
}

User.getConfig = function(name,token,onComplete)
{
	User.isTokenOk({name:name,token:token},function(err){
		if(err)return onComplete(Error.TokenError);
		
		var configUrl = Settings.rootDir + "/" + name + "/config.json";
		fs.readFile(configUrl,'utf-8',function(err,data){
			if(err)onComplete(Error.ReadFileError);
			onComplete(undefined,JSON.parse(data));
		});
	});
}

module.exports = User;