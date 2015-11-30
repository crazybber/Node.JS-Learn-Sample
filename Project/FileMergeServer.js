//我们要开发的是一个简单的静态文件合并服务器，该服务器需要支持类似以下格式的JS或CSS文件合并请求。
//
//http://assets.example.com/foo/??bar.js,baz.js
//
//在以上URL中，??是一个分隔符，之前是需要合并的多个文件的URL的公共部分，之后是使用,分隔的差异部分。因此服务器处理这个URL时，返回的是以下两个文件按顺序合并后的内容。
//
// /foo/bar.js
// /foo/baz.js
//
//另外，服务器也需要能支持类似以下格式的普通的JS或CSS文件请求。
//
//http://assets.example.com/foo/bar.js
//PROJECT DEMO
//
//           +---------+   +-----------+   +----------+
//request -->|  parse  |-->|  combine  |-->|  output  |--> response
//           +---------+   +-----------+   +----------+

//也就是说，服务器会首先分析URL，得到请求的文件的路径和类型（MIME）.
//然后，服务器会读取请求的文件，并按顺序合并文件内容。.
//最后，服务器返回响应，完成对一次请求的处理。


//服务器在读取文件时需要有个根目录.
//并且服务器监听的HTTP端口最好也不要写死在代码里，因此服务器需要是可配置的。

var fs   = require('fs'),
	path = require('path'),
	http = require('http');
	
var MIME = {
	'.css': 'text/css',
    '.js': 'application/javascript'
}

function combineFiles(pathnames,callback){
	var output =[];	
	(function next(i,len){
		if(i<len){
			fs.readFiles(pathnames[i],function(err,data){
				if(err){
					callback(err);
				}else{
					output.push(data);
					next(i+1,len);
				}
			} );
		} else{
			callback(null,Buffer.concat(output));
		}	
	}(0,pathnames.lenth));
}


function main(argv){
var config = JSON.parse(fs.readFileSync(argv[0],'utf-8')),
	root = config.root||'.',
	port = config.port||80;
	
	http.createServer(function(request,response){
		//parser url
		var urlinfo = parseURL(root,request.url);
		//combineFiles
		combineFiles(urlinfo.pathnames,function(err,data){
			if(err){
				response.writeHead(404);
				response.end(err.message);
			}else{
				response.writeHead(200,{
					'Content-Type': urlInfo.mime
				});response.end(data);
				
			}
		} );
		
	} ).listen(port);
		
}



function parseURL(root,url){
	var base,pathnames,parts;
	
	if(url.indexOf('??')==-1 ){
		url= url.replace('/','/??');
	}
	parts = url.split('??');	
	base =parts[0];
	pathnames = parts[1].split(',').map(function(value){
		return path.join(root,base,value);
	} );
	
	return {
		mime:MIME[path.extname(pathnames[0])]||'text/plain',
		pathnames:pathnames
	};
	
}

main(process.argv.slice(2));
