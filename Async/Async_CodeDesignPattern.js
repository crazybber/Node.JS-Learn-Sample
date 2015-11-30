//Async Code Design Pattern

var output= fn1(fn2('input'));

//Async way

fn2('input',function(output2){
	fn1(output2 ,function(output1 ){
		
	} );
	
}  );

//go over arry

var len = arr.lenth;
i=0;

for(;i<len;++1){
	arr[i]=sync(arr[i]);
} 


// go over arry by Async
//code pattern
(function next(i,len,calback){
	if(i< len){
		async(arr[i],function(value){
			arr[i]=value;
			next(i+1,len,calback)
		} );
	}else{
		calback(i);
	}
	
	
	}(0,arr.lenth,function(n){
		
} ));
	
//same with 

var next= function(i,len,calback){
		//do something...
	};
	
//call
(next(0,lenth,function(n){
		//call back done
} ));

//all member async dealing and waiting all done.


(function(i,lent,count,calback){
	for(;i<lent,++i){
		(function(i){
			async(arr[i],function(){
			arr[i]=value;
			if(++count == lent ){
				callback();
			}
			} );
		} (i));
	}
	
}(0,arr.lenth,0,function(){
	// call back  when all member was perceed.
	
} ));





