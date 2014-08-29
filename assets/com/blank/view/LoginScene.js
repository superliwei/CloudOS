/**
 * 登录场景
 */

var LoginScene = function()
{
	this.view = null;
	this.init();
}

LoginScene._instance = null;

LoginScene.instance = function()
{
	if(LoginScene._instance == null)
	{
		LoginScene._instance = new LoginScene();
	}
	return LoginScene._instance;
}

LoginScene.prototype.init = function()
{
	this.view = $("<div class='LoginScene'>");
	this.ct = $("<div class='ct'>");
	this.img = $("<div class='img'>");
	this.img.appendTo(this.ct);
	this.ct.appendTo(this.view);

	this.nameLabel = $("<div class='nameLabel'>Ninja</div>");
	this.nameLabel.appendTo(this.view);

	this.inputField = $("<div class='pwInput'><input type='password' name='pw' /></div>");
	this.inputField.appendTo(this.view);

	var self = this;
	$(window).resize(function(){
		self.resizeHandler();
	});
	this.resizeHandler();
}

LoginScene.prototype.resizeHandler = function()
{
	var tx = $(window).width()*0.5;
	var ty = $(window).height()*0.5;
	this.view.offset({left:tx,top:ty});
}