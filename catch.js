
//////////////////////////////////////////////////////////

$(function () {			
	drow_rect("#content");
	//mouse_RightButton_forbid();
	//$(document).bind(��contextmenu��,function(e){return false;});//�����Ҽ��˵�
})

/////////////////////////////////////////////////////////
function drow_rect(the_id){//theid��ʾ���������Ĳ�		
	
var num=1;
var x_down=0,y_down=0;
var new_width=0,new_height=0;
var x_original=0,y_original=0;
var original_flag=true,down_flag=false;
var x_point=0,y_point=0;
var append_string;

	
	
	var MouseDown=function(e){
		if(e.which==1){//������
			down_flag=true;
			x_down=e.pageX;
			y_down=e.pageY;//��¼���ĵ�ǰ����
			
			if(original_flag){//����ǵ�һ�ε��,����ʼ��������¼�� x_original �� y_original��
				x_original=e.pageX;
				y_original=e.pageY;
				original_flag=false;
			}
		}
	};
	
	var MouseMove=function(e){
		if(e.which==1){//������
			if(down_flag){//������ƶ�
				x_down=e.pageX;
				y_down=e.pageY;
				
				x_point=x_original;
				y_point=y_original;
				
				new_width=x_down-x_original;
				if(new_width<0){//��������˶�
					new_width=-new_width;
					x_point=x_down;				
				}
				
				new_height=y_down-y_original;
				if(new_height<0){ //��������˶�
					new_height=-new_height;
					y_point=y_down;				
				}
				
				$("div[name='"+num+"']").remove();//��ǰ��Ĳ�ɾ�������ں���Ĵ����������µĲ�				
				
				append_string="<div class='new_rect' style='left:"+x_point+"px;top:"+y_point+"px;"+"width:"+new_width+"px;height:"
									+new_height+"px' name='"+num+"' title='��"+num+"��'></div>";
				$(the_id).append(append_string);
				
			}
		}
	};
	
	$(the_id).bind("mousedown",MouseDown);
	$(the_id).bind("mousemove",MouseMove);//�¼���
	
	$(the_id).mouseup(function(e){//�ɿ�������,���һ��div�Ļ���
		if(e.which==1){//�ɿ�����������ʼ����־λ
			down_flag=false;
			original_flag=true;
			
			
			//����div�Ŀ��ƶ�����
			$("div[name='"+num+"']").draggable();		
			$("div[name='"+num+"']").mousedown(function(){
				$(this).addClass("mousedown");//�����Ӱ
				$(the_id).unbind("mousedown",MouseDown);
				$(the_id).unbind("mousemove",MouseMove);//ȡ���¼���
				
			});
			$("div[name='"+num+"']").mouseup(function(){
				$(this).removeClass("mousedown");//ɾ����Ӱ
				$(the_id).bind("mousedown",MouseDown);
				$(the_id).bind("mousemove",MouseMove);//�¼���
			});
			
			
			//������Ҽ��¼�
			$("div[name='"+num+"']").mousedown(function(e){
							
				if(e.which==3){
					var divExtend="<div class='divExtend' name='extend"+$(this).attr("name")+"'><ul><li name='text'>�ı�</li><li name='draw'>��ͼ</li>"+
									"<li name='color'>��ɫ</li><li name='delete'>ɾ��</li></ul></div>";
					
					var parentDiv="div[name='"+num+"']";
					var childDiv="div[name='extend"+$(this).attr("name")+"']";
					$(childDiv).remove();					
					$(this).append(divExtend);					
					
					//λdivExtend���¼�
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
						$(childDiv).remove();//ɾ��divExtend
					});
					
				}
			});
			$("div[name='"+num+"']").mouseup(function(e){
				if(e.which==3){
					$(this).removeClass("mousedown");//ɾ����Ӱ				
				}
				num--;
			});
			num++;
		}
	});
	
}



function mouse_RightButton_forbid(){//�����Ҽ��˵�
	document.oncontextmenu=function(event) {
		if (document.all) 
			window.event.returnValue = false;// for IE
		else 
			event.preventDefault();
	}
}

















