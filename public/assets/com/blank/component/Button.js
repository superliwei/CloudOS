CloudOS.Button = (function(){
	function Button(_option)
	{
		this.option = _option;
		this.icon = null;
		this.init();
	}

	Button.prototype.init = function()
	{
		this.view = $("<div>",{'class':"CloudOS Button"});
		this.label = $("<div>",{'class':"label"});
	   
	    if(this.option.text!=undefined)
	    {
	    	this.label.addClass("CloudOS-Button-label");
	        this.label.appendTo("body");
	        this.label.text(this.option.text);
	        this.view.width(this.label.outerWidth());
	        this.label.removeClass("CloudOS-Button-label");
	        this.label.appendTo(this.view);
	    }
		if(this.option.icon!=undefined)
		{
	        this.setIcon(this.option.icon);
		}
		if(this.option.width!=undefined)
		{
			this.view.width(this.option.width);
		}
		if(this.option.height!=undefined)
		{
			this.view.height(this.option.height);
	        this.label.css("line-height",this.option.height+"px");
		}
	    
	    this.enable(this.option.enabled || true);
	}
	
	Button.prototype.setIcon = function(_url)
	{
	    if(this.icon!=undefined)
	    {
	        this.icon.remove();
	    }
	    this.icon = $("<img>",{
	        src:_url,
	        style:"position:absolute",
	        onDragStart:"return false;"
	    });
	    this.icon.prependTo(this.view);
	}
	
	Button.prototype.moveTo = function(_x,_y)
	{
		this.view.css("left",_x);
		this.view.css("top",_y);
	}
	
	Button.prototype.enable = function (value)
	{
	    this.view.css("opacity",value?1:0.5);
	    this.view.css("pointer-events",value?"":"none");
	}
	
	return Button;
})();