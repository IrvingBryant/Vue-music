let http = require('http');
let url = require('url');
let util =require('util');
http.get('http://www.imooc.com/u/card',function(res){
  let data = '';
  res.on("data",function(chunk){
    data +=  chunk;
  });
  res.on("end",function(){
     let result =JSON.pares(data);
     console.log("result:"+result);
  });
})
