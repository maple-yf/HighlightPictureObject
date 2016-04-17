$(function(){
	$("#img").draggable();
	var _img=$("#img");
	var originalWidth=_img.width();
	//var imgWidth=_img.width();
	var hwratio=_img.height()/_img.width();
	var scaleFactor=1;//图片随着滚轮的放大参数
	var scaleRatio=1;//图片相对于初始情况的缩放比
	
	
	//
	_img.on('mousewheel', function(event) {
		//console.log(_img.css("background-size"));
		var imgWidth=_img.css("background-size").replace("px","");
	    var widthChange=event.deltaY*event.deltaFactor/scaleFactor;//图片宽度的改变值
	    var newWidth=imgWidth*1+widthChange;//新的图片宽度
	    
	    if(newWidth>500&&newWidth<16000){
	    	//var _img=$("#img");
	    	var oldHeight=_img.css("background-size").replace("px","")*1/2;
	    	var oldWidth=_img.css("background-size").replace("px","")*1;
	    	_img.css("background-size",newWidth);
	    	var heightChange=_img.css("background-size").replace("px","")*1/2-oldHeight;		//图片高度的改变值
	    	$("#mousex").html(event.pageX);
	    	$("#mousey").html(event.pageY);
	    	var imgXvalue=_img.css("left").replace("px","");//img标签left坐标值
	    	var imgYvalue=_img.css("top").replace("px","");	//img标签top坐标值
	    	
	    	var mouseXimg=event.pageX-0.05*$("html").width()-imgXvalue;
	    	var mouseYimg=event.pageY-0.04*$("html").height()-imgYvalue;

	    	var xRatio=mouseXimg/oldWidth;//图片在x方向的放大率
	    	var yRatio=mouseYimg/oldHeight;//图片在y方向的放大率
	    	// console.log("heightChange:"+heightChange);
	    	// console.log("widthChange:"+widthChange);
	    	
	    	_img.css("left",imgXvalue-xRatio*widthChange);
	    	_img.css("top",imgYvalue-yRatio*heightChange);

	    	scaleRatio=newWidth/oldWidth;
	    	
	    	if($(".theObject").length>0){
	    		var objectXvalue=$(".theObject").css("left").replace("px","")*1;
		    	var objectYvalue=$(".theObject").css("top").replace("px","")*1;

		    	var objectXRatio=objectXvalue/oldWidth;
		    	var objectYRatio=objectYvalue/oldHeight;


		    	$(".theObject").css("left",objectXvalue+objectXRatio*widthChange);
		    	$(".theObject").css("top",objectYvalue+objectYRatio*heightChange);
	    	}   	


	    	$("#imagex").html(_img.css("left"));
	    	$("#imagey").html(_img.css("top"));

	    	_img.css({"width":newWidth,"height":newWidth/2});
	    	
		}
	});


	_img.on('mousemove',function(event){
		//console.log(event.pageX-0.05*$("html").width(),event.pageY-0.04*$("html").height());
		var mousex=event.pageX-0.05*$("html").width();
		var mousey=event.pageY-0.04*$("html").height();

		var imgXvalue=_img.css("left").replace("px","");//img标签left坐标值
    	var imgYvalue=_img.css("top").replace("px","");	//img标签top坐标值
		var mouseXimg=mousex-imgXvalue;
		var mouseYimg=mousey-imgYvalue; 

		var theRatio=_img.width()/originalWidth;
		//console.log(mouseXimg/theRatio,mouseYimg/theRatio);

		if(mouseXimg/theRatio>=896&&mouseXimg/theRatio<=900&&mouseYimg/theRatio>=490&&mouseYimg/theRatio<=494){
			$("#fixedColumn1").remove();
			$(".tip-yellowsimple").remove();
			AddPoint("fixedColumn1",898*theRatio,488*theRatio);
			$("#fixedColumn1").poshytip(tip_yellowsimple);					
		}else if(mouseXimg/theRatio>=838&&mouseXimg/theRatio<=844&&mouseYimg/theRatio>=577&&mouseYimg/theRatio<=582){
			$("#fixedColumn2").remove();
			$(".tip-yellowsimple").remove();
			AddPoint("fixedColumn2",840*theRatio,575*theRatio);
			$("#fixedColumn2").poshytip(tip_yellowsimple);
		}
		if($(".theObject").length>1){
			$($(".theObject")[0]).remove();
		}



		$("#mousex").html(mouseXimg);
    	$("#mousey").html(mouseYimg);
	});	

	var tip_yellowsimple={
		className: 'tip-yellowsimple',
		showTimeout: 1,
		alignTo: 'target',
		alignX: 'center',
		offsetY: 5,
		allowTipHover: false
	}

	$("html").click(function(event){
		var mousex=event.pageX-0.05*$("html").width();
		var mousey=event.pageY-0.04*$("html").height();

		var imgXvalue=_img.css("left").replace("px","");//img标签left坐标值
    	var imgYvalue=_img.css("top").replace("px","");	//img标签top坐标值
		var mouseXimg=mousex-imgXvalue;
		var mouseYimg=mousey-imgYvalue;

		console.log(mouseXimg,mouseYimg);
	});
	
});

function AddPoint(id,x,y){
	
	var appendStrFixedColumn="<a href='#' title='固定挡车柱' id='"+id+"' style='position:absolute;z-index:9;top:"+y+"px;left:"+x+"px' class='theObject'>*</a>";
	$("#img").append(appendStrFixedColumn);
}


function imgElementScale(){
	$("#img").on('mousewheel', function(event) {//滚轮缩放图片
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

	    	scaleRatio=newWidth/oldWidth;
	    	// console.log(scaleRatio);
	    }
	});
}
/**/