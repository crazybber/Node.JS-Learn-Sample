//Domanin

process.on('uncaughtException',function(err){
	console.log('Error:%s',err.message);	
});


setTimeout(function(){
	fn();
} );


function async(request, callback) {
    // Do something.
    asyncA(request, function (err, data) {
        if (err) {
            callback(err);
        } else {
            // Do something
            asyncB(request, function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    // Do something
                    asyncC(request, function (err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            // Do something
                            callback(null, data);
                        }
                    });
                }
            });
        }
    });
}

http.createServer(function(request,response){
	var d = domain.create();
	d.on('error',function(){
		response.writeHead(500);
		response.end();
	} );
	
	d.run(function(){
		async(request,function(data){
			response.writeHead(200);
			response.write(data);
			response.end();
		} );
	} );
} );

