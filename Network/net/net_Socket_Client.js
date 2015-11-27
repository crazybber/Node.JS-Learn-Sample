//NET
//js codes..

var net =require('net');
}

var option={
	port:80,
	host:"www.12306.com:8080"	
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

var cli=  net.conect(callback);

cli.on('data',function(){
	console.log(data.toString() );
	console.end();
} );
