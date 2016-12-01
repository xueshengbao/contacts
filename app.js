var express=require('express');
var app=express();
var mysql=require('mysql')
var pinyin=require('pinyin')
var bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


var con=mysql.createConnection({
	host:'localhost',
	user: 'root', 
	password:'',
	database: 'test',
	database:'abcd'
})

con.connect()

app.listen(3000,function(){
	console.log('服务器在3000端口启动');
})


app.get('/admin',function(req,res){
	res.sendFile(__dirname+'/site/admin.html')
})


app.get('/',function(req,res){
	res.sendFile(__dirname+'/site/index.html')
})




///////////////////////////////////////////////////////

//console.log(pinyin("你好",{style:pinyin.STYLE_NORMAL}).join(' '))

app.get('/user',function(req,res){
		var sql='select*from user';
		con.query(sql,function(err,rows){
			res.json(rows)
		})
	})
	.post('/user',function(req,res){
		var  sql = 'insert into user set?';
		con.query(sql,{name:''},function (err, r) {
		        res.json({id:r.insertId})
		});		
		
	})
	.put('/user',function(req,res){
		if(req.body.name){
			var name=req.body.name;
			var o=pinyin(name,{style:pinyin.STYLE_NORMAL}).join(' ')
			
			var sql='update user set name=?,pinyin=? where id=?'
			con.query(sql,[name,o,req.body.id],function(err,r){
			    if(!err){
					res.json({state:'ok'})
				}
			})
		}else if(req.body.phone){
			var sql='update user set phone=? where id=?'
			con.query(sql,[req.body.phone,req.body.id],function(err,r){
			   if(!err){
					res.json({state:'ok'})
				}
			})
		}
		
	})
	.delete('/user',function(req,res){
		var  sql = 'delete from user where id=?';
		con.query(sql,[req.body.id],function(err,r){
			if(!err){
				res.json({state:'ok'})
			}
		})
	})








app.use(express.static(__dirname+'/site/public'))
