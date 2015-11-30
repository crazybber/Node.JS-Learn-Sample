// Async exception


//async exception 

function sync(fn){
	return fn();
}

try{
	sync();
} catch(err){
console.log('Error: %s', err.message);	
}


//、、
function async(fn,callback){
	setTimeout(function(){
		/* try{
		}catch(err){
			
		} */
		callback(fn());
	},0);
}

try{
	async(null,function(data){
		//do sth
	} );
}catch(err){
	 console.log('Error: %s', err.message);
}
 



 // modify sample
 
function async1(fn,callback){
	setTimeout(function(){
		try{
			callback(null,fn());
		}catch(err){
			callback(err);
		} 
		
	},0);
}

async1(null,function(err,data){
	if(err){
		 console.log('Error: %s', err.message);
	}else{
		
	}
} );



function main() {
    // Do something.
    syncA();
    // Do something.
    syncB();
    // Do something.
    syncC();
}

try {
    main();
} catch (err) {
    // Deal with exception.
}