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

User.getConfig = function(name,token,onComplete)
{
	var configUrl = Settings.rootDir + "/" + name + "/config.json";
	fs.readFile(configUrl,'utf-8',function(err,data){
		if(err)onComplete(Error.READFILE);
		onComplete(undefined,JSON.parse(data));
	});
}

module.exports = User;