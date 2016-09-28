/**
 * 文件的复制剪切粘贴
 */
CloudOS.Folder.ClipBoard = (function(){
	var ClipBoard = {};
	ClipBoard.targets = [];
	ClipBoard.targetsFromFolder = null;
	
	ClipBoard.setCopy = function(targets,from)
	{
		this.action = "copy";
		ClipBoard.targets = targets;
		ClipBoard.targetsFromFolder = from;
	}
	
	ClipBoard.setCut = function(targets,from)
	{
		this.action = "cut";
		ClipBoard.targets = targets;
		ClipBoard.targetsFromFolder = from;
		$.each(targets, function() {
			this.view.css("opacity",0.5);
		});
	}
	
	ClipBoard.pasteTo = function(folder)
	{
		switch(this.action)
		{
			case "copy":
			var copyTargets = this.targets.concat();
			var urls = getUrlsOfTargets(copyTargets);
			var dir = folder.option.url;
			CloudOS.File.copyFiles(urls,dir,function(err){
				if(err)
				{
					trace(err);
					return;
				}
				folder.refresh();
			});
			break;
			case "cut":
			if(this.targetsFromFolder === folder || this.targetsFromFolder.option.url == folder.option.url)
			{
				$.each(this.targets, function() {
					this.view.css("opacity","");
				});
			}
			else
			{
				var moveTargets = this.targets.concat();
				var fromFolder = this.targetsFromFolder;
				var urls = getUrlsOfTargets(moveTargets);
				var dir = folder.option.url;
				CloudOS.File.moveFiles(urls,dir,function(err){
					if(err)
					{
						trace(err);
						$.each(moveTargets, function() {
							this.view.css("opacity","");
						});
						return;
					}
					fromFolder.refresh();
					folder.refresh();
				});
			}
			this.clear();
			break;
		}
		
		function getUrlsOfTargets(targets)
		{
			var urls = [];
			$.each(targets,function(){
				urls.push(this.file.url);
			});
			return urls;
		}
	}
	
	ClipBoard.clear = function()
	{
		this.targets = [];
		this.targetsFromFolder = null;
		
	}
	
	return ClipBoard;
})();
