//TEST FILE
 var fs= require('fs');

(function(argv){
var config = JSON.parse(fs.readFileSync(argv[0],'utf-8'));

console.log(config);
	
}(process.argv.slice(2)));
 

var path = require('path');

var ret =path.join('.','/foo/','abc.js');

console.log(ret);