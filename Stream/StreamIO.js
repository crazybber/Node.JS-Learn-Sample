var fs= requir('fs');

var rs= fs.creadReadStrem(pathname);

rs.on('data',function(chunk){
	
	dosomething(chunk);
	
});

rs.on('end',function(){
	clean();	
});


/*refactoring code*/


var rs= fs.creareReadStream(src);

rs.on('data',function(chunk){
	
	rs.pause();
	
	dosomething(chunk,function(){
		rs.resume();
	});
	
});


/*refactoring code*/
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data',function(chunk){
	
	if(ws.write(chunk)==false){
		rs.pause();
	}
	
	dosomething(chunk,function(){
		rs.resume();
	});
	
});


rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();
});



