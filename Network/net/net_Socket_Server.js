//NET
//js codes..

var net =require('net');
}



var  callback= function(conn){
	
	conn.on('data',function(){
		conn.write([
		'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
		].join('\n'));
	} );
}

net.createServer(callback).listen(80);


