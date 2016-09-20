/**
 * 文件管理器
 */
CloudOS.FileManager = (function(){
	var FileManager = {};

	FileManager.open = function(file)
	{
		if(file.type == "directory")
	    {
	        if(file.option.target == "_parent")
	        {
	        	openFolder(file.url,"_parent");
	        }
	        else
	        {
	        	openFolderFromDesktop();
	        }
	    }
	    else
	    {
	        openFile();
	    }
	
	    function openFolderFromDesktop()
	    {
	        //1.判断是不是已经打开，如果打开了，然后判断是不是最小化了
	        var _a = isFolderOpen();
	        if(_a.result)
	        {
	            var _b = isFolderMinimize();
	            if(_b.result)
	            {
	                CloudOS.QuickBar.ImageItem.prototype.clickHandler.call(_b.item.icon);
	            }
	            else
	            {
	                CloudOS.PopUpManager.selectPop(_a.pop);
	            }
	        }
	        else
	        {
	            openFolder(file.url);
	        }
	    }

	    function openFolder(url,target)
	    {
	    	if(target == "_parent")
	    	{
	    		CloudOS.Folder.currentOpen(url);
	    	}
	    	else
	    	{
	    		CloudOS.Folder.newOpen(url);
	    	}
	    }
	
	    function openFile()
	    {
	        alert("还没处理.");
	    }
	
	    function isFolderOpen()
	    {
	        var action = {
	            result:false
	        };
	        var len = CloudOS.PopUpManager.pops.length;
	        for(var i=0;i<len;i++)
	        {
	            var pop = CloudOS.PopUpManager.pops[i];
	            if(pop instanceof CloudOS.Folder && pop.option.url == file.url)
	            {
	            	action.result = true;
	                action.pop = pop;
	                break;
	            }
	        }
	        return action;
	    }
	
	    function isFolderMinimize()
	    {
	        var action = {
	            result:false
	        };
	        var items = CloudOS.QuickBar.instance().getSortableItems(1);
	        var len = items.length;
	        for(var i=0;i<len;i++)
	        {
	            var item = items[i];
	            var app = item.icon.data.app;
	            if(app!=undefined && app instanceof CloudOS.Folder && app.option.url == file.url)
	            {
	                action.result = true;
	                action.item = item;
	                break;
	            }
	        }
	        return action;
	    }
	}
	
	return FileManager;
})();