
var fs   = require('fs'),
	path = require('path'),
	http = require('http');
	
var MIME = {
	'.css': 'text/css',
    '.js': 'application/javascript'
}
//main function mergefile and
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
		} else {
			callback(null,Buffer.concat(output));
		}	
	}(0,pathnames.lenth));
}

var httpcallback = function(request,response){
		//parser url
		console.log('解析路径');
		var urlinfo = parseURL(root,request.url);
		console.log('解析路径，完成');
		//combineFiles
		combineFiles(urlinfo.pathnames,function(err,data){
			if(err){
				response.writeHead(404);
				response.end(err.message);
			}else{
				response.writeHead(200,{
					'Content-Type': urlInfo.mime
				});
				response.write(data);
				response.end();		
			}
		} );		
	};


function main(argv){
var config = JSON.parse(fs.readFileSync(argv[0],'utf-8')),
	root = config.root||'.',
	port = config.port||80;
	console.log('starting launch Server on Port :%d',port);
	http.createServer(httpcallback).listen(port);
	console.log('launch Server success!! on Port :%d',port);	
}


// main function parse url
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
