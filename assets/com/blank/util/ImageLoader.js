var ImageLoader = function(_url,_option)
{
	this.image = new Image();
	this.image.src = _url;
	this.option = _option==undefined?{}:_option;
	var self = this;
	this.image.onload = function()
	{
		if(self.option.onComplete!=undefined)self.option.onComplete();
	}
}