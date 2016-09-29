/**
 * 弹出窗体管理员
 */

CloudOS.PopUpManager = (function(){

	var PopUpManager = {
		currentPop : null,
		pops : [],
		zIdx : 0,
		CHANGE : "PopUpManager_change",
		lastSelectedPop : null
	};
	
	PopUpManager.popup = function(Ipop)
	{
		this.move(Ipop);
		Ipop.win.open();
		this.pops.unshift(Ipop);
		this.selectPop(Ipop);
	}
	
	PopUpManager.selectPop = function(Ipop)
	{
		if(this.currentPop === Ipop)return;
		if(this.currentPop!=null)this.currentPop.win.active(false);
		if(Ipop != null)
		{
			Ipop.win.active(true);
			this.zIdx++;
			Ipop.win.view.css("z-index",this.zIdx);
			this.lastSelectedPop = Ipop;
		}
		this.currentPop = Ipop;
		this.change();
	}
	
	PopUpManager.removePop = function(Ipop)
	{
		var idx = this.pops.indexOf(Ipop);
		this.pops.splice(idx,1);

		Ipop.win.view.remove();

		if(this.lastSelectedPop === Ipop)this.lastSelectedPop = null;
	
		if(this.pops.length>0)
		{
			this.selectPop(this.pops[0]);
		}
		else
		{
			this.zIdx = 0;
			this.selectPop(null);
		}
	}
	
	PopUpManager.move = function(Ipop)
	{
		var tx = 10;
		var ty = 36;
		if(this.lastSelectedPop!=null)
		{
			tx = this.lastSelectedPop.win.x + 30;
			ty = this.lastSelectedPop.win.y + 30;
		}
		Ipop.win.moveTo(tx,ty);
	}
	
	PopUpManager.change = function()
	{
		CloudOS.BroadcastCenter.dispatchEvent(new CloudOS.Event(this.CHANGE));
	}
	
	return PopUpManager;
	
})();