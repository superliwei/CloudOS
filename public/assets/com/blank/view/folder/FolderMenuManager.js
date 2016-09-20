/**
 * 文件夹菜单管理
 */
CloudOS.FolderMenuManager = function()
{
	CloudOS.MenuManager.call(this);
	
	this.getCustomMenuSource = function()
	{
		return [
			{label:"Finder",bold:"true",children:[
				{label:"关于Finder"}
			]},
			{label:"文件",children:[
		        {label:"新建"},
		        {type:"separator"},
		        {label:"关闭当前"},
		        {label:"关闭所有"},
		        {type:"separator"},
		        {label:"偏好设置"}
		    ]},
			{label:"编辑",children:[
		        {label:"全选"},
		        {label:"反选"},
		        {label:"取消选择"},
		        {type:"separator"},
		        {label:"复制"},
		        {label:"剪切"},
		        {label:"粘贴"},
		        {label:"删除"},
		        {label:"重命名"}
		    ]},
			{label:"显示",children:[
		        {label:"整理"},
		        {type:"separator"},
		        {label:"排序方式",children:[
		            {label:"名称"},
		            {label:"修改日期"},
		            {label:"类型"},
		            {label:"大小"}
		        ]}
		    ]},
			{label:"前往",children:[
		        {label:"根目录"},
		        {label:"应用程序"},
		        {type:"separator"},
		        {label:"路径"}
		    ]}
		];
	}
}
