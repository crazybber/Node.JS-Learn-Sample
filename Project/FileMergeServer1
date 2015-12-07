
var fs   = require('fs'),
	path = require('path'),
	http = require('http');
	
var MIME = {
	'.css': 'text/css',
    '.js': 'application/javascript'
}
//main function mergefile and
function combineFiles(pathnames,callback){
	console.log('combineFiles, start....');
	console.log('pathnames.length:%s',pathnames.length);
	var output =[];	
	(function next(i,len){
		console.log('i:%d,len:%d',i,len);
		if(i<len){		
			fs.readFile(pathnames[i],function(err,data){
				if(err){
					console.log(' dealing file:%s,error happended',pathnames[i]);
					callback(err);
				}else{
					console.log(' dealing file:%s',pathnames[i]);
					output.push(data);
					//console.log(' dealing next file:%s',pathnames[i+1]);
					next(i+1,len);
				}
			} );
		} else {
			console.log('i will go to callback');
			console.log('%s',output);
			callback(null,Buffer.concat(output));
		}	
	}(0,pathnames.length));
}


// main function parse url
function parseURL(root,url){
	var base,pathnames,parts;
	
	console.log('root：%s',root);
	console.log('url：%s',url);
	var ret=url.indexOf('??'); 
	console.log('url.indexOf??：%s',ret);
	if(url.indexOf('??')===-1 ){
		url= url.replace('/','/??');
	}
	parts = url.split('??');	
	base =parts[0];//.replace(/\//g,'\\');
	console.log('root：%s',root);
	console.log('base: %s',base);
	//console.log('pathnames before map:%s',pathnames);
	pathnames = parts[1].split(',').map(function(value){
		return path.join(root,base,value);
	} );
	
	console.log('parts：%s',parts);
	console.log('pathnames after map :%s',pathnames);
	return {
		mime:MIME[path.extname(pathnames[0])]||'text/plain',
		pathnames:pathnames
	};	
}

 


	
function main(argv){
var config = JSON.parse(fs.readFileSync(argv[0],'utf-8')),
	root = config.root||'.',
	port = config.port||80;
	console.log('starting launch Server on Port :%d',port);
	http.createServer(function(request,response){
		//parser url
		console.log('parsing url,start....');
		var urlinfo = parseURL(root,request.url);
		console.log('parsing url, over');
		//combineFiles
		
		combineFiles(urlinfo.pathnames,function(err,data){
			console.log('callback here');
			if(err){
				console.log('error in callback');
				response.writeHead(404);
				response.end(err.message);
			}else{
				response.writeHead(200,{
					'Content-Type': urlinfo.mime
				});
				console.log('i will write data');
				console.log(data);
				response.write(data);
				response.end();		
				console.log('bye bye');
				//process.stdout.write('i am process write'+data + '\n');
			//	process.stdin.pause(); 
			//	console.log('your input: %s',process.stdin.read());			
			 //   var response = fs.readSync(process.stdin.fd, 1000, 0, "utf8");
				//console.log('your input: %s',response);
			//	process.stdout.write('data: ' + process.stdin.read());
			//	process.stdin.resume(); 
				
			}
		} );		
	}).listen(port);
	console.log('launch Server success!! on Port :%d',port);	
}

main(process.argv.slice(2));
