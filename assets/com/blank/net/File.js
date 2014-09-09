/**
 * 文件操作类
 */

var File = function(path)
{
	//本地磁盘上文件的创建日期
	this.creationDate;
	this.creator;
	//成功调用 load() 方法之后代表所加载文件中的数据
	this.data;
	//表示是否已（从 Internet）下载参考文件或目录
	this.downloaded;
	//表示引用的文件或目录是否存在
	this.exists;
	//文件扩展名
	this.extension;
	//包含为文件定义的图标
	this.icon;
	//表示是否为对目录的引用
	this.isDirectory;
	//表示引用的文件或目录是否为“隐藏”。如果引用的文件或目录是隐藏的，则该值为 true；否则为 false
	this.isHidden;
	//表示引用的目录是否为包
	this.isPackage;
	//表示引用是否为符号链接
	this.isSymbolicLink;
	//[只读] 主机操作系统使用的行结束字符序列
	this.lineEnding;
	//本地磁盘上文件的上一次修改日期
	this.modificationDate;
	//本地磁盘上的文件的名称
	this.name;
	//采用主机操作系统表示形式的完整路径
	this.nativePath;
	//包含此 File 对象引用的文件或目录的目录
	this.parent;
	//本地磁盘上文件的大小（以字节为单位）
	this.size;
	//可用于在此 File 位置使用的空间，以字节为单位
	this.spaceAvaliable;
	//主机操作系统使用的默认编码
	this.systemCharset;
	//文件类型
	this.type;
	//此文件路径的 URL
	this.url;
}

File.CANCEL = "File_cancel";
File.COMPLETE = "File_complete";
File.DIRECTORY_LISTING = "File_directoryListing";
File.IO_ERROR = "File_ioError";
File.SECURITY_ERROR = "File_securityError";
File.SELECT = "File_select";
File.SELECT_MULTIPLE = "File_selectMultiple";

//显示一个文件浏览对话框，让用户选择要上载的文件
File.prototype.browse = function(typeFilter)
{
	
}

//显示一个目录选择器对话框，用户可从中选择一个目录。
File.prototype.browseForDirectory = function(title)
{
	
}

//显示“打开文件”对话框，用户可从中选择要打开的文件。
File.prototype.browseForOpen = function(title,typeFilter)
{
	
}

//显示“打开文件”对话框，用户可从中选择一个或多个要打开的文件
File.prototype.browseForOpenMultiple = function(title,typeFilter)
{
	
}

//显示“保存文件”对话框，用户可从中选择一个文件目标。
File.prototype.browseForSave = function(title)
{
	
}

//[覆盖] 取消任何未处理的异步操作。
File.prototype.cancel = function()
{
	
}

//规范化 File 路径。
File.prototype.canonicalize = function()
{
	
}

//返回此 File 对象的副本。
File.prototype.clone = function()
{
	
}

//将由此 File 对象指定的位置的文件或目录复制到由 newLocation 参数指定的位置。
File.prototype.copyTo = function(newLocation,overwrite)
{
	
}

//开始将此 File 对象指定的位置中的文件或目录复制到 destination 参数指定的位置。
File.prototype.copyToAsync = function(newLocation,overwrite)
{
	
}

//创建指定的目录和任何所需的父目录。
File.prototype.createDirectory = function()
{
	
}

//[静态] 返回对新临时目录的引用。
File.createTempDirectory = function()
{
	
}

//[静态] 返回对新临时文件的引用。
File.createTempFile = function()
{
	
}

//删除目录。
File.prototype.deleteDirectory = function(deleteDirectoryContents)
{
	
}

//异步删除目录。
File.prototype.deleteDirectoryAsync = function(deleteDirectoryContents)
{
	
}

//删除文件。
File.prototype.deleteFile = function()
{
	
}

//异步删除文件。
File.prototype.deleteFileAsync = function()
{
	
}

//返回与此 File 对象表示的目录中的文件和目录对应的 File 对象的数组。
File.prototype.getDirectoryListing = function()
{
	
}

//异步检索与此 File 对象表示的目录内容对应的 File 对象的数组。
File.prototype.getDirectoryListingAsync = function()
{
	
}

//查找两个 File 路径之间的相对路径。
File.prototype.getRelativePath = function(ref,useDotDot)
{
	
}

//[静态] 返回 File 对象的数组，列出文件系统根目录。
File.getRootDirectories = function()
{
	
}

//开始加载用户选择的本地文件。
File.prototype.load = function()
{
	
}

//将此 File 对象指定的位置中的文件或目录移动到 destination 参数指定的位置。
File.prototype.moveTo = function(newLocation,overwrite)
{
	
}

//开始将此 File 对象指定的位置中的文件或目录移动到 newLocation 参数指定的位置。
File.prototype.moveToAsync = function(newLocation,overwrite)
{
	
}

//将文件或目录移动到垃圾桶。
File.prototype.moveToTrash = function()
{
	
}

//将文件或目录异步移动到垃圾桶。
File.prototype.moveToTrashAsync = function()
{
	
}

//打开操作系统注册的应用程序中的文件来打开此类型的文件。
File.prototype.openWithDefaultApplication = function()
{
	
}

//基于 path 参数（一个字符串）创建一个其路径相对于此 File 对象路径的新 File 对象。
File.resolvePath = function(path)
{
	
}

//打开一个对话框，允许用户将文件保存到本地文件系统。
File.prototype.save = function(data,defaultFileName)
{
	
}

//用户的桌面目录
File.desktopDirectory = function()
{
	
}

//安装应用程序的目录
File.applicationDirectory = function()
{
	
}

//用户目录
File.userDirectory = function()
{
	
}