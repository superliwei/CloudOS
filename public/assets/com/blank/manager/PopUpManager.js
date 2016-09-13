/**
 * 弹出窗体管理员
 */

CloudOS.PopUpManager = (function(){

	var PopUpManager = {};
	
	PopUpManager.currentPop = null;
	PopUpManager.pops = [];
	PopUpManager.popup = function(Ipop)
	{
		Ipop.win.open();
		PopUpManager.move(Ipop);
		PopUpManager.pops.unshift(Ipop);
		PopUpManager.selectPop(Ipop);
	}
	
	PopUpManager.selectPop = function(Ipop)
	{
		var tz = 0;
		if(PopUpManager.currentPop!=null)
		{
			PopUpManager.currentPop.win.active(false);
			var _z = PopUpManager.currentPop.win.view.css("z-index");
			_z = _z=="auto"?0:Number(_z);
			tz = _z+1;
		}
		Ipop.win.active(true);
		Ipop.win.view.css("z-index",tz);
		PopUpManager.currentPop = Ipop;
		PopUpManager.change();
	}
	
	PopUpManager.removePop = function(Ipop)
	{
		var idx = PopUpManager.pops.indexOf(Ipop);
		PopUpManager.pops.splice(idx,1);
	
		if(PopUpManager.pops.length>0)
		{
			PopUpManager.selectPop(PopUpManager.pops[0]);
		}
		else
		{
			PopUpManager.currentPop = null;
		}
		Ipop.win.view.remove();
		PopUpManager.change();
	}
	
	PopUpManager.move = function(Ipop)
	{
		var tx = 10;
		var ty = 36;
		if(PopUpManager.currentPop!=null)
		{
			tx = PopUpManager.currentPop.win.x + 30;
			ty = PopUpManager.currentPop.win.y + 30;
		}
		Ipop.win.moveTo(tx,ty);
	}
	PopUpManager.CHANGE = "PopUpManager_change";
	PopUpManager.change = function()
	{
		CloudOS.BroadcastCenter.dispatchEvent(new CloudOS.Event(PopUpManager.CHANGE));
	}
	
	return PopUpManager;
	
})();