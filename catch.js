
//////////////////////////////////////////////////////////

$(function () {			
	drow_rect("#content");
	//mouse_RightButton_forbid();
	//$(document).bind(“contextmenu”,function(e){return false;});//屏蔽右键菜单
})

/////////////////////////////////////////////////////////
function drow_rect(the_id){//theid表示用作画布的层		
	
var num=1;
var x_down=0,y_down=0;
var new_width=0,new_height=0;
var x_original=0,y_original=0;
var original_flag=true,down_flag=false;
var x_point=0,y_point=0;
var append_string;

	
	
	var MouseDown=function(e){
		if(e.which==1){//鼠标左键
			down_flag=true;
			x_down=e.pageX;
			y_down=e.pageY;//记录鼠标的当前坐标
			
			if(original_flag){//如果是第一次点击,把起始点的坐标记录到 x_original 和 y_original中
				x_original=e.pageX;
				y_original=e.pageY;
				original_flag=false;
			}
		}
	};
	
	var MouseMove=function(e){
		if(e.which==1){//鼠标左键
			if(down_flag){//鼠标有移动
				x_down=e.pageX;
				y_down=e.pageY;
				
				x_point=x_original;
				y_point=y_original;
				
				new_width=x_down-x_original;
				if(new_width<0){//鼠标向左运动
					new_width=-new_width;
					x_point=x_down;				
				}
				
				new_height=y_down-y_original;
				if(new_height<0){ //鼠标向右运动
					new_height=-new_height;
					y_point=y_down;				
				}
				
				$("div[name='"+num+"']").remove();//把前面的层删除，并在后面的代码中生成新的层				
				
				append_string="<div class='new_rect' style='left:"+x_point+"px;top:"+y_point+"px;"+"width:"+new_width+"px;height:"
									+new_height+"px' name='"+num+"' title='第"+num+"个'></div>";
				$(the_id).append(append_string);
				
			}
		}
	};
	
	$(the_id).bind("mousedown",MouseDown);
	$(the_id).bind("mousemove",MouseMove);//事件绑定
	
	$(the_id).mouseup(function(e){//松开鼠标左键,完成一个div的绘制
		if(e.which==1){//松开鼠标左键，初始化标志位
			down_flag=false;
			original_flag=true;
			
			
			//设置div的可移动属性
			$("div[name='"+num+"']").draggable();		
			$("div[name='"+num+"']").mousedown(function(){
				$(this).addClass("mousedown");//添加阴影
				$(the_id).unbind("mousedown",MouseDown);
				$(the_id).unbind("mousemove",MouseMove);//取消事件绑定
				
			});
			$("div[name='"+num+"']").mouseup(function(){
				$(this).removeClass("mousedown");//删除阴影
				$(the_id).bind("mousedown",MouseDown);
				$(the_id).bind("mousemove",MouseMove);//事件绑定
			});
			
			
			//绑定鼠标右键事件
			$("div[name='"+num+"']").mousedown(function(e){
							
				if(e.which==3){
					var divExtend="<div class='divExtend' name='extend"+$(this).attr("name")+"'><ul><li name='text'>文本</li><li name='draw'>画图</li>"+
									"<li name='color'>颜色</li><li name='delete'>删除</li></ul></div>";
					
					var parentDiv="div[name='"+num+"']";
					var childDiv="div[name='extend"+$(this).attr("name")+"']";
					$(childDiv).remove();					
					$(this).append(divExtend);					
					
					//位divExtend绑定事件
					$("div[name='extend"+$(this).attr("name")+"'] li").click(function(){						
						
						switch($(this).attr("name"))
						{
							case "text":
								
								break;
							case "draw":
								
								break;
							case "color":
								
								break;
							case "delete":$("div[name='"+num+"']").remove();break;
							default:break;
						}
						$(childDiv).remove();//删除divExtend
					});
					
				}
			});
			$("div[name='"+num+"']").mouseup(function(e){
				if(e.which==3){
					$(this).removeClass("mousedown");//删除阴影				
				}
				num--;
			});
			num++;
		}
	});
	
}



function mouse_RightButton_forbid(){//禁用右键菜单
	document.oncontextmenu=function(event) {
		if (document.all) 
			window.event.returnValue = false;// for IE
		else 
			event.preventDefault();
	}
}

















