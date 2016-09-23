CloudOS.Loader = function(url,vars,onComplete)
{
	//cloudos标准数据返回格式 {status:"success",result:{...}} || {status:"error",msg:"..."}
	var loader = {};
	var ajax = $.ajax({
		type : "GET",
		url : url,
		data : vars,
		dataType : "json",
		success : function(data){
			if(data.status == "success")
			{
				onComplete(undefined,data.result);
			}
			else if(data.status == "error")
			{
				onComplete(data);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			onComplete({status:"error",msg:textStatus});
		}
	});
	loader.abort = function()
	{
		ajax.abort();
	}
	return loader;
}