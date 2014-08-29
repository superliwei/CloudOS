var BroadcastCenter = {};

BroadcastCenter.dispatchEvent = function(e)
{
	$(document).trigger(e.type,e.data);
}

BroadcastCenter.addEventListener = function(eventName,eventHandler)
{
	$(document).bind(eventName,eventHandler);
}

BroadcastCenter.removeEventListener = function(eventName,eventHandler)
{
	$(document).unbind(eventName,eventHandler);
}