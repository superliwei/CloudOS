CloudOS.Rect = (function(){
	function Rect(_x,_y,_width,_height)
	{
	    this.x = _x;
	    this.y = _y;
	    this.width = _width;
	    this.height = _height;
	}
	
	Rect.prototype.contains = function(point)
	{
		return (point.x >= this.x && point.x <= this.x+this.width) && (point.y >= this.y && point.y <= this.y+this.height);
	}
	
	
	/**
	 * 判断两个矩形是否相交
	 * 原理：
	 * 分别比较两个矩形的重心在x轴方向上和y轴方向上的距离与两个矩形的长或者宽的一半的和的大小,
	 * 如果重心的在x轴和y轴上的距离都比他们边长和的一半要小就符合相交的条件
	 */
	Rect.testRectCross = function(ra,rb)
	{
	    var a_cx,a_cy; //第一个中心点
	    var b_cx,b_cy; //第二个中心点
	
	    a_cx = ra.x + (ra.width/2);
	    a_cy = ra.y + (ra.height/2);
	
	    b_cx = rb.x + (rb.width/2);
	    b_cy = rb.y + (rb.height/2);
	
	    return ( (Math.abs(a_cx - b_cx) <= (ra.width/2 + rb.width/2))
	        && (Math.abs(a_cy - b_cy) <= (ra.height/2 + rb.height/2)));
	}
	
	return Rect;
})();