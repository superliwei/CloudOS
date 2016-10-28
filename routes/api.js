var express = require('express');
var router = express.Router();

const FS = require('../modules/FS');
const User = require('../modules/User');

router.get('/user/login', function(req, res, next) {
	User.login(req.query.name,req.query.password,new ResultHandle(res).handler);
});

router.get('/user/config', function(req, res, next) {
	User.getConfig(req.query.name,req.query.token,new ResultHandle(res).handler);
});

router.get('/fs/readdir', function(req, res, next) {
	checkToken(req,res,function(onComplete){
		FS.readdir(req.query.user,req.query.url,onComplete);
	});
});

router.get('/fs/createdir', function(req, res, next) {
	checkToken(req,res,function(onComplete){
		FS.createdir(req.query.user,req.query.url,onComplete);
	});
});

router.get('/fs/rename', function(req, res, next) {
	checkToken(req,res,function(onComplete){
		FS.rename(req.query.user,req.query.oldurl,req.query.newurl,onComplete);
	});
});

router.get('/fs/movefiles', function(req, res, next) {
	checkToken(req,res,function(onComplete){
		FS.moveFiles(req.query.user,req.query.oldurls,req.query.newurls,onComplete);
	});
});

router.get('/fs/copy', function(req, res, next) {
	checkToken(req,res,function(onComplete){
		FS.copy(req.query.user,req.query.oldurls,req.query.newurls,onComplete);
	});
});

/**
 * 检查token后执行
 */
function checkToken(req,res,handler)
{
	var onComplete = new ResultHandle(res).handler;
	User.isTokenOk(req.query.user,function(err){
		if(err)return onComplete(Error.TokenError);
		handler(onComplete);
	});
}

/**
 * 统一处理输出结果
 */
function ResultHandle(res)
{
	this.handler = function(err,result)
	{
		if(err) return res.send({status:"error",msg:err});
	  	res.send({status:"success",result:result});
	}
}

module.exports = router;
