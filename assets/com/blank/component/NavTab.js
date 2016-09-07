CloudOS.NavTab = (function(){
	function NavTab(_option)
	{
		this.option = _option;
		this.init();
	}
	
	NavTab.CHANGE = "NavTab_change";
	
	NavTab.prototype.init = function()
	{
	    this.selectedIdx = this.option.selectedIdx!=undefined?this.option.selectedIdx:-1;
	    this.tabs = [];
	
		this.view = $("<div>",{style:"position:absolute"});
	
		for(i=0,len=this.option.tabs.length;i<len;i++)
		{
			var bt = new CloudOS.Button(this.option.tabs[i]);
			bt.view.appendTo(this.view);
			bt.moveTo(bt.view.width()*i,0);
			if(i == 0)
			{
				bt.view.css("border-top-right-radius",0);
				bt.view.css("border-bottom-right-radius",0);
			}
			else if(i == len-1)
			{
				bt.view.css("border-top-left-radius",0);
				bt.view.css("border-bottom-left-radius",0);
			}
			else
			{
				bt.view.css("border-radius",0);
			}
	        this.tabs.push(bt);
	        bt.view.bind(CloudOS.Button.CLICK,[this,bt],this.btClickHandler);
		}
	    this.selectIdx(this.selectedIdx);
	}
	
	NavTab.prototype.btClickHandler = function(e)
	{
	    var self = e.data[0];
	    var bt = e.data[1];
	    var idx = self.tabs.indexOf(bt);
	    self.selectIdx(idx);
	    self.view.trigger(NavTab.CHANGE);
	}
	
	NavTab.prototype.moveTo = function(_x,_y)
	{
		this.view.css("left",_x);
		this.view.css("top",_y);
	}
	
	NavTab.prototype.selectIdx = function(_idx)
	{
	    var tab;
	    if(this.selectedIdx>-1)
	    {
	        tab = this.tabs[this.selectedIdx];
	        tab.enable(true);
	    }
	    if(_idx>-1)
	    {
	        tab = this.tabs[_idx];
	        tab.enable(false);
	    }
	    this.selectedIdx = _idx;
	}
	return NavTab;
})();