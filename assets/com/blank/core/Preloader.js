/**
 * 预加载
 */
CloudOS.Preload = (function(){
	function Preloader()
	{
		var self = this;
	    this.view = $("<div>");
	    this.logo = $("<div>",{style:"position:absolute;display:none;"});
	    this.img = $("<img>",{
	        src:"assets/images/logo.png",
	        style:"position:absolute;max-width:50px;max-height:50px;"
	    }).appendTo(this.logo);
	    this.logo.appendTo(this.view);
	    $(window).on("resize",resizeHandler);
	    this.img.get(0).onload = function()
	    {
	        self.logo.fadeIn("slow");
	    	self.img.css("left",-self.img.width()*0.5);
	    	self.img.css("top",-self.img.height()*0.5);
	    }
	
	    window.onload = function()
	    {
	    	self.logo.fadeOut("fast",function(){
                self.destroy();
                CloudOS.CoreSystem.start();
            });
	    }
	    
	    function resizeHandler(e)
	    {
	    	var tx = $(window).width()*0.5;
	    	var ty = $(window).height()*0.5;
	    	self.logo.offset({left:tx,top:ty});
	    }
	    
	    this.appendTo = function(container)
	    {
	    	this.view.appendTo(container);
	    	resizeHandler();
	    }
	    
	    this.destroy = function()
	    {
	    	$(window).off("resize",resizeHandler);
	    	this.view.remove();
	    }
	}
	
	Preloader.start = function()
	{
		var preloader = new Preloader();
	    preloader.appendTo('body');
	}
	
	Preloader.start();
	
	return Preloader;
})();