/* https*/

var option = {	
	key:fs.readFileSync('./ssl/default.key'),
	cert: fs.readFileSync('./ssl/default.cer')
}

var server = https.CreateServer(option,function(request,response){
	//..
	
	
} );

server.addContext('foo.com',{
	key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});


var option ={
	 hostname: 'www.example.com',
        port: 443,
        path: '/',
        method: 'GET'
};