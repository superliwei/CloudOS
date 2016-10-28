/**
 * 文件系统
 */
const fs = require('fs-extra');
const Error = require('./Error');
const Settings = require('./Settings');
const User = require('./User');

function FS(){}

FS.readdir = function(user,url,onComplete)
{
	var userRoot = Settings.getUserRoot(user.name);
	var inputPath = url;
	if(inputPath.charAt(inputPath.length-1) != "/")inputPath+="/"; //补全/
	var path = userRoot + inputPath;
	fs.readdir(path,function(err,files){
		if(err)return onComplete(Error.ReadDirError);
		var infos = [];
		files.length > 0 ? readInfo(0) : onComplete(undefined,infos);
		function readInfo(idx)
		{
			if(idx == files.length)return onComplete(undefined,infos);
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
	});
}

FS.createdir = function(user,url,onComplete)
{
	var userRoot = Settings.getUserRoot(user.name);
	var dirUrl = userRoot + url;
	fs.exists(dirUrl,function(exists){
		if(exists)
		{
			return onComplete(Error.FileExists);
		}
		else
		{
			fs.mkdir(dirUrl,function(err){
				if(err)return onComplete(Error.MkdirError);
				onComplete();
			});
		}
	});
}

FS.rename = function(user,oldUrl,newUrl,onComplete)
{
	var userRoot = Settings.getUserRoot(user.name);
	var oldPath = userRoot + oldUrl;
	var newPath = userRoot + newUrl;
	fs.rename(oldPath,newPath,function(err){
		if(err)return onComplete(Error.RenameError);
		onComplete();
	});
}

FS.moveFiles = function(user,oldUrls,newUrls,onComplete)
{
	var userRoot = Settings.getUserRoot(user.name);
	var len = oldUrls.length;
	moveFile(0);
	function moveFile(idx)
	{
		if(idx == len)
		{
			return onComplete();
		}
		var oldPath = userRoot + oldUrls[idx];
		var newPath = userRoot + newUrls[idx];
		fs.move(oldPath,newPath,function(err){
			if(err)return onComplete(Error.MoveError);
			moveFile(idx+1);
		});
	}
}

FS.copy = function(user,oldUrls,newUrls,onComplete)
{
	var userRoot = Settings.getUserRoot(user.name);
	var len = oldUrls.length;
	copyFile(0);
	function copyFile(idx)
	{
		if(idx == len)
		{
			return onComplete();
		}
		var oldPath = userRoot + oldUrls[idx];
		var newPath = userRoot + newUrls[idx];
		fs.copy(oldPath,newPath,function(err){
			if(err)return onComplete(Error.CopyError);
			copyFile(idx+1);
		});
	}
}

module.exports = FS;