
var calback=function(){	
	cleanUp();
	process.exit(0);
};

process.on('SIGTER',callback);

