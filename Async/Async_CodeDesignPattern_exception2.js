//EXCEPTION 2
//
function main(callback){
	//do thing
	asyncA(function(err,data){
			if(err){
				callback(err);
			} else{
				asyncB(function(err,data){
					if(err){
						callback(err);
					} else{
						//.....
						asyncC(function(err,data){
							if(err){
								callback(data);								
							}else{
								//do soomethin.
								callback(null);
							}
						} );
					}
				});
			}
	} );
}

main(function(err){	
	if(err){
		//doing sth.
	}
});
