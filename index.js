$(function(){
	$("#img").draggable();
	var _img=$("#img");
	var imgWidth=_img.width();
	var hwratio=_img.height()/_img.width();
	var scaleFactor=1;
	
	$("html").click(function(){
		console.log(event.pageX-0.05*$("html").width());
	});
	
	_img.on('mousewheel', function(event) {
	    //console.log(event.deltaX, event.deltaY, event.deltaFactor);
	    var imgWidth=_img.width();
	    var newWidth=imgWidth+event.deltaY*event.deltaFactor/scaleFactor;//新的图片宽度
	    var widthChange=event.deltaY*event.deltaFactor/scaleFactor;//图片宽度的改变值
	    if(newWidth>0&&newWidth<16000){
	    	//var _img=$("#img");
	    	var oldHeight=_img.height();
	    	var oldWidth=_img.width();
	    	_img.width(newWidth);
	    	var heightChange=_img.height()-oldHeight;		//图片高度的改变值
	    	$("#mousex").html(event.pageX);
	    	$("#mousey").html(event.pageY);
	    	var imgXvalue=_img.css("left").replace("px","");//img标签left坐标值
	    	var imgYvalue=_img.css("top").replace("px","");	//img标签top坐标值
	    		    	
	    	var xRatio=(event.pageX-0.05*$("html").width()-imgXvalue)/oldWidth;//图片在x方向的放大率
	    	var yRatio=(event.pageY-0.04*$("html").height()-imgYvalue)/oldHeight;//图片在y方向的放大率
	    	// console.log("heightChange:"+heightChange);
	    	// console.log("widthChange:"+widthChange);
	    	
	    	_img.css("left",imgXvalue-xRatio*widthChange);
	    	_img.css("top",imgYvalue-yRatio*heightChange);

	    	$("#imagex").html(_img.css("left"));
	    	$("#imagey").html(_img.css("top"));
	    }
	});
	
	



	//console.log("ok");
});