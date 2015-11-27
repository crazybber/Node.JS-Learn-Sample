var http =require('http');

var jsonhead = {
	'Content-Type':'Text-plain'
}
var responseContent = 'Hello World\n';
var callback = function(request,response){
	 var body = [];
	 
	console.log(request.method);
	console.log('-------------------------------------');
	console.log(request.headers);
	console.log('-------------------------------------');
	
	request.on('data',function(chunk){
		response.write(chunk);
		body.push(chunk);
	} );
	
	request.on('end',function(){
		body= Buffer.concat(body);
		console.log(body.toString());
		console.log('-------------------------------------');
	} );
	
	response.writeHead(200,jsonhead);
	response.write(responseContent);
	response.end();
}

http.createServer(callback).listen(8124); 
