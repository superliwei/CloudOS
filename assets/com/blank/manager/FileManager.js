/**
 * 文件管理器
 */

var FileManager = {};

FileManager.open = function(file)
{
    if(file.type == "directory")
    {
        openFolder();
    }
    else
    {
        openFile();
    }

    function openFolder()
    {
        //1.判断是不是已经打开，如果打开了，然后判断是不是最小化了
        var _a = isFolderOpen();
        if(_a.result)
        {
            var _b = isFolderMinimize();
            if(_b.result)
            {
                QuickBar.ImageItem.prototype.clickHandler.call(_b.item.icon);
            }
            else
            {
                PopUpManager.selectPop(_a.pop);
            }
        }
        else
        {
            var cmd = "open "+file.url;
            if(file.option.target != undefined)
            {
                cmd += " "+file.option.target;
            }
            Terminal.run(cmd);
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
        var len = PopUpManager.pops.length;
        for(var i=0;i<len;i++)
        {
            var pop = PopUpManager.pops[i];
            if(pop instanceof Folder && pop.option.url == file.url)
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
        var items = QuickBar.instance().getSortableItems(1);
        var len = items.length;
        for(var i=0;i<len;i++)
        {
            var item = items[i];
            var app = item.icon.data.app;
            if(app!=undefined && app instanceof Folder && app.option.url == file.url)
            {
                action.result = true;
                action.item = item;
                break;
            }
        }
        return action;
    }
}