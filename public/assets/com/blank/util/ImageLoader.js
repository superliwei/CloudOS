CloudOS.ImageLoader = function(_url,_option)
{
	var self = this;
	this.image = new Image();
	this.image.src = _url;
	this.option = _option || {};
	this.image.onload = function()
	{
		if(self.option.onComplete!=undefined)self.option.onComplete();
	}
}