CloudOS.IconMap = (function(){
	var IconMap = {};

	IconMap.list = [
	    {icon:"3gpp.png",extensions:["3gpp"]},
	    {icon:"aac.png",extensions:["aac"]},
	    {icon:"aiff.png",extensions:["aiff","aif"]},
	    {icon:"bmp.png",extensions:["bmp","dib","rle"]},
	    {icon:"bz2.png",extensions:["bz2","bzip2"]},
	    {icon:"c.png",extensions:["c"]},
	
	    {icon:"compressed.png",extensions:["7z","rar","cab","uue","z","7-zip","ace","lzh","arj","cpio","deb","hfs","lha","lzh","lzma","rpm","split","swm","taz","tbz","wim","xar"]}, //压缩文件
	
	    {icon:"config.png",extensions:["ini","cfg","conf","config"]},//配置文件
	
	    {icon:"cpp.png",extensions:["cpp"]},
	    {icon:"css.png",extensions:["css"]},
	
	    {icon:"diskimage.png",extensions:["dmg","iso","gho","bin","nrg","vcd","cif","fcd","img","ccd","c2d","dfi","tao","cue"]},
	
	    {icon:"doc.png",extensions:["doc","docx"]},
	
	    {icon:"flash.png",extensions:["swf","swz","fla"]},
	
	    {icon:"gif.png",extensions:["gif"]},
	    {icon:"gz.png",extensions:["gz","gzip"]},
	    {icon:"h.png",extensions:["h"]},
	
	    {icon:"html.png",extensions:["html","htm"]},
	
	    {icon:"ico.png",extensions:["ico"]},
	
	    {icon:"image.png",extensions:["jif","jfi","jfif","kdc","pcd","pcx","dcx","pic","psd","tga","wmf"]}, //图片
	
	    {icon:"java.png",extensions:["java","jar","jsp"]},
	
	    {icon:"jpeg.png",extensions:["jpeg","jpg","jpe"]},
	    {icon:"js.png",extensions:["js"]},
	
	    {icon:"keynote.png",extensions:["keynote"]},
	
	    {icon:"log.png",extensions:["tsv","blg","etl"]},
	
	    {icon:"m.png",extensions:["m"]},
	    {icon:"m3u.png",extensions:["m3u"]},
	    {icon:"m4r.png",extensions:["m4r"]},
	    {icon:"mp2.png",extensions:["mp2"]},
	    {icon:"mp3.png",extensions:["mp3"]},
	
	    {icon:"mpeg.png",extensions:["mpeg","mpg"]},
	
	    {icon:"numbers.png",extensions:["numbers"]},
	
	    {icon:"pages.png",extensions:["pages"]},
	
	    {icon:"pdf.png",extensions:["pdf"]},
	    {icon:"png.png",extensions:["png"]},
	    {icon:"ppt.png",extensions:["ppt"]},
	    {icon:"rtf.png",extensions:["rtf"]},
	
	    {icon:"sound.png",extensions:["mod","st3","xt","s3m","far","669","ra","cmf","cda","mid","voc","rmi","pcm"]},
	
	    {icon:"spreadsheet.png",extensions:["csv"]},
	
	    {icon:"sqlite3.png",extensions:["sqlite3"]},
	
	    {icon:"tar.png",extensions:["tar"]},
	    {icon:"tbz2.png",extensions:["tbz2"]},
	
	    {icon:"text.png",extensions:["txt","xml","as","php"]},
	
	    {icon:"tgz.png",extensions:["tgz"]},
	    {icon:"tiff.png",extensions:["tiff","tif"]},
	    {icon:"video.png",extensions:["mp4","mov","rmvb","rm","flv","avi"]},
	    {icon:"wav.png",extensions:["wav"]},
	    {icon:"xib.png",extensions:["xib"]},
	    {icon:"zip.png",extensions:["zip"]}
	];
	
	IconMap.emptyIcon = "assets/images/icons/64/empty.png";
	IconMap.folderIcon = "assets/images/icons/64/folder.png";
	
	IconMap.getIcon = function(_extension)
	{
	    var icon = IconMap.emptyIcon;
	    if(_extension == "directory")
	    {
	        icon = IconMap.folderIcon;
	    }
	    else
	    {
	        _extension = _extension.toLowerCase();
	        var len = IconMap.list.length;
	        for (var i = 0; i < len; i++)
	        {
	            var item = IconMap.list[i];
	            if (item.extensions.indexOf(_extension) > -1)
	            {
	                icon = "assets/images/icons/64/"+item.icon;
	                break;
	            }
	        }
	    }
	    return icon;
	}
	
	return IconMap;
})();