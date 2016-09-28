/**
 * 文件夹
 */
CloudOS.Folder = (function(){
	
	Folder.menuManager = new CloudOS.FolderMenuManager();
	
	function Folder(_option)
	{
		this.menuManager = Folder.menuManager;
		this.option = _option;
		this.init();
	}
	
	Folder.prototype.init = function()
	{
	    var self = this;
		this.option.win = this.option.win || {};
		this.option.win.icon = this.option.win.icon || "assets/images/icons/16/folder.png";
		this.option.win.barHeight = 55;
	
		this.win = new CloudOS.Win(this.option.win);
	
		this.toolBar = $("<div>",{style:"position:absolute;overflow:hidden;"});
		this.toolBar.css("left",this.win.thick);
		this.toolBar.css("top",30);
		this.toolBar.width("calc(100% - "+this.win.thick*2+"px)");
		this.toolBar.height(24);
		
		this.leftBt = new CloudOS.Button({
			icon:"assets/images/arrowL.png",
			width:24,
			height:24
		});
	
		this.rightBt = new CloudOS.Button({
			icon:"assets/images/arrowR.png",
			width:24,
			height:24
		});
		this.rightBt.moveTo(26,0);
	
		this.searchBar = new CloudOS.SearchBar();
	
		this.viewTab = new CloudOS.NavTab({
			tabs:[
				{icon:"assets/images/gridView.png",width:24,height:24},
				{icon:"assets/images/listView.png",width:24,height:24}
			],
	        selectedIdx:0
		});
		this.viewTab.moveTo(56,0);
	    this.viewTab.view.bind(CloudOS.NavTab.CHANGE,function(){
	    	self.switchLayout(self.viewTab.selectedIdx);
	    });
	
		this.settingCb = new CloudOS.ComboBox({
			icon:"assets/images/setting.png",
			width:24,
			height:24,
	        menu:[
	        	{label:"刷新"},
	        	{type:"separator"},
	            {label:"新建文件夹"},
	            {label:"移到废纸篓"},
	            {label:"重命名"},
	            {type:"separator"},
	            {label:"整理"}
	        ]
		});
		this.settingCb.moveTo(110,0);

		this.settingCb.view.on(CloudOS.ComboBox.OPEN,function(e){
			$.each(self.settingCb.option.menu,function(){
				switch(this.label)
				{
					case "移到废纸篓":
					var selectedItems = self.getSelectedItems();
					this.enabled = selectedItems.length > 0;
					break;
					case "重命名":
					var selectedItems = self.getSelectedItems();
					this.enabled = selectedItems.length == 1 && !selectedItems[0].isRenaming;
					break;
					case "整理":
					this.enabled = self.layout.getArrangeAble();
					break;
				}
			});
		});
		
		this.settingCb.view.on(CloudOS.Menu.ITEM_CLICK,function(e,item){
			switch(item.data.label)
			{
				case "刷新":
					self.historyManager.refresh();
				break;
				case "整理":
					self.arrange();
				break;
				case "移到废纸篓":
					self.moveSelectedItemToTrash();
				break;
				case "重命名":
					var selectedItem = self.getSelectedItems()[0];
					selectedItem.enterToEditMode();
				break;
				case "新建文件夹":
					self.newFolder();
				break;
			}
		});
	
		this.layout = new CloudOS.GridLayout();
		this.layout.view.appendTo(this.win.content);
	
		this.settingCb.view.appendTo(this.toolBar);
		this.viewTab.view.appendTo(this.toolBar);
		this.leftBt.view.appendTo(this.toolBar);
		this.rightBt.view.appendTo(this.toolBar);
		this.searchBar.view.appendTo(this.win.view);
		this.toolBar.appendTo(this.win.view);
	
		this.status = new CloudOS.AppStatus(this,Folder);
		
		this.menu = Folder.menu;
	    this.historyManager = new CloudOS.HistoryManager({
	        controlBts:[this.leftBt,this.rightBt],
	        handler:function(_url){
	        	self.option.url = _url;
	        	self.win.setTitle(_url);
	            self.layout.loadStart(_url);
	        }
	    });
	   
		this.win.view.bind(CloudOS.Win.ADD,function(){
			self.load(self.option.url);
		});
		this.win.view.bind(CloudOS.Win.RESIZE,function(){
			self.resizeHandler();
		});
	}
	
	Folder.prototype.load = function(_url)
	{
	    this.historyManager.add(_url);
	}
	
	Folder.prototype.open = function()
	{
	    CloudOS.PopUpManager.popup(this);
	}
	
	Folder.prototype.resizeHandler = function()
	{
	    this.searchBar.moveTo(this.win.width-this.searchBar.view.width() - this.win.thick,30);
	    this.layout.resize(this.win.content.width(),this.win.content.height());
	}
	
	/**
	 * 切换视图
	 */
	Folder.prototype.switchLayout = function(_idx)
	{
	    if(this.viewTab.selectedIdx!=_idx)
	    {
	        this.viewTab.selectIdx(_idx);
	    }
	    var layouts = [CloudOS.GridLayout,CloudOS.DetailLayout];
	    this.layout.destroy();
	    this.layout = new layouts[_idx]();
	    this.layout.view.appendTo(this.win.content);
	    this.resizeHandler();
	    this.historyManager.refresh();
	}
	
	/**
	 * 整理
	 */
	Folder.prototype.arrange = function()
	{
	    this.layout.layout();
	}

	/**
	 * 新建文件夹
	 */
	Folder.prototype.newFolder = function()
	{
		var layout = this.layout;
		var newFolderName = this.getNewFolderName();
		var newFolderUrl = this.option.url + "/" + newFolderName;
		var newFolderItem = layout.newItem({
			name : newFolderName,
			type : "directory",
			url : newFolderUrl
		});
		layout.makeItemCenter(newFolderItem);
		newFolderItem.view.addClass("disabled");
		CloudOS.File.createDirectory(newFolderUrl,function(err){
			if(err)
			{
				trace(err);
				newFolderItem.destroy();
				return;
			}
			layout.items.push(newFolderItem);
			newFolderItem.view.removeClass("disabled");
		});
	}
	
	Folder.prototype.getNewFolderName = function()
	{
		var items = this.layout.items;
		var len = items.length;
		var idx = 0;
		checkFolderName();
		return getNewFolderNameByIdx(idx);
		
		function checkFolderName()
		{
			for(var i=0;i<len;i++)
			{
				var item = items[i];
				if(item.option.name == getNewFolderNameByIdx(idx))
				{
					idx++;
					checkFolderName();
					break;
				}
			}
		}
		
		function getNewFolderNameByIdx(_idx)
		{
			return "新建文件夹"+(_idx == 0 ? "" : "("+_idx+")");
		}
	}

	Folder.prototype.getSelectedItems = function()
	{
		var selectedItems = [];
		var globalSelectedItems = CloudOS.FileItem.selectedItems;
		var itemsInFolder = this.layout.items;
		if(globalSelectedItems.length > 0 && itemsInFolder.length > 0)
		{
			$.each(itemsInFolder,function(){
				if(globalSelectedItems.indexOf(this) > -1)selectedItems.push(this);
			});
		}
		return selectedItems;
	}

	Folder.prototype.moveSelectedItemToTrash = function()
	{
		var self = this;
		var selectedItems = this.getSelectedItems();
		CloudOS.FileItem.selectItems([]);
		$.each(selectedItems,function(){
			removeItemFromLayoutItems(this);
			this.view.addClass("disabled");
		});
		var fileUrls = getUrlsOfSelectedItems();
		CloudOS.File.moveToTrash(fileUrls,function(err){
			if(err)
			{
				trace(err);
				$.each(selectedItems,function(){
					self.layout.items.push(this);
					this.view.removeClass("disabled");
				});
				return;
			}
			destroySelectedItems();
		});

		function removeItemFromLayoutItems(item)
		{
			var idx = self.layout.items.indexOf(item);
			self.layout.items.splice(idx,1);
		}

		function getUrlsOfSelectedItems()
		{
			var urls = [];
			$.each(selectedItems,function(){
				urls.push(this.file.url);
			});
			return urls;
		}

		function destroySelectedItems()
		{
			while(selectedItems.length > 0)
			{
				var item = selectedItems[0];
				item.destroy();
				selectedItems.shift();
			}
		}
	}

	Folder.run = function(cmd)
	{
	    var arr = cmd.split(" ");
	    if(arr.length<3)
	    {
	        Folder.newOpen(arr[1]);
	    }
	    else
	    {
	        if(arr[2] == "_parent" && CloudOS.PopUpManager.currentPop instanceof Folder)
	        {
	            CloudOS.PopUpManager.currentPop.load(arr[1]);
	        }
	    }
	}

	Folder.currentOpen = function(_url)
	{
		var pop = CloudOS.PopUpManager.currentPop;
		if(pop instanceof Folder)pop.load(_url);
	}
	
	Folder.newOpen = function(_url)
	{
		var folder = new Folder({
	        url:_url,
			win:{
				parentView:CloudOS.CoreSystem.desktop.winLayer
			}
		});
		folder.open();
	}
	
	return Folder;
})();