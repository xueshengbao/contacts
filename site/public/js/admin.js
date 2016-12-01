$(function(){
	
	function format(arr){
		var t={}
		arr.forEach(function(v,i){
			var key=v.pinyin.charAt(0).toUpperCase()
			if(!t[key]){
				t[key]=[];
			}
			t[key].push(v)			
		})
		return t
	}
	

    function render(data){
    	$(".contact,#right").empty()
    	var o=format(data)
		letters=Object.keys(o).sort()
		$(".fixd").text(letters[0])
		$("#right").height(20*letters.length)
		letters.forEach(function(v,i){
			$('<div>').text(v).appendTo("#right")
			$("<dt>"+v+"</dt>").appendTo(".contact")
			
			o[v].forEach(function(v,i){
				$('<dd><a href="tel:'+v.phone+'"></a>'+v.name+'</dd>').appendTo(".contact")		
			})
		}) 
		$("dt").each(function(i,v){
			hTable.push($(this).offset().top-88)
		})
    }
	
	var contacts=[];
	var letters=[];
	var hTable=[];
	
	$.ajax({
		url:"/user",
		type:"get",
		success:function(r){
			contacts=r
			render(contacts)
		}
	})
	

	$(".search").on("keyup",function(){
		var val=$.trim($(this).val())
		console.log(val)
		var tmp=[];
		contacts.forEach(function(v,i){
			if(v.name.indexOf(val)!==-1||v.phone.indexOf(val)!==-1||v.pinyin.indexOf(val)!==-1){
				tmp.push(v)				
			}
		})
		hTable=[]
		render(tmp)
//		console.log(tmp)
		
	})
	
	$(window).on("scroll",function(){
		var top=$(window).scrollTop()
		var index;
		for(var i=0;i<hTable.length;i++){
			if(hTable[i]<top){
				index=i
			}
		}	
		$(".fixd").text(letters[index])
	})
	
	$("#right").on("click","div",function(){
		var index=$(this).index();
		$(window).scrollTop(hTable[index]+1)
//		$(".fixd").text(letters[index])
		
	})
	
	
	
	
	
	
})
