var CoreSystem = {};

CoreSystem.start = function(_onComplete)
{
    LoginScene.instance().ready(_onComplete);
	BroadcastCenter.addEventListener(LoginScene.LOGIN_SUCCESS,function(){
		Desktop.instance().ready(function(){
			LoginScene.instance().loading.hide();
			LoginScene.instance().view.hide("fast",function(){
				Desktop.instance().appendTo($(document.body));
			});
		});
	});
    /*
    _onComplete();
    User.currentUser = new User("heroblank@gmail.com","_#sfdsfsdfsefkjoiaenlksdjfls");
    Desktop.instance().ready(function(){
        Desktop.instance().appendTo($(document.body));
    });
    */
}