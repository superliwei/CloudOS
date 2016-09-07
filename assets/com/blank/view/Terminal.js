/**
 * 终端
 */

CloudOS.Terminal = (function(){
	function Terminal(_option)
	{
		this.option = _option;
		this.option.win = this.option.win == undefined?{}:this.option.win;
		if(this.option.win.icon == undefined)
		{
			this.option.win.icon = "assets/images/icons/16/Terminal.png";
		}
	
		if(this.option.win.title == undefined)
		{
			this.option.win.title = "终端";
		}
		this.win = new CloudOS.Win(this.option.win);
		this.win.content.css("overflow","hidden");
		this.win.content.css("background-color","#000");
	
		this.ct = $("<div>",{style:"overflow:auto"});
		this.ct.appendTo(this.win.content);
	
		this.inputCt = $("<div>",{style:"background-color:#222;height:30px;position:absolute;"});
		this.inputCt.appendTo(this.win.content);
		$("<div style='font-size:18px;font-weight:bolid;color:#fff;line-height:30px;margin-left:5px;'>&gt;</div>").appendTo(this.inputCt);
		this.inputField = $("<input>",{
			type:"text",
			style:"border:none;margin-left:18px;font-size:16px;position:absolute;background:none;color:#fff;"
		});
		this.inputField.appendTo(this.inputCt);
	
		this.status = new CloudOS.AppStatus(this,Terminal);
	
		var self = this;
		this.win.view.bind(CloudOS.Win.RESIZE,function(){
			self.resizeHandler();
		});
	
	}
	
	Terminal.prototype.open = function()
	{
		CloudOS.PopUpManager.popup(this);
	}
	
	Terminal.prototype.resizeHandler = function()
	{
		this.ct.width(this.win.content.width());
		this.ct.height(this.win.content.height()-this.inputCt.outerHeight());
		this.inputCt.width(this.win.content.width());
		this.inputField.width(this.win.content.width() - 22);
		this.inputField.css("top",(this.inputCt.height() - this.inputField.outerHeight())*0.5);
	}
	
	Terminal.run = function(cmd)
	{
		var arr = cmd.split(" ");
		Terminal[arr[0]](cmd);
	}
	
	Terminal.newTerminal = function()
	{
		var terminal = new Terminal({
			win:{
				parentView:CloudOS.CoreSystem.desktop.winLayer
			}
		});
		terminal.open();
	}
	
	/**
	 * cmd
	 */
	
	Terminal.open = function(cmd)
	{
		var arr = cmd.split(" ");
		switch(arr[1])
		{
			case "Terminal"://打开终端
				Terminal.newTerminal();
				break;
			case "SettingPannel":
				CloudOS.SettingPannel.newSettingPannel();
				break;
			default:
				CloudOS.Folder.run(cmd);
		}
	}
	
	Terminal.load = function(cmd)
	{
		var arr = cmd.split(" ");
		CloudOS.AppLoader.newLoader(arr[1]);
	}
	
	return Terminal;
	
})();