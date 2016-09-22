CloudOS.PathUtil = {};
CloudOS.PathUtil.getFileName = function(path)
{
	var fileName;
	var arr = path.split("/");
	if(arr.length > 0)
	{
		var fullName = arr[arr.length - 1];
		fileName = fullName.split(".")[0];
	}
	return fileName;
}