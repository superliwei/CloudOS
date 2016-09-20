/**
 * 菜单管理
 */
CloudOS.MenuManager = function()
{
	this.handleItemClick = function(item)
	{
		
	}
	
	this.handleMenuOpen = function(item)
	{
		
	}
	
	this.getMenuSource = function()
	{
		var source = {
			items:[],
			height:26
		};
		
		source.items.push({img:"assets/images/logo.png",children:[
			{label:"关于CloudOS"},
	        {type:"separator"},
			{label:"终端",icon:"assets/images/icons/16/Terminal.png"},
	        {label:"系统偏好设置",icon:"assets/images/icons/16/setting.png"},
	        {type:"separator"},
	        {label:"清空废纸篓"}
		]});
		
		source.items = source.items.concat(this.getCustomMenuSource());
		
		source.items.push({label:"窗口",children:[
	        {label:"最小化"},
	        {label:"最大化"},
	        {label:"关闭"}
	    ]});
	    
		source.items.push({label:"帮助",children:[
	        {label:"使用说明"}
	    ]});
		
		return source;
	}
	
	/**
	 * 自定义菜单部分
	 */
	this.getCustomMenuSource = function()
	{
		return [];
	}
}