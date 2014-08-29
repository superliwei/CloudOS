var CoreSystem = {};

CoreSystem.start = function()
{
	//解决body滚动的问题
	document.body.onmousewheel = function(){
		$(document.body).scrollTop(0);
	};
	
	//LoginScene.instance().view.appendTo("body");
	Desktop.instance().appendTo($(document.body));
}

function trace(obj)
{
	console.log(obj);
}