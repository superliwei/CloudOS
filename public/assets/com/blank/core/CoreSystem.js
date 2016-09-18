/**
 * 核心
 */
CloudOS.CoreSystem = (function(){
	var CoreSystem = {};
	CoreSystem.start = function()
	{
		CloudOS.User.login("guest","123456",function(){
	    	CloudOS.User.currentUser.read(function(){
		    	CSSPlugin.defaultTransformPerspective = 1000;
				CoreSystem.desktop = new CloudOS.Desktop();
				CoreSystem.desktop.view.appendTo('body');
	    	});
	    },function(err){
	    	trace(err);
	    });
	}
	return CoreSystem;
})();