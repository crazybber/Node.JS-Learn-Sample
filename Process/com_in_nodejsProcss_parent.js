//nodejs process com
var child_process= require('child_process');

var child= child_process.spawn('node', [ 'com_in_nodejsProcss_child.js'], {
        stdio: [0,1,2,'ipc']
    });
	
		
		
child.on('message',function(msg){
	console.log(msg);
} );
		
child.send({ hello: 'hello' });		
	
	
	