let user = require('./User');
let http = require('http');
let url = require('url');
let util =require('util');
console.log(user.userName);
let server = http.createServer((req,res)=>{
  res.statusCode = 200; //设置状态码
  res.setHeader("Content-Type","text/plain; charset=utf-8");
  console.log("url:"+req.url);
  console.log("pares:"+url.parse(req.url)); // url.parse() 方法会解析一个 URL 字符串并返回一个 URL 对象。
  console.log("inspect:"+util.inspect(url.parse(req.url)));
  res.end(util.inspect(url.parse(req.url)));  //util.inspect() 方法返回 object 的字符串表示，主要用于调试。
});
server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请打开浏览，输入：http://127.0.0.1:3000/来访问")
});
