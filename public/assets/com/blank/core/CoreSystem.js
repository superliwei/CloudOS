/**
 * 核心
 */
CloudOS.CoreSystem = (function(){
	var CoreSystem = {};
	CoreSystem.start = function()
	{
		CloudOS.User.login("guest","123456",function(err){
			if(err) return trace(err);
	    	CloudOS.User.currentUser.read(function(err){
	    		if(err) return trace(err);
		    	CSSPlugin.defaultTransformPerspective = 1000;
				CoreSystem.desktop = new CloudOS.Desktop();
				CoreSystem.desktop.view.appendTo('body');
	    	});
	    });
	}
	return CoreSystem;
})();