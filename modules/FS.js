/**
 * 文件系统
 */
const fs = require('fs');
const Error = require('./Error');
const Settings = require('./Settings');
const User = require('./User');

function FS(){}

FS.readdir = function(user,url,onComplete)
{
	User.isTokenOk(user,function(err){
		if(err)return onComplete(Error.TokenError);
		var userRoot = Settings.rootDir + "/" + user.name + "/root";
		var inputPath = url;
		if(inputPath.charAt(inputPath.length-1) != "/")inputPath+="/"; //补全/
		var path = userRoot + inputPath;
		fs.readdir(path,function(err,files){
			if(err)return onComplete(Error.ReadDirError);
			var infos = [];
			if(files.length > 0)
			{
				readInfo(0);
			}
			else
			{
				onComplete(undefined,infos);
			}
			function readInfo(idx)
			{
				if(idx == files.length)
				{
					allComplete();
					return;
				}
				var fileName = files[idx];
				var filePath = path+fileName;
				fs.stat(filePath,function(err,stats){
					if(!err) //出现权限读写错误时跳过
					{
						var info = {
							name : fileName,
							type : getFileType(fileName,stats),
							url : inputPath+fileName
						};
						infos.push(info);
					}
					readInfo(idx+1);
				});
			}
			
			function getFileType(fileName,stats)
			{
				if(stats.isDirectory())
				{
					return "directory";
				}
				else if(stats.isFile())
				{
					var arr = fileName.split(".");
					var len = arr.length;
					if(len > 1)
					{
						var _type = arr[len-1];
						return _type.toLowerCase();
					}
					else
					{
						return "unknown";
					}
				}
				else
				{
					return "unknown";
				}
			}
			
			function allComplete()
			{
				onComplete(undefined,infos);
			}
		});
	});
}

module.exports = FS;