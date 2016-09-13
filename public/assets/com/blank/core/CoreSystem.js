/**
 * 核心
 */
CloudOS.CoreSystem = (function(){
	var CoreSystem = {};
	CoreSystem.start = function()
	{
		CloudOS.User.currentUser = new CloudOS.User("heroblank@hotmail.com","123456");
		CloudOS.User.currentUser.read(function(){
	        //读取桌面文件列表
	        var file = new CloudOS.File({url:"/desktop"});
	        file.dispatcher.bind(CloudOS.File.COMPLETE,function(e,_data){
	            self.fileList = _data;
	            file.destroy();
	            
				CSSPlugin.defaultTransformPerspective = 1000;
				CoreSystem.desktop = new CloudOS.Desktop();
				CoreSystem.desktop.view.appendTo('body');
	        });
	        file.getDirectoryListing();
	    });
	}
	return CoreSystem;
})();