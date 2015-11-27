path = require('path');

fs.readFile(pathname,funtion(err,data){
	if(err){
		
	}else{
		
	}
	
});


function DealFile()
{
	try{
		
	var	data= fs.readFileSync(pathname,funtion(err,data){
	if(err){
		
	}else{
		
	}
	
});
		
	}catch(err){
		
	}
	
} */

/*path operation*/


var cache ={};
function store(key,value){
	cache[path.normalize(key)]=value;	
}

store('foo/bar',1);
store('foo//baz//../bar', 2);
console.log(cache);



