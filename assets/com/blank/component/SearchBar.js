CloudOS.SearchBar = (function(){
	function SearchBar()
	{
		this.view = $("<div>",{
			style:"position: absolute;width: 120px;height:24px;background-color: #ffffff;border-radius: 3px;"
		});
		this.placeHolder = $("<div>",{
			style:"position:absolute;background-image:url(assets/images/search.png);background-repeat: no-repeat;height: 18px;padding-left: 18px;padding-top: 0px;font-size: 14px;color: #666666;left: 28px;top: 3px;"
		});
		this.placeHolder.text("搜索");
		this.placeHolder.appendTo(this.view);
	}
	
	SearchBar.prototype.moveTo = function(_x,_y)
	{
		this.view.css("left",_x);
		this.view.css("top",_y);
	}
	
	return SearchBar;
})();