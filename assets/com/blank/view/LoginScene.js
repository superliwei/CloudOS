/**
 * 登录场景
 */

CloudOS.LoginScene = (function(){
	function LoginScene()
	{
	
	}
	
	LoginScene.LOGIN_SUCCESS = "LoginScene_login_success";
	
	LoginScene.prototype.ready = function(_onReady)
	{
	    var self = this;
	    CloudOS.Session.read(function(_data){
	        self.list = _data;
	        _onReady();
	        self.init();
	    });
	}
	
	LoginScene.prototype.init = function()
	{
	    this.view = $("<div>");
	    this.view.appendTo("body");
	
	    this.items = [];
	
	    this.layoutState = 0;
	    this.selectedItem = null;
	
	    this.titleLabel = $("<div>",{
	        style:"position:absolute;color:#fff;font-size:35px;font-family:vijaya;color:#aaa;"
	    });
	    this.titleLabel.text("Zoolon CloudOS");
	    this.titleLabel.appendTo(this.view);
	
	    var newLoginUser = new LoginScene.LoginUser({
	        icon:"assets/images/avatar/a.png",
	        nickname:"新登录用户"
	    });
	    newLoginUser.view.appendTo(this.view);
	    this.items.push(newLoginUser);
	
	    var len = this.list.length;
	    for(var i=0;i<len;i++)
	    {
	        var loginUser = new LoginScene.LoginUser(this.list[i]);
	        loginUser.view.appendTo(this.view);
	        this.items.push(loginUser);
	    }
	
	    this.backBt = new Button({
	        icon:"assets/images/arrowL.png",
	        width:24,
	        height:24
	    });
		this.backBt.view.css("background-color","#999")
	    this.backBt.view.appendTo(this.view);
	    this.backBt.view.hide();
		this.backBt.enable(false);
	    this.backBt.view.bind(Button.CLICK,this,this.backHandler);
	
	    this.emailInput = $("<input>",{
	        type:"text",
	        style:"font-size:16px;position:absolute;",
	        placeholder:"email",
			disabled:"disabled"
	    });
	    this.emailInput.appendTo(this.view);
	    this.emailInput.hide();
	
	    this.passwordInput = $("<input>",{
	        type:"password",
	        style:"font-size:16px;position:absolute;",
	        placeholder:"password",
			disabled:"disabled"
	    });
	    this.passwordInput.appendTo(this.view);
	    this.passwordInput.hide();
		this.passwordInput.bind("keydown",this,this.submitHandler);
		
		this.loading = $("<img>",{
			src:"assets/images/loading.gif",
			style:"position:absolute;",
	        onDragStart:"return false;"
		});
		this.loading.appendTo(this.view);
		this.loading.hide();
	
	    for(var i= 0,len=this.items.length;i<len;i++)
	    {
	        var item = this.items[i];
	        item.ct.bind("click",[this,item],this.itemClickHandler);
	    }
	    this.layout0();
	    this.show();
	    $(window).bind("resize",this,this.resizeHandler);
	}
	
	LoginScene.prototype.submitHandler = function(e)
	{
		var self = e.data;
		if(e.keyCode == 13) //Enter
		{
			self.passwordInput[0].blur();
			self.backBt.enable(false);
			self.loading.fadeIn("fast");
			self.layoutLoading();
			var idx = self.items.indexOf(self.selectedItem);
			if(idx == 0)self.emailInput.attr("disabled","disabled");
			self.passwordInput.attr("disabled","disabled");
			var email = (idx == 0)?self.emailInput.val():self.selectedItem.data.email;
			var password = self.passwordInput.val();
			CloudOS.User.login(email,password,successHandler,failHandler);
		}
		
		function successHandler()
		{
			trace("登陆成功");
			CloudOS.BroadcastCenter.dispatchEvent(new CloudOS.Event(LoginScene.LOGIN_SUCCESS));
		}
		
		function failHandler()
		{
			trace("登陆失败");
			self.loading.fadeOut("fast");
			self.backBt.enable(true);
			if(idx == 0)self.emailInput.removeAttr("disabled");
			self.passwordInput.removeAttr("disabled");
			self.passwordInput[0].focus();
		}
	}
	
	LoginScene.prototype.itemClickHandler = function(e)
	{
	    var self = e.data[0];
	    self.selectedItem = e.data[1];
	    for(var i= 0,len=self.items.length;i<len;i++)
	    {
	        var item = self.items[i];
	        item.mouseEnable(false);
	        var tx,ty;
	        if(self.selectedItem == item)
	        {
	            tx = item.view.offset().left;
	            ty = item.view.offset().top;
	            var idx = self.items.indexOf(self.selectedItem);
	            if(idx == 0)self.emailInput.show();
	            self.passwordInput.show();
	            self.backBt.view.show();
	            var _ttx = self.titleLabel.offset().left;
	            var _tty = self.titleLabel.offset().top;
	            self.layout1();
	            TweenLite.from(self.titleLabel,1,{left:_ttx,top:_tty,ease:Cubic.easeInOut});
	            TweenLite.from(item.view,1,{left:tx,top:ty,ease:Cubic.easeInOut,onComplete:function(){
	                self.selectedItem.label.fadeIn("fast");
	            }});
	            tx = self.backBt.view.offset().left + 20;
	            TweenLite.from(self.backBt.view,0.5,{opacity:0,left:tx,delay:0.8,onComplete:function(){
					self.backBt.enable(true);
				}});
	            if(idx == 0)
	            {
					self.emailInput.removeAttr("disabled");
	                ty = self.emailInput.offset().top + 20;
	                TweenLite.from(self.emailInput,0.5,{opacity:0,top:ty,delay:0.5,onComplete:function(){
						self.emailInput[0].focus();
					}});
	            }
				self.passwordInput.removeAttr("disabled");
	            ty = self.passwordInput.offset().top + 20;
	            TweenLite.from(self.passwordInput,0.5,{opacity:0,top:ty,delay:(idx==0)?0.8:0.5,onComplete:function(){
					if(idx>0)self.passwordInput[0].focus();
				}});
	        }
	        else
	        {
	            ty = item.view.offset().top + 20;
	            TweenLite.to(item.view,0.5,{top:ty,opacity:0,onCompleteParams:[item],onComplete:function(_item){
	                _item.view.hide();
	                _item.view.css("opacity",1);
	            }});
	        }
	    }
	    self.layoutState = 1;
	}
	
	LoginScene.prototype.backHandler = function(e)
	{
	    var self = e.data;
	    var tx,ty;
	    self.backBt.enable(false);
	    tx = self.backBt.view.offset().left+20;
	    TweenLite.to(self.backBt.view,0.5,{left:tx,opacity:0,onComplete:function(){
	        self.backBt.view.hide();
	        self.backBt.view.css("opacity",1);
	        self.backBt.enable(true);
	    }});
	
	    self.layoutState = 0;
	
	    var idx = self.items.indexOf(self.selectedItem);
	    if(idx == 0)
	    {
			self.emailInput.attr("disabled","disabled");
	        ty = self.emailInput.offset().top + 20;
	        TweenLite.to(self.emailInput,0.5,{opacity:0,top:ty,delay:0.3,onComplete:function(){
	            self.emailInput.hide();
	            self.emailInput.css("opacity",1);
	        }});
	    }
	
		self.passwordInput.attr("disabled","disabled");
	    ty = self.passwordInput.offset().top + 20;
	    TweenLite.to(self.passwordInput,0.5,{opacity:0,top:ty,onComplete:function(){
	        self.passwordInput.hide();
	        self.passwordInput.css("opacity",1);
	    }});
	
	    for(var i= 0,len=self.items.length;i<len;i++)
	    {
	        var item = self.items[i];
	        if(item != self.selectedItem)
	        {
	            item.view.show();
	        }
	    }
	
	    tx = self.selectedItem.view.offset().left;
	    ty = self.selectedItem.view.offset().top;
	    var _ttx = self.titleLabel.offset().left;
	    var _tty = self.titleLabel.offset().top;
	    self.layout0();
	
	    TweenLite.from(self.titleLabel,1,{left:_ttx,top:_tty,ease:Cubic.easeInOut,delay:(idx==0)?0.5:0.3});
	    TweenLite.from(self.selectedItem.view,1,{left:tx,top:ty,ease:Cubic.easeInOut,delay:(idx==0)?0.5:0.3,onStart:function(){
	        self.selectedItem.label.fadeOut("fast");
	    }});
	    for(i= 0;i<len;i++)
	    {
	        var item = self.items[i];
	        if(item != self.selectedItem)
	        {
	            ty = item.view.offset().top + 20;
	            TweenLite.from(item.view,0.5,{top:ty,opacity:0,delay:(idx==0)?1.2:0.9});
	        }
	    }
	    TweenLite.delayedCall((idx==0)?1.7:1.4,function(){
	        for(var i= 0,len=self.items.length;i<len;i++)
	        {
	            var item = self.items[i];
	            item.mouseEnable(true);
	        }
	        self.selectedItem = null;
	    });
	}
	
	LoginScene.prototype.layout0 = function()
	{
	    var spacing = 30;
	    for(var i= 0,len=this.items.length;i<len;i++)
	    {
	        var item = this.items[i];
	        var tx = (item.ct.width() + spacing)*i + ($(window).width() - item.ct.width()*len-spacing*(len-1))*0.5;
	        var ty = ($(window).height() - item.ct.height())*0.5;
	        item.view.offset({left:tx,top:ty});
	    }
	    tx = ($(window).width() - this.titleLabel.width())*0.5;
	    ty -= this.titleLabel.height() + 60;
	    this.titleLabel.offset({left:tx,top:ty});
	}
	
	LoginScene.prototype.layout1 = function()
	{
	    var tx = ($(window).width() - this.selectedItem.ct.width())*0.5;
	    var ty = ($(window).height() - this.selectedItem.ct.height())*0.3;
	    this.selectedItem.view.offset({left:tx,top:ty});
	
	    var _tx = ($(window).width() - this.titleLabel.width())*0.5;
	    var _ty = ty - this.titleLabel.height() - 60;
	    this.titleLabel.offset({left:_tx,top:_ty});
	
	    var idx = this.items.indexOf(this.selectedItem);
	    if(idx == 0)
	    {
	        tx -= (this.emailInput.width() - this.selectedItem.ct.width())*0.5;
	        ty += this.selectedItem.ct.height() + 40;
	        this.emailInput.offset({left:tx,top:ty});
	        ty += this.emailInput.height() + 15;
	        this.passwordInput.offset({left:tx,top:ty});
	    }
	    else
	    {
	        tx -= (this.passwordInput.width() - this.selectedItem.ct.width())*0.5;
	        ty += this.selectedItem.ct.height() + 40;
	        this.passwordInput.offset({left:tx,top:ty});
	    }
		this.layoutLoading();
	
	    tx = this.selectedItem.view.offset().left - this.backBt.view.width()-20;
	    ty = this.selectedItem.view.offset().top + (this.selectedItem.ct.height() - this.backBt.view.height())*0.5;
	    this.backBt.view.offset({left:tx,top:ty});
	}
	
	LoginScene.prototype.layoutLoading = function()
	{
		var tx = this.passwordInput.offset().left + this.passwordInput.width() - this.loading.width();
		var ty = this.passwordInput.offset().top + (this.passwordInput.outerHeight() - this.loading.height())*0.5;
		this.loading.offset({left:tx,top:ty});
	}
	
	LoginScene.prototype.show = function()
	{
	    for(var i= 0,len=this.items.length;i<len;i++)
	    {
	        var item = this.items[i];
	        TweenLite.from(item.view,1,{opacity:0,delay:0.05*i});
	    }
	
	    TweenLite.from(this.titleLabel,0.5,{opacity:0});
	}
	
	LoginScene.prototype.resizeHandler = function(e)
	{
	    var self = e.data;
	    switch(self.layoutState)
	    {
	        case 0:
	            self.layout0();
	            break;
	        case 1:
	            self.layout1();
	            break;
	    }
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
	
	LoginScene.LoginUser = function(_data)
	{
	    this.data = _data;
	
	    this.view = $("<div>",{style:"position:absolute;"});
	    this.ct = $("<div>",{style:"position: absolute;border: solid 1px #666666;width: 110px;height:110px;border-radius: 55px;"});
	    this.ct.appendTo(this.view);
	
	    this.icon = $("<div>",{style:"position: absolute;width: 100px;height:100px;border-radius:50px;left:5px;top:5px;"});
	    this.icon.css("background-image","url("+this.data.icon+")");
	    this.icon.appendTo(this.ct);
	
	    this.label = $("<div>",{
	        style:"position:absolute;font-weight:bold;color:#fff;width:110px;text-align:center;top:120px;word-break:break-all;"
	    });
	    this.label.text(this.data.nickname);
	    this.label.appendTo(this.view);
	    this.label.hide();
	
	    var self = this;
	    this.ct.mouseenter(function(){
	        self.label.fadeIn("fast");
	        TweenLite.to(self.ct,0.5,{borderColor:"#ffffff"});
	    });
	    this.ct.mouseleave(function(){
	        self.label.fadeOut("fast");
	        TweenLite.to(self.ct,0.5,{borderColor:"#666666"});
	        self.view.css("opacity",1);
	    });
	    this.ct.mousedown(function(){
	        self.view.css("opacity",0.5);
	    });
	    this.ct.mouseup(function(){
	        self.view.css("opacity",1);
	    });
	}
	
	LoginScene.LoginUser.prototype.mouseEnable = function(value)
	{
	    if(!value)
	    {
	        this.mask = $("<div>",{style:"position:absolute;"});
	        this.mask.width(this.ct.outerWidth());
	        this.mask.height(this.ct.outerHeight());
	        this.ct.after(this.mask);
	    }
	    else
	    {
	        if(this.mask!=undefined)this.mask.remove();
	    }
	}
	
	return LoginScene;
	
})();