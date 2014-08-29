var Background = function()
{
	this.view = $("<div>",{
		"style":"position:absolute"
	});

	this.img = null;
	var self = this;
	
	var imgLoader = new ImageLoader("assets/images/bg/0.jpg",{
		"onComplete":function(){
			self.img = $(imgLoader.image);
			self.img.css("position","absolute");
			self.resizeImg();
			self.img.appendTo(self.view);
		}
	});

	$(window).resize(function(){
		self.resizeHandler();
	});
}

Background.prototype.appendTo = function(_parentView)
{
	this.view.appendTo(_parentView);
	this.resizeHandler();
}

Background.prototype.resizeHandler = function()
{
	this.view.width($(window).width());
	this.view.height($(window).height());
	this.resizeImg();
}

Background.prototype.resizeImg = function()
{
	if(this.img == null)return;
	var w = this.img.get(0).width;
	var h = this.img.get(0).height;
	var rw = $(window).width();
	var rh = $(window).height();
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

Background._instance = null;

Background.instance = function()
{
	if(Background._instance == null)
	{
		Background._instance = new Background();
	}
	return Background._instance;
}