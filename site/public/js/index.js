$(function(){
	
	
	//查
	
	$.ajax({
		type:'get',
		url:'/user',
		success:function(data){
			data.forEach(function(v){
				$('<tr data-id="'+v.id+'"><td>'+v.id+'</td><td><input class="form-control name" type="text" value="'+v.name+'"></td><td><input class="form-control phone" type="text" value="'+v.phone+'"></td><td class="delete">×</td></tr>').appendTo('tbody')
			})		
		}		
	})	
	
//	增
	
	$("#add").on("click",function(){
		
		$.ajax({			
			type:'post',
			url:'/user',
			success:function(data){
				$('<tr data-id="'+data.id+'"><td>'+data.id+'</td><td><input class="form-control name" type="text" value=""></td><td><input class="form-control phone" type="text" value=""></td><td class="delete">×</td></tr>').appendTo('tbody')
			}
			
		})		
	})
	
//	删
	
	$("tbody").on("click",'.delete',function(){
		var tr=$(this).closest('tr')
		$.ajax({
			type:'delete',
			url:'/user',
			data:{id:tr.attr('data-id')},
			success:function(data){
				if(data.state==='ok'){
					tr.remove();
				}
			}		
		})	
	})
	
//	改
	var t
	$("tbody").on("keyup",".form-control",function(){
		var data={}
		
		data.id=$(this).closest('tr').attr('data-id')
		if($(this).hasClass("name")){
			data.name=$.trim($(this).val())
		}else if($(this).hasClass("phone")){
			data.phone=$.trim($(this).val())
		}else{

		}
		
		clearTimeout(t)
		t=setTimeout(function(){
			$.ajax({
				type:'put',
				url:'/user',
				data:data,
				success:function(r){
					console.log("更新成功")
				}		
			})			
		},400)		
	})
})
