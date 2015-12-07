
/*
第二次迭代

在第一次迭代之后，我们已经有了一个可工作的版本，满足了功能需求。接下来我们需要从性能的角度出发，看看代码还有哪些改进余地。
设计

把map方法换成for循环或许会更快一些，但第一版代码最大的性能问题存在于从读取文件到输出响应的过程当中。我们以处理/??a.js,b.js,c.js这个请求为例，看看整个处理过程中耗时在哪儿。

 发送请求       等待服务端响应         接收响应
---------+----------------------+------------->
         --                                        解析请求
           ------                                  读取a.js
                 ------                            读取b.js
                       ------                      读取c.js
                             --                    合并数据
                               --                  输出响应

可以看到，第一版代码依次把请求的文件读取到内存中之后，再合并数据和输出响应。这会导致以下两个问题：

    当请求的文件比较多比较大时，串行读取文件会比较耗时，从而拉长了服务端响应等待时间。

    由于每次响应输出的数据都需要先完整地缓存在内存里，当服务器请求并发数较大时，会有较大的内存开销。

对于第一个问题，很容易想到把读取文件的方式从串行改为并行。但是别这样做，因为对于机械磁盘而言，因为只有一个磁头，尝试并行读取文件只会造成磁头频繁抖动，反而降低IO效率。而对于固态硬盘，虽然的确存在多个并行IO通道，但是对于服务器并行处理的多个请求而言，硬盘已经在做并行IO了，对单个请求采用并行IO无异于拆东墙补西墙。因此，正确的做法不是改用并行IO，而是一边读取文件一边输出响应，把响应输出时机提前至读取第一个文件的时刻。这样调整后，整个请求处理过程变成下边这样。

发送请求 等待服务端响应 接收响应
---------+----+------------------------------->
         --                                        解析请求
           --                                      检查文件是否存在
             --                                    输出响应头
               ------                              读取和输出a.js
                     ------                        读取和输出b.js
                           ------                  读取和输出c.js

按上述方式解决第一个问题后，因为服务器不需要完整地缓存每个请求的输出数据了，第二个问题也迎刃而解。
*/
var fs   = require('fs'),
	path = require('path'),
	http = require('http');
	
var MIME = {
	'.css': 'text/css',
    '.js': 'application/javascript'
}
//main function mergefile and
function validateFiles(pathnames,callback){
	console.log('validateFiles, start....');
	console.log('pathnames.length:%s',pathnames.length);
	//var output =[];	
	(function next(i,len){
		console.log('i:%d,len:%d',i,len);
		if(i<len){		
			fs.stat(pathnames[i],function(err,filename){
				if(err){
					console.log(' dealing file:%s,error happended',pathnames[i]);
					console.log(' i will go callback');
					callback(err);
				}else if(!filename.isFile()){						
						callback(new Error());
				}else{
					console.log(' checking file:%s',pathnames[i]);
					//output.push(data);
					//console.log(' dealing next file:%s',pathnames[i+1]);
					next(i+1,len);
				}
			} );
		} else {
			console.log('i will go to callback,dealing files');
			//console.log('%s',output);
			callback(null,pathnames);
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
 var server=http.createServer(function(request,response){
		//parser url
		console.log('parsing url,start....');
		var urlinfo = parseURL(root,request.url);
		console.log('parsing url, over');
		// console.log('url:%s',urlinfo);
		//validateFiles
		validateFiles(urlinfo.pathnames,function(err,pathnames){
			console.log('callback here,by validateFiles');
			if(err){
				console.log('error in callback');
				response.writeHead(404);
				response.end(err.message);
			}else{
				response.writeHead(200,{
					'Content-Type': urlinfo.mime
				});
				console.log('i will write data in the next outPutFiles');
				//console.log(data);
				//response.write(data);
				// response.end();			
				outPutFiles(pathnames,response);
				console.log('bye bye');
			}
		} );		
	}).listen(port);
	
	process.on('SIGTERM',function(){
		server.close(function(){
			process.exit(0);
		} );
		
	} );
	console.log('launch Server success!! on Port :%d',port);	
}

function outPutFiles(pathnames,writer){
	console.log('pathnames:%s',pathnames);
	(function next(i,len){
	if(i<len){	
		var reader = fs.createReadStream(pathnames[i]);
		reader.pipe(writer,{end:false});
		reader.on('end',function(){
			console.log('%d file ok..',i+1);
			next(i+1,len);
		} );
	} else{
		writer.end();
	}			
	}(0,pathnames.length));
}

main(process.argv.slice(2));
