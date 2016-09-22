/**
 * 桌面背景
 */
CloudOS.Background = function()
{
	var self = this;
	this.view = $("<div>",{
		style:"position:absolute;overflow:hidden;"
	});
	
	this.img = null;
	
	var imgLoader = new CloudOS.ImageLoader(CloudOS.User.currentUser.config.backgroundImage,{
		onComplete:function(){
			self.img = $(imgLoader.image);
			self.img.css("position","absolute");
			self.resizeImg();
			self.img.appendTo(self.view);
		}
	});
	
	this.setSize = function(width,height)
	{
		this.view.width(width);
		this.view.height(height);
		this.resizeImg();
	}
	
	this.resizeImg = function()
	{
		if(this.img == null)return;
		var w = this.img.get(0).width;
		var h = this.img.get(0).height;
		var rw = this.view.width();
		var rh = this.view.height();
		var m = rw/w;
		var n = rh/h;
		var ts = m>n?m:n;
		var tw = w*ts;
		var th = h*ts;
		this.img.width(tw);
		this.img.height(th);
		this.img.css("left",(rw-tw)*0.5);
		this.img.css("top",(rh-th)*0.5);
	}
}