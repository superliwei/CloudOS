/**
 * 模拟进度条
 */
CloudOS.SimulateLoading = (function(){
	function SimulateLoading(_option)
	{
	    this.option = _option || {};
	    this.view = $("<div>",{style:"position:absolute;display:none"});
	    this.bg = $("<div>",{style:"position:absolute;height:3px;"});
	    this.bg.appendTo(this.view);
	    this.bar = $("<div>",{style:"position:absolute;height:3px;"});
	    this.bar.appendTo(this.view);
	    this.bar.css("background-color",this.option.color || "#0000ff");
	}
	
	SimulateLoading.prototype.resize = function(_w)
	{
	    this.bg.width(_w);
	    if(this.value!=undefined)
	    {
	        this.bar.width(this.value*this.bg.width());
	    }
	}
	
	SimulateLoading.prototype.show = function()
	{
	    var self = this;
	    this.view.fadeIn("fast");
	    var obj = {value:0};
	    this.tl = TweenLite.to(obj,10,{value:0.5,onUpdate:function(){
	        self.bar.width(obj.value*self.bg.width());
	    },onComplete:function(){
	        self.tl = TweenLite.to(obj,10,{value:0.8,onUpdate:function(){
	            self.bar.width(obj.value*self.bg.width());
	        },onComplete:function(){
	            self.tl = TweenLite.to(obj,10,{value:0.9,onUpdate:function(){
	                self.bar.width(obj.value*self.bg.width());
	            },onComplete:function(){
	                self.value = obj.value;
	                self.tl = null;
	            }});
	        }});
	    }});
	}
	
	SimulateLoading.prototype.hide = function()
	{
	    var self = this;
	    if(this.tl != null)
	    {
	        this.tl.kill();
	        this.tl = null;
	    }
	    delete this.value;
	    TweenLite.to(this.bar,0.5,{width:this.bg.width(),alpha:0,onComplete:function(){
	        self.view.hide();
	    }});
	}
	
	return SimulateLoading;
})();