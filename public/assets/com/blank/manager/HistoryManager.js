/**
 * 历史记录管理器
 */

CloudOS.HistoryManager = (function(){
	function HistoryManager(_option)
	{
	    this.option = _option;
	    this.index = -1;
	    this.list = [];
	
	    if(this.option.controlBts != undefined)
	    {
	        this.leftBt = this.option.controlBts[0];
	        this.rightBt = this.option.controlBts[1];
	        this.initControlBts();
	    }
	}
	
	HistoryManager.prototype.initControlBts = function()
	{
	    this.leftBt.view.bind(CloudOS.Button.CLICK,this,this.preHandler);
	    this.rightBt.view.bind(CloudOS.Button.CLICK,this,this.nextHandler);
	    this.updateControlBts();
	}
	
	HistoryManager.prototype.updateControlBts = function()
	{
	    var len = this.list.length;
	    if(len<2)
	    {
	        this.leftBt.enable(false);
	        this.rightBt.enable(false);
	    }
	    else
	    {
	        if(this.index == 0)
	        {
	            this.leftBt.enable(false);
	            this.rightBt.enable(true);
	        }
	        else if(this.index == len-1)
	        {
	            this.leftBt.enable(true);
	            this.rightBt.enable(false);
	        }
	        else
	        {
	            this.leftBt.enable(true);
	            this.rightBt.enable(true);
	        }
	    }
	}
	
	HistoryManager.prototype.preHandler = function(e)
	{
	    var self = e.data;
	    self.pre();
	}
	
	HistoryManager.prototype.nextHandler = function(e)
	{
	    var self = e.data;
	    self.next();
	}
	
	HistoryManager.prototype.pre = function()
	{
	    var _idx = this.index - 1;
	    if(_idx>-1)
	    {
	        this.go(_idx);
	    }
	}
	
	HistoryManager.prototype.next = function()
	{
	    var _idx = this.index + 1;
	    var len = this.list.length;
	    if(_idx<len)
	    {
	        this.go(_idx);
	    }
	}
	
	HistoryManager.prototype.go = function(_idx)
	{
	    this.option.handler(this.list[_idx]);
	    this.index = _idx;
	    this.updateControlBts();
	}
	
	HistoryManager.prototype.add = function(_option)
	{
		if(this.index < this.list.length-1)
		{
			this.list.splice(this.index+1,this.list.length-this.index-1);
		}
		this.list.push(_option);
		this.go(this.list.length-1);
	}

	HistoryManager.prototype.refresh = function()
	{
		this.go(this.index);
	}
	
	return HistoryManager;
})();