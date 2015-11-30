//process guard
var child_process= require('child_process');
function  spawn(mainModule){
	var worker = child_process.spawn('node',[mainModule]);
	work.on('exit',function(code){	
		if(code!=0){
			spawn(mainModule);
		}
	} );	
}

spawn('worker.js');