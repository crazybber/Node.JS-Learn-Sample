//brackets

(function(n,callback){
	var i=n;
	console.log(i);
	callback(3);
}(2,function(n){
	console.log(n+'done');
} ));


var main =function(n,callback){
	var i=n;
	console.log(i);
	callback(n+1);
}

main(3,function(n){
	console.log(n+'done');
});