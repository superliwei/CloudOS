var Settings = {};

//存储用户数据的根目录,位于当前项目下的space文件夹
Settings.rootDir = process.cwd()+"/space";

Settings.getUserRoot = function(username)
{
	return this.rootDir + "/" + username + "/root";
}

module.exports = Settings;
