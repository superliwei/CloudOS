/**
 * 模块加载器
 */

var Module = function()
{
	this.view = $("<div>");
	Module.list.push(this);
}

Module.list = [];

Module.prototype.load = function(_url,_complete)
{
	this.unload();
	this.url = _url;
	var self = this;
	$.get(_url,function(_data){
		self.content = self.inject(_data);
		$(self.content).appendTo(self.view);
        if(_complete!=undefined)_complete();
	});
}

Module.prototype.inject = function(_data)
{
	var result = _data;
	var str0 = "(function(){";
	var str1 = str0 + "\n	var module = Module.getModule(\""+this.url+"\");";
	result = result.replace(str0,str1);
	return result;
}

Module.prototype.unload = function()
{
	if(this.content!=undefined)
	{
		this.view.empty();
	}
}

Module.prototype.dispose = function()
{
	var idx = Module.list.indexOf(this);
	Module.list.splice(idx,1);
	this.view.remove();
}

Module.getModule = function(_url)
{
	var target = null;
	var len = Module.list.length;
	for(var i=0;i<len;i++)
	{
		var module = Module.list[i];
		if(module.url == _url)
		{
			target = module;
			break;
		}
	}
	return target;
}