CloudOS.PathUtil = {};
CloudOS.PathUtil.getFileName = function(path)
{
	var fullName = this.getFullFileName(path);
	var fileName = fullName.split(".")[0];
	return fileName;
}

CloudOS.PathUtil.getFullFileName = function(path)
{
	var arr = path.split("/");
	var fullName = arr[arr.length - 1];
	return fullName;
}

CloudOS.PathUtil.getNewFileUrl = function(file,newName)
{
	var idx = file.url.lastIndexOf(file.name);
	var frontStr = file.url.substring(0,idx);
	var endStr = file.url.substring(idx+file.name.length,file.url.length);
	var newUrl = frontStr + newName + endStr;
	return newUrl;
}