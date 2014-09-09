var Session = {};

/**
 * 读取缓存的已登陆过的用户的数据
 */
Session.read = function(_onComplete)
{
    setTimeout(function(){
        _onComplete([
            {
                icon:"assets/images/avatar/0.jpg",
                email:"heroblank@gmail.com",
                nickname:"ninja"
            },
            {
                icon:"assets/images/avatar/1.jpg",
                email:"46505512@qq.com",
                nickname:"jobs"
            }
        ]);
    },1000);
}
