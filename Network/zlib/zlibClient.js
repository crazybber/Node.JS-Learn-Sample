//js codes..

var http =require('http');
var zlib= require('zilb');
var jsonhead = {
	'Content-Type':'Text-plain'
}
var responseContent = 'Hello World\n';
var option={
	hostname:'www.example.com'
	port:80,
	path:'/',
	header:{
		'Accept-Encoding':'gzip,deflate'
	}
}


var callback = function(response){
	 var body = [];
	
	
	  response.on('data', function (chunk) {
        body.push(chunk);
    });
	
	response.on('end',function(chunk){
		body = Buffer.concat(body);
		
		if(response.header['content-encoding']=='gzip'){
			zlib.gunzip(body,function(err,data){
				
				console.log(data.toString());
			} );
		}else{
			console.log(data.toString());
		}
		
	} );
}

http.request(option,callback); 





