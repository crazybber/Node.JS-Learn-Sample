//js codes..

var http =require('http');
var zlib= require('zilb');
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
	
	  var i = 1024,
        data = '';

    while (i--) {
        data += '.';
    }
	
	if((request.headers['accept-encoding']).indexOf('gzip')!=-1){
		zilb.gzip(data,function(){
			response.writeHead(200,{
				'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
			} );
			response.end(data);
		} );
	}else {
		response.writeHead(200,jsonhead);
	response.write(responseContent);
	response.end();
	}
	
	
	
}

http.createServer(callback).listen(8124); 
