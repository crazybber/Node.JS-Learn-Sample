//main.js

var head=require('./head')
var head=require('./body')


exports.create=  function (name){
	
	return{
		name:name,
		head:head.create(),
		body:body.create()
	};
}
