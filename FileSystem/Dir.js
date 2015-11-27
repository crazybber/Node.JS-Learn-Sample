funtion factorial(n){
	
if(n==1){
	return 1;
} else {
	
	return n * factorial(n-1);
}	
}


function travel(dir,callback){
	fs.reddirsync(dir).forEach(function(file){
		var pathname = path.join(dir file);
		
		if (fs.statSync(pathname).isDirectory() ){
			travel(pathname,callback);
		} else {
			callback(pathname);
		}	
		
	} );
	
}


travel('F:\\codes',function(pathname){
 console.log(pathname);	
} );


/*Async version travel */

function travelAsync(dir ,callback,finish )
{
	fs.readdir(dir,function(err,files)
	{
		(function next(i) {
			if (i < files.length){
				
				
				var pathname= path.join(dir,files[i]);
				fs.stat(pathname,callback,function(){
					
					if (stats.isDirectory()){
						travelAsync(pathname,callback,function(){
							next(i+1);
						} );						
					}else {
					callback(pathname,function(){
					next(i+1);
				} );
			} else {
				finish && finish();	
				
			}
			
		}(0));
	});
	
}
